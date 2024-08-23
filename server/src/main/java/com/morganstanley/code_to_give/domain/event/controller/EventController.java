package com.morganstanley.code_to_give.domain.event.controller;

import com.morganstanley.code_to_give.domain.event.controller.request.ChangeEventActiveStatusRequest;
import com.morganstanley.code_to_give.domain.event.controller.request.CreateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.request.UpdateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.response.CreateEventResponse;
import com.morganstanley.code_to_give.domain.event.controller.response.EventListResponse;
import com.morganstanley.code_to_give.domain.event.service.CreateEventService;
import com.morganstanley.code_to_give.domain.event.service.GetEventListService;
import com.morganstanley.code_to_give.domain.event.service.UpdateEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping
public class EventController {


    private final CreateEventService createEventService;
    private final GetEventListService getEventListService;
    private final UpdateEventService updateEventService;

    @PostMapping("/admin/events")
    public ResponseEntity<CreateEventResponse> createEvent(
        @RequestBody
        CreateEventRequest request
    ) {
        CreateEventResponse response = createEventService.createEvent(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/events/{programId}")
    public ResponseEntity<List<EventListResponse>> getEventList(@PathVariable Integer programId) {
        return ResponseEntity.ok(getEventListService.getEventList(programId));
    }

    @GetMapping("/admin/programs/{programId}/events")
    public ResponseEntity<List<EventListResponse>> getEventListForAdmin(@PathVariable Integer programId) {
        return ResponseEntity.ok(getEventListService.getEventListForAdmin(programId));
    }

    @PutMapping("/admin/events")
    public ResponseEntity<Void> updateEvent(
        @RequestBody
        UpdateEventRequest request
    ) {
        updateEventService.updateEvent(request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/admin/events/{eventId}/active-status")
    public ResponseEntity<Void> changeActiveStatus(
        @PathVariable
        Integer eventId,
        @RequestBody
        ChangeEventActiveStatusRequest request
    ) {
        updateEventService.changeEventActiveStatus(eventId, request);
        return ResponseEntity.ok().build();
    }
}
