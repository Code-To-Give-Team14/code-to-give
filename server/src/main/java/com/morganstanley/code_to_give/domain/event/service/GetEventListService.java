package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.controller.response.EventListResponse;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetEventListService {
    private final EventRepository eventRepository;

    public List<EventListResponse> getEventList(Integer programId) {
        List<Event> activeEventList  = eventRepository.findAllByProgramIdAndIsActivatedIsTrue(programId);
        return EventListResponse.from(activeEventList);
    }

    public List<EventListResponse> getEventListForAdmin(Integer programId) {
        List<Event> eventList  = eventRepository.findAllByProgramId(programId);
        return EventListResponse.from(eventList);
    }

}
