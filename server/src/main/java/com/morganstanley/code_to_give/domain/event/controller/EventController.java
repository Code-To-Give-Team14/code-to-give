package com.morganstanley.code_to_give.domain.event.controller;

import com.morganstanley.code_to_give.domain.event.controller.request.CreateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.response.CreateEventResponse;
import com.morganstanley.code_to_give.domain.event.controller.response.EventListResponse;
import com.morganstanley.code_to_give.domain.event.service.CreateEventService;
import com.morganstanley.code_to_give.domain.event.service.GetEventListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {


    private final CreateEventService createEventService;
    private final GetEventListService getEventListService;

    @PostMapping
    public ResponseEntity<CreateEventResponse> createEvent(
        @RequestBody
        CreateEventRequest request
    ) {
        CreateEventResponse response = createEventService.createEvent(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{programId}")
    public ResponseEntity<List<EventListResponse>> getEventList(@PathVariable Integer programId) {
        return ResponseEntity.ok(getEventListService.getEventList(programId));
    }

    @GetMapping("/admin/{programId}")
    public ResponseEntity<List<EventListResponse>> getEventListForAdmin(@PathVariable Integer programId) {
        return ResponseEntity.ok(getEventListService.getEventListForAdmin(programId));
    }

}
