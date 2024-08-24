package com.morganstanley.code_to_give.message.request;

import lombok.Getter;

public record WhatsAppMessage(
    String to,
    String message
) {

}

