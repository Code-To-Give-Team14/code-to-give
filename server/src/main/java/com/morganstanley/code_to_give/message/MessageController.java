package com.morganstanley.code_to_give.message;

import com.morganstanley.code_to_give.message.request.WhatsAppBulkMessage;
import com.morganstanley.code_to_give.message.request.WhatsAppMessage;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/message")
@AllArgsConstructor
public class MessageController {

    private final WhatsAppService whatsAppService;

    @PostMapping("/whatsapp/send")
    public String sendWhatsAppMessage(@RequestBody WhatsAppMessage request) {
        whatsAppService.sendWhatsAppMessage(request.to(), request.message());
        return "Message sent successfully";
    }


    @PostMapping("/send-whatsapp-bulk")
    public List<String> sendWhatsAppMessageBulk(@RequestBody WhatsAppBulkMessage message) {
        return whatsAppService.sendWhatsAppMessageToMultipleUsers(message.to(), message.message());
    }

}
