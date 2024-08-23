package com.morganstanley.code_to_give.domain.member.entity;


import com.morganstanley.code_to_give.domain.entitybase.AuditLoggingBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    private List<String> interests;

    private String location;

    private String language;

    private Boolean isAdmin;

    private LocalDateTime deletedAt;

    public Member(String email, String firstName, String lastName, String password, String sms, List<String> skills, List<String> interests, String location, String language, Boolean isAdmin) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.sms = sms;
        this.skills = skills;
        this.interests = interests;
        this.location = location;
        this.language = language;
        this.isAdmin = isAdmin;
    }
}
