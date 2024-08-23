package com.morganstanley.code_to_give.chatbot;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;
import com.azure.core.credential.AzureKeyCredential;

import java.util.ArrayList;
import java.util.List;

public class Chatbot {
    public static String getResponse(String message) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<ChatRequestMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatRequestSystemMessage("You are a very delightful person! You are currently talking to your friend."));
        chatMessages.add(new ChatRequestUserMessage(message));

        return client
                .getChatCompletions("dev", new ChatCompletionsOptions(chatMessages))
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}
