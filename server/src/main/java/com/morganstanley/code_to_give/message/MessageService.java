package com.morganstanley.code_to_give.message;

import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
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

        return String.format(
                "Hi Lio, 🌟\n\n" +
                        "Just a friendly reminder that our event, '%s', is happening in just %s %s!\n\n" +
                        "We're excited to have you join us and make a positive impact together.\n\n" +
                        "See you soon!\n\n" +
                        "Warm regards,\n" +
                        "The Zubin Foundation Team",
                livedEvent.getTitle(), value, unit
        );
    }

    private String createRecommendationMessage(Event event) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd MMM yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String eventName = event.getTitle();
        String eventDate = event.getStartTime().format(dateFormatter);
        String eventTime = event.getStartTime().format(timeFormatter);
        String eventVenue = event.getVenue();
        String registrationLink = "https://www.zubinfoundation.org/team-14?eventId=29";

        // Create the message
        String message = String.format(
                "Hi %s, 🌻\n\n" +
                        "We thought you’d be interested in our upcoming event: %s!\n\n" +
                        "🗓️ Date: %s\n" +
                        "🕒 Time: %s\n" +
                        "🏛️ Location: %s\n\n" +
                        "Join us and be a part of something meaningful. Your participation can make a big difference!\n\n" +
                        "Reserve your spot here: %s\n\n" +
                        "Looking forward to seeing you there! 🙌\n\n" +
                        "Warm regards,\n" +
                        "Zubin Foundation",
                "Lio", eventName, eventDate, eventTime, eventVenue, registrationLink
        );

        return message;
    }

}
