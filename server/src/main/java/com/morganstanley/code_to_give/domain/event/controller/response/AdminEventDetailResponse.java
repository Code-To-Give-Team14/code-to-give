package com.morganstanley.code_to_give.domain.event.controller.response;

import com.morganstanley.code_to_give.domain.event.controller.request.ReminderTime;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import lombok.Builder;
import org.hibernate.boot.jaxb.mapping.DiscriminatedAssociation;

import java.util.List;

@Builder
public record AdminEventDetailResponse(
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
        Boolean isActivated,
        List<ReminderTime> reminder,
        String imgUrl
) {

    public static AdminEventDetailResponse from(Event event) {
        return AdminEventDetailResponse.builder()
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
                .isActivated(event.getIsActivated())
                .reminder(ReminderTime.formatReminderTime(event.getReminder()))
                .imgUrl(event.getImgUrl())
                .build();
    }
}
