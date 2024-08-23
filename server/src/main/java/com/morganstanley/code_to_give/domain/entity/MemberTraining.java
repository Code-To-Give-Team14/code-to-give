package com.morganstanley.code_to_give.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;

@Getter
@Entity
@Table(name = "memberTraining")
public class MemberTraining {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "username", nullable = false)
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

    @Min(1)
    @Max(5)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String feedback;
}