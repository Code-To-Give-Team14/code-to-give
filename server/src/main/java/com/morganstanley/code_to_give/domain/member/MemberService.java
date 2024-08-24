package com.morganstanley.code_to_give.domain.member;

import com.morganstanley.code_to_give.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member getMemberByEmail(String email) {
        return memberRepository.findById(email).orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }
}
