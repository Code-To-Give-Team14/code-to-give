package com.morganstanley.code_to_give.message;

import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.member.entity.Member;
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

    public void sendReminderMessage(Event livedEvent, String reminder) {
        List<String> recipientPhoneNumbers = livedEvent.getMemberEvents().stream()
                .map(memberEvent -> memberEvent.getMember().getSms())
                .toList();

        String message = createRemindMessage(livedEvent, reminder);
        whatsAppMessageSender.sendWhatsAppMessageToMultipleUsers(recipientPhoneNumbers, message);
    }

    public void sendEventRecommendationMessage(Event event, List<Member> members) {
        List<String> recipientPhoneNumbers = members.stream().map(Member::getSms).toList();
        String message = createRecommendationMessage(event);
        whatsAppMessageSender.sendWhatsAppMessageToMultipleUsers(recipientPhoneNumbers, message);

    }

    private String createRemindMessage(Event livedEvent, String reminder) {
        String value = reminder.substring(0, reminder.length() - 1);
        String unit = TIME_UNITS.get(reminder.substring(reminder.length() - 1));

        return String.format("Greetings from Jubin Foundation! " +
                        "This is a reminder that our event '%s' is coming up in %s %s. We're looking forward to seeing you there!",
                livedEvent.getTitle(), value, unit);
    }

    private String createRecommendationMessage(Event event) {
        return String.format(
            //TODO: replace [Event URL] after front web server is published
            "Empower yourself! '%s' awaits. Click for details: https://www.zubinfoundation.org/team-14?eventId=29", event.getTitle());
    }

}
