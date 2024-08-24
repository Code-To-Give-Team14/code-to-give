package com.morganstanley.code_to_give.domain.event.batch;

import com.morganstanley.code_to_give.domain.event.EventRepository;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_REMINDER_NOT_VALID_FORMAT;

@Component
@RequiredArgsConstructor
@EnableScheduling
public class ReminderBatchRunner {

    private final EventRepository eventRepository;

    @Scheduled(fixedDelay = 1000)
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
                        System.out.println("SEND MESSAGE");
                        livedEvent.getSentReminder().add(reminder);
                        eventRepository.save(livedEvent);
                    }
                });
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
