package com.morganstanley.code_to_give.domain.event.controller.request;

import java.time.LocalDateTime;
import java.util.List;

public record UpdateEventRequest(
    Integer eventId,
    String title,
    String description,
    List<String> types,
    List<String> interests,
    List<String> skills,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String venue,
    Integer quota,
    List<String> reminder
) {
}
