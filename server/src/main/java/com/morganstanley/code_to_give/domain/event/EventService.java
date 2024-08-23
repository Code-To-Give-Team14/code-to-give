package com.morganstanley.code_to_give.domain.event;

import com.morganstanley.code_to_give.domain.event.entity.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

}

