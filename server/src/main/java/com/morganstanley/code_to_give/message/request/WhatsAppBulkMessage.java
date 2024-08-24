package com.morganstanley.code_to_give.message.request;

import java.util.List;

public record WhatsAppBulkMessage(
        List<String> to,
        String message
) {
}