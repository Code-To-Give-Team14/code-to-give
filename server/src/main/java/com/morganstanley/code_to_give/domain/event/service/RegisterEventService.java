package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.controller.request.RegisterEventRequest;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.event.entity.MemberEvent;
import com.morganstanley.code_to_give.domain.member.MemberRepository;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import com.morganstanley.code_to_give.global.exception.CustomException;
import com.morganstanley.code_to_give.infra.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_NOT_FOUND;
import static com.morganstanley.code_to_give.global.exception.ErrorCode.MEMBER_ALREADY_REGISTERED;
import static com.morganstanley.code_to_give.global.exception.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class RegisterEventService {

    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;
    private final TokenService tokenService;

    @Transactional
    public void registerEventService(
        RegisterEventRequest request
    ) {
        String memberEmail = tokenService.getTokenInfo().getMemberEmail();

        Event event = eventRepository.findById(request.eventId())
            .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        if (isDuplicatedRegister(event, memberEmail)) {
            throw new CustomException(MEMBER_ALREADY_REGISTERED);
        }

        Member member = memberRepository.findById(memberEmail)
            .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        MemberEvent memberEvent = new MemberEvent(
            member,
            event,
            request.remindEmail(),
            request.remindSMS()
        );

        event.getMemberEvents().add(memberEvent);
    }

    private Boolean isDuplicatedRegister(
        Event event,
        String memberId
    ) {
        List<MemberEvent> alreadyRegisteredMember = event.getMemberEvents().stream()
            .filter(memberEvent -> Objects.equals(memberEvent.getMember().getEmail(), memberId))
            .toList();
        return !alreadyRegisteredMember.isEmpty();
    }

}
