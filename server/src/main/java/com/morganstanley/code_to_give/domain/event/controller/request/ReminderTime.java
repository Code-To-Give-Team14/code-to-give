package com.morganstanley.code_to_give.domain.event.controller.request;

import com.morganstanley.code_to_give.global.exception.CustomException;
import java.util.List;
import static com.morganstanley.code_to_give.global.exception.ErrorCode.EVENT_REMINDER_NOT_VALID_FORMAT;

public record ReminderTime(
        Integer value,
        String unit
) {

    public static List<String> unFormatReminderTime(List<ReminderTime> reminderTimeList) {
        if (reminderTimeList == null) {
            return List.of();
        }
        return reminderTimeList.stream()
                .map(reminderTime -> reminderTime.value().toString() + reminderTime.unit().charAt(0))
                .toList();
    }

    public static List<ReminderTime> formatReminderTime(List<String> reminderTime) {
        if (reminderTime == null) {
            return List.of();
        }
        return reminderTime.stream()
                .map(formattedString -> new ReminderTime(
                        Integer.valueOf(formattedString.substring(0, formattedString.length() - 1)),
                        convertUnit(formattedString.charAt(formattedString.length() - 1))
                ))
                .toList();
    }

    private static String convertUnit(char unitChar) {
        return switch (unitChar) {
            case 'd' -> "days";
            case 'h' -> "hours";
            case 'w' -> "weeks";
            default -> throw new CustomException(EVENT_REMINDER_NOT_VALID_FORMAT);
        };
    }

}
