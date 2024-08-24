package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.ProgramRepository;
import com.morganstanley.code_to_give.domain.event.controller.request.CreateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.response.CreateEventResponse;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.event.entity.Program;
import com.morganstanley.code_to_give.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.PROGRAM_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class CreateEventService {

    private final EventRepository eventRepository;
    private final ProgramRepository programRepository;

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
