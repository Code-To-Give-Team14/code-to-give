package com.morganstanley.code_to_give;

import com.morganstanley.code_to_give.ai.Chatbot;
import com.morganstanley.code_to_give.domain.event.service.EventService;
import com.morganstanley.code_to_give.domain.member.MemberService;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@AllArgsConstructor
@CrossOrigin("*")
public class ChatbotController {

    private EventService eventService;
    private MemberService memberService;

    public static class ChatRequest {
        public List<Chatbot.Message> messages;
    }

    @PostMapping("/chat")
    public Chatbot.Message chat(@RequestBody ChatRequest request) {
        Member member = memberService.getMemberByEmail("lio-testing@email.com");
        String response = Chatbot.getResponse(member, request.messages, eventService);
        return new Chatbot.Message("bot", response);
    }
}
