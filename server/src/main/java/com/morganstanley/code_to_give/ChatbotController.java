package com.morganstanley.code_to_give;

import com.morganstanley.code_to_give.chatbot.Chatbot;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ChatbotController {

    public static class ChatRequest {
        public String message;
    }

    @PostMapping("/chat")
    public String hello(@RequestBody ChatRequest request) {
        return Chatbot.getResponse(request.message);
    }
}
