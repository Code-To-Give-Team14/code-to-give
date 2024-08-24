package com.morganstanley.code_to_give.message;

import com.morganstanley.code_to_give.domain.event.entity.Event;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class MessageService {

    private static final Map<String, String> TIME_UNITS = Map.of(
            "h", "hours",
            "d", "days",
            "w", "weeks"
    );

    private final WhatsAppMessageSender whatsAppMessageSender;

    public void sendMessage(Event livedEvent, String reminder) {
        List<String> recipientPhoneNumbers = livedEvent.getMemberEvents().stream()
                .map(memberEvent -> memberEvent.getMember().getSms())
                .toList();

        String message = createRemindMessage(livedEvent, reminder);
        whatsAppMessageSender.sendWhatsAppMessageToMultipleUsers(recipientPhoneNumbers, message);
    }


    private String createRemindMessage(Event livedEvent, String reminder) {
        String value = reminder.substring(0, reminder.length() - 1);
        String unit = TIME_UNITS.get(reminder.substring(reminder.length() - 1));

        return String.format("Greetings from Jubin Foundation! " +
                        "This is a reminder that our event '%s' is coming up in %s %s. We're looking forward to seeing you there!",
                livedEvent.getTitle(), value, unit);
    }

}
