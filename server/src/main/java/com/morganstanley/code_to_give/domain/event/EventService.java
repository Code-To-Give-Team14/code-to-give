package com.morganstanley.code_to_give.domain.event;

import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.event.entity.EventRepository;
import com.morganstanley.code_to_give.domain.event.entity.MemberEvent;
import com.morganstanley.code_to_give.domain.event.entity.MemberTraining;
import com.morganstanley.code_to_give.domain.event.entity.Training;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final TrainingRepository trainingRepository;

    public List<Member> getRegisteredMembersByEvent(Integer eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(RuntimeException::new);

        return event.getMemberEvents().stream()
            .map(MemberEvent::getMember)
            .toList();
    }

    public List<Member> getTrainedMembersByTraining(Integer trainingId) {
        Training training = trainingRepository.findById(trainingId)
            .orElseThrow(RuntimeException::new);

        return training.getMemberTrainings().stream()
            .map(MemberTraining::getMember)
            .toList();
    }

}

