package com.morganstanley.code_to_give.domain.entity;

import jakarta.persistence.EntityListeners;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditLoggingBase {

    @NotNull
    @CreatedDate
    private LocalDateTime createdAt;

    @NotNull
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
