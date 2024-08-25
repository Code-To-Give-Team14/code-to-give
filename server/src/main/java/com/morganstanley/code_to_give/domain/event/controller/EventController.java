package com.morganstanley.code_to_give.domain.event.controller;

import com.morganstanley.code_to_give.domain.event.controller.request.ChangeEventActiveStatusRequest;
import com.morganstanley.code_to_give.domain.event.controller.request.CreateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.request.RegisterEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.request.UpdateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.response.AdminEventDetailResponse;
import com.morganstanley.code_to_give.domain.event.controller.response.CreateEventResponse;
import com.morganstanley.code_to_give.domain.event.controller.response.EventListResponse;
import com.morganstanley.code_to_give.domain.event.controller.response.MemberEventDetailResponse;
import com.morganstanley.code_to_give.domain.event.service.CreateEventService;
import com.morganstanley.code_to_give.domain.event.service.GetEventListService;
import com.morganstanley.code_to_give.domain.event.service.RegisterEventService;
import com.morganstanley.code_to_give.domain.event.service.UpdateEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping
public class EventController {


    private final CreateEventService createEventService;
    private final GetEventListService getEventListService;
    private final UpdateEventService updateEventService;
    private final RegisterEventService registerEventService;

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

    @GetMapping("/admin/events")
    public ResponseEntity<List<EventListResponse>> getEventListForAdmin() {
        return ResponseEntity.ok(getEventListService.getEventListForAdmin());
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
    @GetMapping("/{eventId}")
    public ResponseEntity<MemberEventDetailResponse> getEventDetail(@PathVariable Integer eventId) {
        return ResponseEntity.ok(getEventListService.getEventDetailForMember(eventId));
    }

    @GetMapping("/admin/{eventId}")
    public ResponseEntity<AdminEventDetailResponse> getEventDetailForAdmin(@PathVariable Integer eventId) {
        return ResponseEntity.ok(getEventListService.getEventDetailForAdmin(eventId));
    }

    @PostMapping("/events/registration")
    public ResponseEntity<Void> registerEvent(
        @RequestBody
        RegisterEventRequest request
    ) {
        registerEventService.registerEventService(request);
        return ResponseEntity.ok().build();
    }
}
