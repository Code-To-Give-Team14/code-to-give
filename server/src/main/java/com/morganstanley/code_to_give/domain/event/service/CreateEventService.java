package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.controller.request.CreateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.response.CreateEventResponse;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateEventService {

    private final EventRepository eventRepository;

    @Transactional
    public CreateEventResponse createEvent(CreateEventRequest request) {
        Event event = new Event(
            request.title(),
            request.description(),
            request.types(),
            request.skills(),
            //TODO: skills to skillsEmbedding convert logic needed
            List.of(),
            request.interests(),
            //TODO: interests to interestsEmbedding convert logic needed
            List.of(),
            request.startTime(),
            request.endTime(),
            request.venue(),
            request.quota(),
            request.reminder()
        );

        eventRepository.save(event);

        return new CreateEventResponse(event.getId());
    }

}
