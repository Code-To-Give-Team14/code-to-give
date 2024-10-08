package com.morganstanley.code_to_give.domain.member;

import com.morganstanley.code_to_give.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {

}

