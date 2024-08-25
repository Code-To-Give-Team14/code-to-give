package com.morganstanley.code_to_give.ai;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.member.MemberRepository;
import com.morganstanley.code_to_give.domain.member.MemberService;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import com.morganstanley.code_to_give.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_NOT_FOUND;
import static com.morganstanley.code_to_give.global.exception.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @Async
    @Transactional
    public void saveEventEmbedding(
        Integer eventId,
        List<String> skills,
        List<String> interests
    ) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        List<Float> skillsEmbedding = Recommendation.getEmbedding(skills);
        List<Float> interestsEmbedding = Recommendation.getEmbedding(interests);

        event.updateEmbeddings(skillsEmbedding, interestsEmbedding);

        eventRepository.save(event);
    }

    public void saveMemberEmbedding(
        String memberEmail,
        List<String> skills,
        List<String> interests
    ) {
        Member member = memberRepository.findById(memberEmail)
            .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        List<Float> skillsEmbedding = Recommendation.getEmbedding(skills);
        List<Float> interestsEmbedding = Recommendation.getEmbedding(interests);

        member.updateEmbeddings(skillsEmbedding, interestsEmbedding);

        memberRepository.save(member);
    }
}
