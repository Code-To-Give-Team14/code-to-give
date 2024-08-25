package com.morganstanley.code_to_give.domain.event.controller.request;

import java.time.LocalDateTime;
import java.util.List;

public record CreateEventRequest(
    Integer programId,
    String title,
    String description,
    List<String> types,
    List<String> interests,
    List<String> skills,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String venue,
    Integer quota,
    String imgUrl,
    List<ReminderTime> reminder
) {
}
