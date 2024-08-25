package com.morganstanley.code_to_give.domain.member;

import com.morganstanley.code_to_give.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    public Member getMemberByEmail(String email) {
        return memberRepository.findById(email).orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public void updateInterestsAndSkills(String email, List<String> interests, List<String> skills) {
        Member member = memberRepository.findById(email).orElseThrow(() -> new RuntimeException("Member not found"));
        member.updateInterestsAndSkills(interests, skills);
        memberRepository.save(member);
    }
}
