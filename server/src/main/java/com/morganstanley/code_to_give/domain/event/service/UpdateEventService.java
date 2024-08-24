package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.ai.Recommendation;
import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.controller.request.ChangeEventActiveStatusRequest;
import com.morganstanley.code_to_give.domain.event.controller.request.UpdateEventRequest;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UpdateEventService {

    private final EventRepository eventRepository;

    @Transactional
    public void updateEvent(UpdateEventRequest request) {
        Event event = eventRepository.findById(request.eventId())
            .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        event.update(
            request.title(),
            request.description(),
            request.types(),
            request.skills(),
            Recommendation.getEmbedding(request.skills()),
            request.interests(),
            Recommendation.getEmbedding(request.interests()),
            request.startTime(),
            request.endTime(),
            request.venue(),
            request.quota(),
            request.reminder()
        );
    }

    @Transactional
    public void changeEventActiveStatus(
        Integer eventId,
        ChangeEventActiveStatusRequest request
    ) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        event.changeActiveStatus(request.isActive());
    }
}
