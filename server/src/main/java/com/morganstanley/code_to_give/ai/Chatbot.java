package com.morganstanley.code_to_give.ai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;

import java.util.ArrayList;
import java.util.List;

public class Chatbot {
    public static class Message {
        public String role; // Only "user" or "bot"
        public String message;

        public Message(String role, String message) {
            this.role = role;
            this.message = message;
        }
    }

    public static String getResponse(List<Message> messages) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<ChatRequestMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatRequestSystemMessage("You are a very delightful person! You are currently talking to your friend."));
        for (Message message : messages) {
            if (message.role.equals("user")) {
                chatMessages.add(new ChatRequestUserMessage(message.message));
            } else if (message.role.equals("bot")) {
                chatMessages.add(new ChatRequestAssistantMessage(message.message));
            }
        }

        return client
                .getChatCompletions("dev", new ChatCompletionsOptions(chatMessages))
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}
