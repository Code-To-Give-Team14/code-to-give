package com.morganstanley.code_to_give.global.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
    EVENT_NOT_FOUND(404, "EVENT_NOT_FOUND", "Cannot Find Event"),
    TRAINING_NOT_FOUND(404, "TRAINING_NOT_FOUND", "Cannot Find Training"),
    MEMBER_NOT_FOUND(404, "MEMBER_NOT_FOUND", "Cannot Find Member"),
    PROGRAM_NOT_FOUND(404, "PROGRAM_NOT_FOUND", "Cannot Find Program"),
    MEMBER_ALREADY_REGISTERED(409, "MEMBER_ALREADY_REGISTERED", "The Member Already Registered to This Event")
    ;


    @Getter
    private final int status;
    private final String code;
    private final String message;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
