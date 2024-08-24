package com.morganstanley.code_to_give.domain.event.entity;

import com.morganstanley.code_to_give.domain.event.EventCreatedEvent;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE eventOutboxMessage SET publishedAt = CURRENT_TIMESTAMP, isPublished = true WHERE id = ?")
@Where(clause = "isPublished = 0")
@Table(name = "eventOutboxMessage")
public class EventOutboxMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String eventType;

    @Column(columnDefinition = "json", nullable = false)
    @JdbcTypeCode(SqlTypes.JSON)
    private EventCreatedEvent payload;

    @Column(nullable = false)
    private Boolean isPublished;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime publishedAt;

    public EventOutboxMessage(String eventType, EventCreatedEvent payload) {
        this.eventType = eventType;
        this.payload = payload;
        this.createdAt = LocalDateTime.now();
        this.isPublished = false;
    }
}
