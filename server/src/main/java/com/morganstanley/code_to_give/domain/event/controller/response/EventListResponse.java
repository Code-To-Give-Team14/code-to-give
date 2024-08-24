package com.morganstanley.code_to_give.domain.event.controller.response;

import com.morganstanley.code_to_give.domain.event.entity.Event;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record EventListResponse(
        Integer eventId,
        String title,
        String description,
        String venue,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String imageUrl
) {

    public static List<EventListResponse> from(List<Event> activeEventList) {
        return activeEventList.stream()
                .map(event -> EventListResponse.builder()
                        .eventId(event.getId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .venue(event.getVenue())
                        .startTime(event.getStartTime())
                        .endTime(event.getEndTime())
                        .imageUrl(event.getImgUrl())
                        .build())
                .toList();
    }

}
