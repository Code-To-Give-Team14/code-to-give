package com.morganstanley.code_to_give;

import com.morganstanley.code_to_give.ai.Chatbot;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
public class ChatbotController {

    public static class ChatRequest {
        public List<Chatbot.Message> messages;
    }

    @PostMapping("/chat")
    public Chatbot.Message chat(@RequestBody ChatRequest request) {
        String response = Chatbot.getResponse(request.messages);
        return new Chatbot.Message("bot", response);
    }
}
