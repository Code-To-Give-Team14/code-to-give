package com.morganstanley.code_to_give.domain.member.entity;


import com.morganstanley.code_to_give.domain.entitybase.AuditLoggingBase;
import com.morganstanley.code_to_give.domain.event.entity.MemberEvent;
import com.morganstanley.code_to_give.domain.event.entity.MemberTraining;
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
@SQLDelete(sql = "UPDATE member SET deletedAt = CURRENT_TIMESTAMP WHERE email = ?")
@Where(clause = "deletedAt IS NULL")
@Table(name = "member")
public class Member extends AuditLoggingBase {

    @Id
    private String email;

    private String firstName;

    private String lastName;

    private String password;

    private String sms;

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

    private String location;

    private String language;

    private Boolean isAdmin;

    private LocalDateTime deletedAt;

    @OneToMany(
            mappedBy = "member",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<MemberEvent> memberEvents;

    @OneToMany(
            mappedBy = "member",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<MemberTraining> memberTrainings;

    public Member(String email, String firstName, String lastName, String password, String sms, List<String> skills, List<Float> skillsEmbedding, List<String> interests, List<Float> interestsEmbedding, String location, String language, Boolean isAdmin) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.sms = sms;
        this.skills = skills;
        this.skillsEmbedding = skillsEmbedding;
        this.interests = interests;
        this.interestsEmbedding = interestsEmbedding;
        this.location = location;
        this.language = language;
        this.isAdmin = isAdmin;
    }
}
