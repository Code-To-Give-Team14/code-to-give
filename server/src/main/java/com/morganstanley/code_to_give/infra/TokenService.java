package com.morganstanley.code_to_give.infra;

import com.morganstanley.code_to_give.domain.member.entity.Member;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    public TokenDto getTokenInfo() {
        return new TokenDto("mock@mock.com");
//        return (TokenDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); //TODO: implement Spring Security

    }
}
