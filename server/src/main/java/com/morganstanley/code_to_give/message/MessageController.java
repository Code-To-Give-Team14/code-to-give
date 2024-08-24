package com.morganstanley.code_to_give.message;

import com.morganstanley.code_to_give.message.request.WhatsAppBulkMessage;
import com.morganstanley.code_to_give.message.request.WhatsAppMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/message")
@AllArgsConstructor
public class MessageController {

    private final WhatsAppService whatsAppService;

    @PostMapping("/send-whatsapp")
    public ResponseEntity<String> sendWhatsAppMessage(@RequestBody WhatsAppMessage request) {
        String result = whatsAppService.sendWhatsAppMessage(request.to(), request.message());
        return ResponseEntity.ok(result);

    }


    @PostMapping("/send-whatsapp-bulk")
    public ResponseEntity<List<String>> sendWhatsAppMessageBulk(@RequestBody WhatsAppBulkMessage message) {
        List<String> result = whatsAppService.sendWhatsAppMessageToMultipleUsers(message.to(), message.message());
        return ResponseEntity.ok(result);
    }

}
