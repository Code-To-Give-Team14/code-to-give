package com.morganstanley.code_to_give.domain.member;

import com.morganstanley.code_to_give.ai.Recommendation;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    public static class MemberUpdateInterestsSkillsRequest {
        public String email;
        public List<String> interests;
        public List<String> skills;
    }

    public static class MemberRequest {
        public String email;
        public String firstName;
        public String lastName;
        public String password;
        public String sms;
        public List<String> skills;
        public List<String> interests;
        public String location;
        public String language;
        public Boolean isAdmin;
    }

    @PostMapping("/create")
    public Member createMember(@RequestBody MemberRequest memberRequest) {
        return memberService.createMember(new Member(
                memberRequest.email,
                memberRequest.firstName,
                memberRequest.lastName,
                memberRequest.password,
                memberRequest.sms,
                memberRequest.skills,
                Recommendation.getEmbedding(memberRequest.skills),
                memberRequest.interests,
                Recommendation.getEmbedding(memberRequest.interests),
                memberRequest.location,
                memberRequest.language,
                memberRequest.isAdmin
        ));
    }

    @PostMapping("/update-interests-skills")
    public void updateMemberInterestsSkills(@RequestBody MemberUpdateInterestsSkillsRequest request) {
        memberService.updateInterestsAndSkills(request.email, request.interests, request.skills);
    }

}
