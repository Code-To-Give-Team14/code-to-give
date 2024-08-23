package com.morganstanley.code_to_give.domain.event.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> reminder;

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
        this.reminder = reminder;
        this.isActivated = true;
    }
}

