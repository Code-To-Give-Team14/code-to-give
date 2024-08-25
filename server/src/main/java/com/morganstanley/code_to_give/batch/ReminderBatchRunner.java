package com.morganstanley.code_to_give.batch;

import com.morganstanley.code_to_give.ai.Chatbot;
import com.morganstanley.code_to_give.ai.Recommendation;
import com.morganstanley.code_to_give.domain.event.EventOutboxMessageRepository;
import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.event.entity.EventOutboxMessage;
import com.morganstanley.code_to_give.domain.member.MemberService;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import com.morganstanley.code_to_give.global.exception.CustomException;
import com.morganstanley.code_to_give.message.MessageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_NOT_FOUND;
import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_REMINDER_NOT_VALID_FORMAT;

@Component
@RequiredArgsConstructor
@EnableScheduling
public class ReminderBatchRunner {

    private final EventRepository eventRepository;
    private final MessageService messageService;
    private final MemberService memberService;
    private final EventOutboxMessageRepository eventOutboxMessageRepository;


    @Transactional
    @Scheduled(fixedDelay = 1000)
    @Profile("dev")
    public void sendReminderMessage() {
        LocalDateTime now = LocalDateTime.now();
        List<Event> livedEvents = eventRepository.findByStartTimeAfterAndIsActivatedIsTrue(LocalDateTime.now());
        livedEvents.forEach(livedEvent -> {
            livedEvent.getReminder().stream()
                .filter(r -> livedEvent.getSentReminder() == null || !livedEvent.getSentReminder().contains(r))
                .forEach(reminder -> {
                    LocalDateTime reminderTime = getReminderTime(reminder, livedEvent.getStartTime());
                    if (now.isEqual(reminderTime) ||
                        now.isAfter(reminderTime)) {
                        messageService.sendReminderMessage(livedEvent, reminder);
                        livedEvent.getSentReminder().add(reminder);
                        eventRepository.save(livedEvent);
                    }
                });
        });
    }

    @Transactional
    @Scheduled(fixedDelay = 10000)
    @Profile("dev")
    public void handleEventCreatedEvent() {
        List<EventOutboxMessage> eventCreatedEvents = eventOutboxMessageRepository.findAll();

        eventCreatedEvents.forEach(event -> {
            Event newEvent = eventRepository.findById(event.getPayload().eventId())
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

            if (!newEvent.getInterestsEmbedding().isEmpty()) {
                List<Member> recommendedMember = Recommendation.getMemberByMatchingInterestsAndSkills(
                    memberService,
                    1,
                    newEvent.getInterests(),
                    newEvent.getSkills()
                );
                messageService.sendEventRecommendationMessage(newEvent, recommendedMember);
                eventOutboxMessageRepository.delete(event);
            }
        });
    }

    private LocalDateTime getReminderTime(String timeBeforeStartTime, LocalDateTime startTime) {

        char unit = timeBeforeStartTime.charAt(timeBeforeStartTime.length() - 1);
        int value = Integer.parseInt(timeBeforeStartTime.substring(0, timeBeforeStartTime.length() - 1));

        return switch (unit) {
            case 'h' -> startTime.minusHours(value);
            case 'd' -> startTime.minusDays(value);
            case 'w' -> startTime.minusWeeks(value);
            default -> throw new CustomException(EVENT_REMINDER_NOT_VALID_FORMAT);
        };
    }
}
