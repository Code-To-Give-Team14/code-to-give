package com.morganstanley.code_to_give.message;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class WhatsAppService {

    private final TwilioConfig twilioConfig;

    public WhatsAppService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

    public void sendWhatsAppMessage(String to, String messageBody) {
        Message message = Message.creator(
                        new com.twilio.type.PhoneNumber("whatsapp:" + to),
                        new com.twilio.type.PhoneNumber("whatsapp:+" + twilioConfig.getWhatsappNumber()),
                        messageBody)
                .create();

        System.out.println(message.getSid());
    }

    public List<String> sendWhatsAppMessageToMultipleUsers(List<String> recipients, String messageBody) {
        List<String> results = new ArrayList<>();
        List<CompletableFuture<Void>> futures = new ArrayList<>();

        for (String recipient : recipients) {
            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                try {
                    Message message = Message.creator(
                                    new com.twilio.type.PhoneNumber("whatsapp:" + recipient),
                                    new com.twilio.type.PhoneNumber("whatsapp:+" + twilioConfig.getWhatsappNumber()),
                                    messageBody)
                            .create();
                    results.add("Message sent to " + recipient + ". SID: " + message.getSid());
                } catch (Exception e) {
                    results.add("Failed to send message to " + recipient + ". Error: " + e.getMessage());
                }
            });
            futures.add(future);
        }

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        return results;
    }

}
