package com.morganstanley.code_to_give.global.exception;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private final int status;
    private final String code;
    private final String message;

    public ErrorResponse(ErrorCode errorCode){
        this.status = errorCode.getStatus();
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }

    public ErrorResponse(Integer status, String code, String message){
        this.status = status;
        this.code = code;
        this.message = message;
    }
}