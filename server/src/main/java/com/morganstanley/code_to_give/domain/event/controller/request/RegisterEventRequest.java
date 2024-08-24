package com.morganstanley.code_to_give.domain.event.controller.request;

public record RegisterEventRequest(
    Integer eventId,
    Boolean remindEmail,
    Boolean remindSMS
) {
}
