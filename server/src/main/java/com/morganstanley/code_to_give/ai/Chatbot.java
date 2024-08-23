package com.morganstanley.code_to_give.ai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.BinaryData;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

public class Chatbot {

    static final String functionalCallSystemPrompt = """
            Call the appropriate function to get the data you need for responding to the user.""";

    static final String systemPromptTemplate = """
            You are a helpful assistant on the Code To Give website of the Zubin Foundation,
            whose mission is to mission is to improve the lives of Hong Kong's ethnic minorities
            by reducing suffering and providing opportunities. You are here to help the user with their enquiry.
            You are currently talking to {FirstName}. You MUST NOT make up information that is not provided here.
            {Context} Please be polite and keep the conversation casual.""";

    public static class Message {
        public String role; // Only "user" or "bot"
        public String message;

        public Message(String role, String message) {
            this.role = role;
            this.message = message;
        }
    }

    public static class shouldGetEventRecommendations {
        public String isUserAskingForEventRecommendation;
    }

    public static String getResponse(List<Message> messages) {
        String model = System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT");

        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        // Build chat messages
        List<ChatRequestMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatRequestSystemMessage(functionalCallSystemPrompt));
        for (Message message : messages) {
            if (message.role.equals("user")) {
                chatMessages.add(new ChatRequestUserMessage(message.message));
            } else if (message.role.equals("bot")) {
                chatMessages.add(new ChatRequestAssistantMessage(message.message));
            }
        }

        // Get function call completions
        ChatCompletionsOptions functionCallOptions = new ChatCompletionsOptions(chatMessages);
        functionCallOptions.setFunctions(List.of(getEventRecommendationFunctionDefinition()));
        functionCallOptions.setFunctionCall(new FunctionCallConfig("shouldGetEventRecommendations"));
        ChatCompletions functionCallCompletions = client.getChatCompletions(model, functionCallOptions);

        String functionCallResponse = functionCallCompletions
                .getChoices()
                .get(0)
                .getMessage()
                .getFunctionCall()
                .getArguments();
        String isUserAskingForEventRecommendation = "No";
        try {
            isUserAskingForEventRecommendation = new ObjectMapper()
                    .readValue(functionCallResponse, shouldGetEventRecommendations.class)
                    .isUserAskingForEventRecommendation;
        } catch (Exception ignored) {}

        String context = switch (isUserAskingForEventRecommendation) {
            case "YesAsHelper" -> """
                    The recommended event for the user as a helper is the Smart City Gathering.
                    ONLY list out the event names for the user,
                    DO NOT make up event details that is not provided here,
                    ask the user if they need more information.""";
            case "YesAsAttendee" -> """
                    The recommended event for the user an attendee is the Code To Give Hackathon.
                    ONLY list out the event names for the user,
                    DO NOT make up event details that is not provided here,
                    ask the user if they need more information.""";
            case "YesAsEitherHelperOrAttendee" -> """
                    The recommended event for the user as a helper is the Smart City Gathering.
                    The recommended event for the user an attendee is the Code To Give Hackathon.
                    ONLY list out the event names for the user,
                    DO NOT make up event details that is not provided here,
                    ask the user if they need more information.""";
            default -> "Please chat with the user.";
        };

        // Get response
        chatMessages.set(0, new ChatRequestSystemMessage(systemPromptTemplate
                .replace("{FirstName}", "Lio")
                .replace("{Context}", context)
        ));

        return client
                .getChatCompletions(model, new ChatCompletionsOptions(chatMessages))
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }

    static FunctionDefinition getEventRecommendationFunctionDefinition() {
        FunctionDefinition functionDefinition = new FunctionDefinition("shouldGetEventRecommendations");
        functionDefinition.setDescription("Determine whether user is asking for event recommendations.");
        functionDefinition.setParameters(BinaryData.fromString("""
                {
                   "type": "object",
                   "properties": {
                       "isUserAskingForEventRecommendation": {
                           "type": "string",
                           "enum": ["No", "YesAsHelper", "YesAsAttendee", "YesAsEitherHelperOrAttendee"],
                           "description": "No if user is not asking for event recommendations, YesAsHelper if user is asking for event that they can be a helper or volunteer at, YesAsAttendee if user is asking for event that they can participate as an attendee, YesAsEitherHelperOrAttendee if user is asking for event that they can either be a helper or an attendee."
                       }
                   },
                   "required": ["isUserAskingForEventRecommendation"]
               }"""));
        return functionDefinition;
    }

}
