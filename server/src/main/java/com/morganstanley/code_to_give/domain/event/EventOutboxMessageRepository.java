package com.morganstanley.code_to_give.domain.event;

import com.morganstanley.code_to_give.domain.event.entity.EventOutboxMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventOutboxMessageRepository extends JpaRepository<EventOutboxMessage, Long> {
}
