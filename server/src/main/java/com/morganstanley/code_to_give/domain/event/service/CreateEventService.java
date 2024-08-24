package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.ai.Recommendation;
import com.morganstanley.code_to_give.domain.event.EventCreatedEvent;
import com.morganstanley.code_to_give.domain.event.EventOutboxMessageRepository;
import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.ProgramRepository;
import com.morganstanley.code_to_give.domain.event.controller.request.CreateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.response.CreateEventResponse;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.event.entity.EventOutboxMessage;
import com.morganstanley.code_to_give.domain.event.entity.Program;
import com.morganstanley.code_to_give.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.PROGRAM_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class CreateEventService {

    private final EventRepository eventRepository;
    private final ProgramRepository programRepository;
    private final EventOutboxMessageRepository eventOutboxMessageRepository;

    @Transactional
    public CreateEventResponse createEvent(CreateEventRequest request) {
        Program program = programRepository.findById(request.programId())
            .orElseThrow(() -> new CustomException(PROGRAM_NOT_FOUND));

        Event event = new Event(
            request.title(),
            request.description(),
            program,
            request.types(),
            request.skills(),
            Recommendation.getEmbedding(request.skills()),
            request.interests(),
            Recommendation.getEmbedding(request.interests()),
            request.startTime(),
            request.endTime(),
            request.venue(),
            request.quota(),
            request.imgUrl(),
            request.reminder()
        );

        eventRepository.save(event);
        publishEventCreatedEvent(event.getId());

        return new CreateEventResponse(event.getId());
    }

    public void publishEventCreatedEvent(Integer eventId) {
        EventCreatedEvent eventCreatedEvent = new EventCreatedEvent(eventId);
        EventOutboxMessage eventOutboxMessage = new EventOutboxMessage(
            EventCreatedEvent.class.getSimpleName(),
            eventCreatedEvent
        );
        eventOutboxMessageRepository.save(eventOutboxMessage);
    }

}
