package com.morganstanley.code_to_give.domain.event;

import com.morganstanley.code_to_give.domain.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findAllByProgramIdAndIsActivatedIsTrue(Integer programId);
    List<Event> findAllByProgramId(Integer programId);
}
