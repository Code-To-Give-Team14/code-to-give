package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.controller.response.AdminEventDetailResponse;
import com.morganstanley.code_to_give.domain.event.controller.response.MemberEventDetailResponse;
import com.morganstanley.code_to_give.domain.event.controller.response.EventListResponse;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class GetEventListService {
    private final EventRepository eventRepository;

    public List<MemberEventDetailResponse> getEventList(Integer programId) {
        List<Event> activeEventList = eventRepository.findAllByProgramIdAndIsActivatedIsTrue(programId);
        return MemberEventDetailResponse.from(activeEventList);
    }

    public List<MemberEventDetailResponse> getEventListForAdmin() {
        List<Event> eventList = eventRepository.findAll();
        return MemberEventDetailResponse.from(eventList);
    }

    public MemberEventDetailResponse getEventDetailForMember(Integer eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));
        return MemberEventDetailResponse.from(event);
    }

    public AdminEventDetailResponse getEventDetailForAdmin(Integer eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));
        return AdminEventDetailResponse.from(event);
    }
}
