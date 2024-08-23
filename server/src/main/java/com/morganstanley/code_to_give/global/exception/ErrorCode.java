package com.morganstanley.code_to_give.global.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
    EVENT_NOT_FOUND(404, "EVENT_NOT_FOUND", "Cannot Found Event"),
    TRAINING_NOT_FOUND(404, "TRAINING_NOT_FOUND", "Cannot Found Training"),
    PROGRAM_NOT_FOUND(404, "PROGRAM_NOT_FOUND", "Cannot Found Program");;

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
