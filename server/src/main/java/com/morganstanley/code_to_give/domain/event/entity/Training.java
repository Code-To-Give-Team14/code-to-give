package com.morganstanley.code_to_give.domain.event.entity;

import com.morganstanley.code_to_give.domain.entitybase.AuditLoggingBase;
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
@SQLDelete(sql = "UPDATE training SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?")
@Where(clause = "deletedAt IS NULL")
@Table(name = "training")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Training extends AuditLoggingBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    private String description;

    private String videoLink;

    private String quizLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eventId", nullable = false)
    private Event event;

    @OneToMany(
        mappedBy = "training",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private List<MemberTraining> memberTrainings;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> skills;

    private LocalDateTime deletedAt;
}