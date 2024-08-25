package com.morganstanley.code_to_give;

import com.morganstanley.code_to_give.ai.Recommendation;
import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.member.MemberService;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import com.morganstanley.code_to_give.global.exception.CustomException;
import com.morganstanley.code_to_give.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_NOT_FOUND;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class HealthzController {

    private final EventRepository eventRepository;
    private final MessageService messageService;
    private final MemberService memberService;

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {

//        Event newEvent = eventRepository.findById(37)
//            .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));
//
//        if (!newEvent.getInterestsEmbedding().isEmpty()) {
//            List<Member> recommendedMember = Recommendation.getMemberByMatchingInterestsAndSkills(
//                memberService,
//                1,
//                newEvent.getInterests(),
//                newEvent.getSkills()
//            );
//            messageService.sendEventRecommendationMessage(newEvent, recommendedMember);
//        }


        return ResponseEntity.ok().body("pong");
    }
}
