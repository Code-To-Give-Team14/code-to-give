package com.morganstanley.code_to_give.ai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.BinaryData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.morganstanley.code_to_give.domain.event.controller.response.EventListResponse;
import com.morganstanley.code_to_give.domain.event.service.EventService;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.member.entity.Member;

import java.util.*;

public class Chatbot {

    static final String functionalCallSystemPrompt = "Call the appropriate function to get the data you need for responding to the user.";

    static final String systemPromptTemplate = "You are a helpful assistant on the Code To Give website of the Zubin Foundation, whose mission is to mission is to improve the lives of Hong Kong's ethnic minorities by reducing suffering and providing opportunities. You must answer the user's question. You are currently talking to {FirstName} {LastName}. You MUST NOT make up information that is not provided here. {Context}Please be friendly and keep the conversation casual.";

    public static class Message {

        public static class ExtraItems {
            public List<EventListResponse> eventForUserToJoinAsMember;
            public List<EventListResponse> eventForUserToJoinAsVolunteer;
        }

        public String type; // Only "user" or "bot"
        public String message;
        public ExtraItems items;

        public Message(
                String type,
                String message,
                List<EventListResponse> eventForUserToJoinAsMember,
                List<EventListResponse> eventForUserToJoinAsVolunteer
        ) {
            this.type = type;
            this.message = message;
            this.items = new ExtraItems();
            this.items.eventForUserToJoinAsMember = eventForUserToJoinAsMember;
            this.items.eventForUserToJoinAsVolunteer = eventForUserToJoinAsVolunteer;
        }
    }

    public static class shouldGetEventRecommendations {
        public String isUserAskingForEventRecommendation;
    }

    public static Message getResponse(Member member, List<Message> messages, EventService eventService) {
        String model = System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT");

        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        // Build chat messages
        List<ChatRequestMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatRequestSystemMessage(functionalCallSystemPrompt));
        for (Message message : messages) {
            if (message.type.equals("user")) {
                chatMessages.add(new ChatRequestUserMessage(message.message));
            } else if (message.type.equals("bot")) {
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

        String context = "";
        List<Event> helperEvents = new ArrayList<>();
        if (isUserAskingForEventRecommendation.equals("YesAsHelper") || isUserAskingForEventRecommendation.equals("YesAsEitherHelperOrAttendee")) {
            List<Event> events = Recommendation.findSkills(member, eventService);
            if (!events.isEmpty()) {
                context += "Some relevant events for the user to participate as a helper (sorted from more to less suitable for the user) are:\n"
                        + String.join(
                        ",\n",
                        events
                                .stream()
                                .limit(2)
                                .map(Event::toChatbotString)
                                .toList()
                )
                        + ".\n";
                helperEvents = events
                        .stream()
                        .limit(2)
                        .toList();
            }
        }
        List<Event> attendeeEvents = new ArrayList<>();
        if (isUserAskingForEventRecommendation.equals("YesAsAttendee") || isUserAskingForEventRecommendation.equals("YesAsEitherHelperOrAttendee")) {
            List<Event> events = Recommendation.findInterests(member, eventService);
            if (!events.isEmpty()) {
                context += "Some relevant events for the user to participate as an attendee (sorted from more to less suitable for the user) are:\n"
                        + String.join(
                        ",\n",
                        events
                                .stream()
                                .limit(2)
                                .map(Event::toChatbotString)
                                .toList()
                )
                        + ".\n";
                attendeeEvents = events
                        .stream()
                        .limit(2)
                        .toList();
            }
        }
        if (context.isEmpty()) {
            context += "Please chat with the user. ";
        } else {
            context += "ONLY LIST OUT THE EVENT NAMES, DO NOT MAKE UP ANY INFORMATION, ASK DOES THE USER WANT TO KNOW MORE ABOUT THE EVENT. ";
        }

        // Get response
        chatMessages.set(0, new ChatRequestSystemMessage(systemPromptTemplate
                .replace("{FirstName}", member.getFirstName())
                .replace("{LastName}", member.getLastName())
                .replace("{Context}", context)
        ));

        String responseMessage = client
                .getChatCompletions(model, new ChatCompletionsOptions(chatMessages))
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();

        return new Message(
                "bot",
                responseMessage,
                EventListResponse.from(attendeeEvents),
                EventListResponse.from(helperEvents)
        );
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
