package com.morganstanley.code_to_give.global.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;


public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> customExceptionHandler(CustomException customException) {
        HttpHeaders resHeaders = new HttpHeaders();
        resHeaders.add("Content-Type", "application/json;charset=UTF-8");

        ErrorCode errorCode = customException.getErrorCode();
        ErrorResponse errorResponse = new ErrorResponse(errorCode);
        HttpStatus httpStatus = HttpStatus.resolve(errorCode.getStatus());
        if (httpStatus == null) httpStatus = INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(errorResponse, resHeaders, httpStatus);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> runtimeExceptionHandler(RuntimeException e) {
        HttpHeaders resHeaders = new HttpHeaders();
        resHeaders.add("Content-Type", "application/json;charset=UTF-8");

        String errorMessage = e.getMessage();
        ErrorResponse errorResponse = getErrorResponse(errorMessage);
        return new ResponseEntity<>(errorResponse, resHeaders, INTERNAL_SERVER_ERROR);
    }

    public ErrorResponse getErrorResponse(String message) {
        return new ErrorResponse(INTERNAL_SERVER_ERROR.value(), "UNEXPECTED_ERROR", message);
    }
}
