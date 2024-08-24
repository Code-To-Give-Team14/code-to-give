package com.morganstanley.code_to_give.domain.event.entity;

import com.morganstanley.code_to_give.domain.entitybase.AuditLoggingBase;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Getter
@Entity
@SQLDelete(sql = "UPDATE memberTraining SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?")
@Where(clause = "deletedAt IS NULL")
@Table(name = "memberTraining")
public class MemberTraining extends AuditLoggingBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "memberEmail", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trainingId", nullable = false)
    private Training training;

    @Column(nullable = false)
    private Boolean remindEmail = true;

    @Column(nullable = false)
    private Boolean remindSMS = true;

    @Column(nullable = false)
    private Boolean isCompleted = false;

    private LocalDateTime deletedAt;
}