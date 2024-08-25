package com.morganstanley.code_to_give.domain.event.controller.response;

import com.morganstanley.code_to_give.domain.event.entity.Event;
import lombok.Builder;

import java.util.List;

@Builder
public record MemberEventDetailResponse(
        Integer eventId,
        String program,
        String title,
        String description,
        List<String> types,
        List<String> interests,
        List<String> skills,
        String startTime,
        String endTime,
        String venue,
        Integer quota,
        String imgUrl
) {
    public static MemberEventDetailResponse from(Event event) {
        return MemberEventDetailResponse.builder()
                .eventId(event.getId())
                .program(event.getProgram().getName())
                .title(event.getTitle())
                .description(event.getDescription())
                .types(event.getTypes())
                .interests(event.getInterests())
                .skills(event.getSkills())
                .startTime(event.getStartTime().toString())
                .endTime(event.getEndTime().toString())
                .venue(event.getVenue())
                .quota(event.getQuota())
                .imgUrl(event.getImgUrl())
                .build();
    }

    public static List<MemberEventDetailResponse> from(List<Event> activeEventList) {
        return activeEventList.stream()
            .map(event -> MemberEventDetailResponse.builder()
                .eventId(event.getId())
                .program(event.getProgram().getName())
                .title(event.getTitle())
                .description(event.getDescription())
                .types(event.getTypes())
                .interests(event.getInterests())
                .skills(event.getSkills())
                .startTime(event.getStartTime().toString())
                .endTime(event.getEndTime().toString())
                .venue(event.getVenue())
                .quota(event.getQuota())
                .imgUrl(event.getImgUrl())
                .build())
            .toList();
    }
}
