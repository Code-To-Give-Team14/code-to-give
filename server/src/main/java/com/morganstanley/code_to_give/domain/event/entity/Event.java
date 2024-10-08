package com.morganstanley.code_to_give.domain.event.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE event SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?")
@Where(clause = "deletedAt IS NULL")
@Table(name = "event")
public class Event  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "programId", nullable = false)
    private Program program;

    private String title;

    private String description;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> types;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> skills;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<Float> skillsEmbedding;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> interests;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<Float> interestsEmbedding;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String venue;

    private Integer quota;

    private Boolean isActivated;

    private String imgUrl;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> reminder;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> sentReminder;

    @OneToMany(
        mappedBy = "event",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private List<Training> trainings;

    @OneToMany(
        mappedBy = "event",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private List<MemberEvent> memberEvents;

    private LocalDateTime deletedAt;

    public Event(
        String title,
        String description,
        Program program,
        List<String> types,
        List<String> skills,
        List<Float> skillsEmbedding,
        List<String> interests,
        List<Float> interestsEmbedding,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String venue,
        Integer quota,
        String imgUrl,
        List<String> reminder
    ) {
        this.title = title;
        this.description = description;
        this.program = program;
        this.types = types;
        this.skills = skills;
        this.skillsEmbedding = skillsEmbedding;
        this.interests = interests;
        this.interestsEmbedding = interestsEmbedding;
        this.startTime = startTime;
        this.endTime = endTime;
        this.venue = venue;
        this.quota = quota;
        this.reminder = reminder!=null ? reminder : List.of();
        this.sentReminder = List.of();
        this.imgUrl = imgUrl;
        this.isActivated = true;
    }

    public Event update(
        String title,
        String description,
        List<String> types,
        List<String> skills,
        List<Float> skillsEmbedding,
        List<String> interests,
        List<Float> interestsEmbedding,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String venue,
        Integer quota,
        List<String> reminder
    ) {
        this.title = title;
        this.description = description;
        this.types = types;
        this.skills = skills;
        this.skillsEmbedding = skillsEmbedding;
        this.interests = interests;
        this.interestsEmbedding = interestsEmbedding;
        this.startTime = startTime;
        this.endTime = endTime;
        this.venue = venue;
        this.quota = quota;
        this.reminder = reminder!=null ? reminder : List.of();;

        return this;
    }

    public Event changeActiveStatus(Boolean activeStatus) {
        this.isActivated = activeStatus;
        return this;
    }

    public String toChatbotString() {
        return "{\n" +
            "    Event: " + title + "\n" +
            "    Description: " + description + "\n" +
            "    Time: " + startTime + "\n" +
            "    Venue: " + venue + "\n" +
            "}";
    }

    public void updateEmbeddings(
        List<Float> skillsEmbedding,
        List<Float> interestsEmbedding
    ) {
        this.skillsEmbedding = skillsEmbedding;
        this.interestsEmbedding = interestsEmbedding;
    }
}

