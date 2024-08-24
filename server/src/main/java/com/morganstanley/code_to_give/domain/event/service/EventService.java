package com.morganstanley.code_to_give.domain.event.service;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.TrainingRepository;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.event.entity.MemberEvent;
import com.morganstanley.code_to_give.domain.event.entity.MemberTraining;
import com.morganstanley.code_to_give.domain.event.entity.Training;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import com.morganstanley.code_to_give.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_NOT_FOUND;
import static com.morganstanley.code_to_give.global.exception.ErrorCode.TRAINING_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final TrainingRepository trainingRepository;

    public List<Member> getRegisteredMembersByEvent(Integer eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        return event.getMemberEvents().stream()
            .map(MemberEvent::getMember)
            .toList();
    }

    public List<Member> getTrainedMembersByTraining(Integer trainingId) {
        Training training = trainingRepository.findById(trainingId)
            .orElseThrow(() -> new CustomException(TRAINING_NOT_FOUND));

        return training.getMemberTrainings().stream()
            .map(MemberTraining::getMember)
            .toList();
    }

    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

}

