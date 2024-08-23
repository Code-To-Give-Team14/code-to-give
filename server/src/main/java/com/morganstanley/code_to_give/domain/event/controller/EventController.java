package com.morganstanley.code_to_give.domain.event.controller;

import com.morganstanley.code_to_give.domain.event.EventService;
import com.morganstanley.code_to_give.domain.event.controller.request.CreateEventRequest;
import com.morganstanley.code_to_give.domain.event.controller.response.CreateEventResponse;
import com.morganstanley.code_to_give.domain.event.service.CreateEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final CreateEventService createEventService;

    @PostMapping
    public ResponseEntity<CreateEventResponse> createEvent(
        @RequestBody
        CreateEventRequest request
    ) {
        CreateEventResponse response = createEventService.createEvent(request);
        return ResponseEntity.ok(response);
    }

}
