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
import com.morganstanley.code_to_give.domain.member.MemberService;
import com.morganstanley.code_to_give.domain.member.entity.Member;

import java.util.*;

public class Chatbot {

    static final String functionalCallSystemPrompt = "Call the appropriate function to get the data you need for responding to the user.";

    static final String systemPromptTemplate = "You are a helpful assistant on the Code To Give website of the Zubin Foundation, whose mission is to mission is to improve the lives of Hong Kong's ethnic minorities by reducing suffering and providing opportunities. You must answer the user's question. You are currently talking to {FirstName} {LastName}. You MUST NOT make up information that is not provided here. {Context}Please be friendly and keep the conversation casual.";

    public static class Message {

        public static class ExtraItems {
            public List<EventListResponse> eventForUserToJoinAsMember;
            public List<EventListResponse> eventForUserToJoinAsVolunteer;
            public List<String> newInterests;
            public List<String> newSkills;
        }

        public String type; // Only "user" or "bot"
        public String message;
        public ExtraItems items;

        public Message(
                String type,
                String message,
                List<EventListResponse> eventForUserToJoinAsMember,
                List<EventListResponse> eventForUserToJoinAsVolunteer,
                List<String> newInterests,
                List<String> newSkills
        ) {
            this.type = type;
            this.message = message;
            this.items = new ExtraItems();
            this.items.eventForUserToJoinAsMember = eventForUserToJoinAsMember;
            this.items.eventForUserToJoinAsVolunteer = eventForUserToJoinAsVolunteer;
            this.items.newInterests = newInterests;
            this.items.newSkills = newSkills;
        }
    }

    public static class shouldGetEventRecommendations {
        public String isUserAskingForEventRecommendation;
    }

    public static class AddNewInterestsOrSkills {
        public List<String> addInterests;
        public List<String> addSkills;
    }

    public static Message getResponse(Member member, List<Message> messages, EventService eventService, MemberService memberService) {
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
        ChatCompletionsOptions shouldGetEventRecommendationsFunctionCallOptions = new ChatCompletionsOptions(chatMessages);
        shouldGetEventRecommendationsFunctionCallOptions.setFunctions(List.of(getEventRecommendationFunctionDefinition()));
        shouldGetEventRecommendationsFunctionCallOptions.setFunctionCall(new FunctionCallConfig("shouldGetEventRecommendations"));
        ChatCompletions shouldGetEventRecommendationsFunctionCallCompletions = client.getChatCompletions(model, shouldGetEventRecommendationsFunctionCallOptions);

        String shouldGetEventRecommendationsFunctionCallResponse = shouldGetEventRecommendationsFunctionCallCompletions
                .getChoices()
                .get(0)
                .getMessage()
                .getFunctionCall()
                .getArguments();
        String isUserAskingForEventRecommendation = "No";
        try {
            isUserAskingForEventRecommendation = new ObjectMapper()
                    .readValue(shouldGetEventRecommendationsFunctionCallResponse, shouldGetEventRecommendations.class)
                    .isUserAskingForEventRecommendation;
        } catch (Exception ignored) {}


        ChatCompletionsOptions addNewInterestsOrSkillsFunctionCallOptions = new ChatCompletionsOptions(chatMessages);
        addNewInterestsOrSkillsFunctionCallOptions.setFunctions(List.of(addNewInterestsOrSkillsFunctionDefinition()));
        addNewInterestsOrSkillsFunctionCallOptions.setFunctionCall(new FunctionCallConfig("addNewInterestsOrSkills"));
        ChatCompletions addNewInterestsOrSkillsFunctionCallCompletions = client.getChatCompletions(model, addNewInterestsOrSkillsFunctionCallOptions);

        String addNewInterestsOrSkillsFunctionCallResponse = addNewInterestsOrSkillsFunctionCallCompletions
                .getChoices()
                .get(0)
                .getMessage()
                .getFunctionCall()
                .getArguments();
        AddNewInterestsOrSkills addNewInterestsOrSkills = new AddNewInterestsOrSkills();
        try {
            addNewInterestsOrSkills = new ObjectMapper()
                    .readValue(addNewInterestsOrSkillsFunctionCallResponse, AddNewInterestsOrSkills.class);
        } catch (Exception ignored) {}

        String context = "";

        List<String> newInterests = new ArrayList<>();
        if (addNewInterestsOrSkills.addInterests != null && !addNewInterestsOrSkills.addInterests.isEmpty()) {
            newInterests.addAll(addNewInterestsOrSkills.addInterests);
            List<String> interests = new ArrayList<>(member.getInterests().stream().toList());
            interests.addAll(addNewInterestsOrSkills.addInterests);
            memberService.updateInterestsAndSkills(member.getEmail(), interests, member.getSkills());
            context += "Tell the user that their interests have been updated to include " + String.join(", ", addNewInterestsOrSkills.addInterests) + ".\n";
        }

        List<String> newSkills = new ArrayList<>();
        if (addNewInterestsOrSkills.addSkills != null && !addNewInterestsOrSkills.addSkills.isEmpty()) {
            newSkills.addAll(addNewInterestsOrSkills.addSkills);
            List<String> skills = new ArrayList<>(member.getSkills().stream().toList());
            skills.addAll(addNewInterestsOrSkills.addSkills);
            memberService.updateInterestsAndSkills(member.getEmail(), member.getInterests(), skills);
            context += "Tell the user that their interests have been updated to include " + String.join(", ", addNewInterestsOrSkills.addSkills) + ".\n";
        }

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
            context += "ONLY LIST OUT THE EVENT NAMES, DO NOT MAKE UP ANY INFORMATION, ASK DOES THE USER WANT TO KNOW MORE ABOUT THE EVENT AND ONLY GIVE THE USER MORE DETAILED INFORMATION IF THEY ASKED FOR IT. ";
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
                EventListResponse.from(helperEvents),
                newInterests,
                newSkills
        );
    }

    static FunctionDefinition getEventRecommendationFunctionDefinition() {
        FunctionDefinition functionDefinition = new FunctionDefinition("shouldGetEventRecommendations");
        functionDefinition.setDescription("Determine whether user is asking for event recommendations ONLY in the LATEST SINGLE message.");
        functionDefinition.setParameters(BinaryData.fromString("""
                {
                   "type": "object",
                   "properties": {
                       "isUserAskingForEventRecommendation": {
                           "type": "string",
                           "enum": ["No", "YesAsHelper", "YesAsAttendee", "YesAsEitherHelperOrAttendee"],
                           "description": "No if user is not asking for event recommendations in the latest single message, YesAsHelper if user is asking for event that they can be a helper or volunteer at, YesAsAttendee if user is asking for event that they can participate as an attendee, YesAsEitherHelperOrAttendee if user is asking for event that they can either be a helper or an attendee."
                       }
                   },
                   "required": ["isUserAskingForEventRecommendation"]
               }"""));
        return functionDefinition;
    }

    static FunctionDefinition addNewInterestsOrSkillsFunctionDefinition() {
        FunctionDefinition functionDefinition = new FunctionDefinition("addNewInterestsOrSkills");
        functionDefinition.setDescription("Determine whether user is asking to add some new interests or skills.");
        functionDefinition.setParameters(BinaryData.fromString("""
                {
                   "type": "object",
                   "properties": {
                       "addInterests": {
                           "type": "array",
                            "items": {
                                 "type": "string"
                            },
                           "description": "Interests the user wants to add, empty list if user does not want to add any interests."
                       },
                       "addSkills": {
                           "type": "array",
                            "items": {
                                 "type": "string"
                            },
                           "description": "Skills the user wants to add, empty list if user does not want to add any skills."
                       }
                   },
                   "required": ["addInterests", "addSkills"]
               }"""));
        return functionDefinition;
    }

}
