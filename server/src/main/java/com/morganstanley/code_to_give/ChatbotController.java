package com.morganstanley.code_to_give;

import com.morganstanley.code_to_give.ai.Chatbot;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class ChatbotController {

    public static class ChatRequest {
        public List<Chatbot.Message> messages;
    }

    @PostMapping("/chat")
    public Chatbot.Message chat(@RequestBody ChatRequest request) {
        return new Chatbot.Message("bot", Chatbot.getResponse(request.messages));
    }
}
