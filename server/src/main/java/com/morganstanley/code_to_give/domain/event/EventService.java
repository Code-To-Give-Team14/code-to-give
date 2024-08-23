package com.morganstanley.code_to_give.domain.event;

import com.morganstanley.code_to_give.domain.event.entity.*;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final MemberEventRepository memberService;

    private final MemberTrainingRepository memberTrainingRepository;

    private final TrainingRepository trainingRepository;

}

