package com.morganstanley.code_to_give.ai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.morganstanley.code_to_give.domain.event.service.EventService;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.member.MemberService;
import com.morganstanley.code_to_give.domain.member.entity.Member;

import java.util.ArrayList;
import java.util.List;

public class Recommendation {

    public static List<Member> getMemberByMatchingInterestsAndSkills(
            MemberService memberService,
            Integer limit,
            List<String> interests,
            List<String> skills
    ) {
        List<Float> interestsEmbedding = getEmbedding(interests);
        List<Float> skillsEmbedding = getEmbedding(skills);
        return memberService
                .getMembers()
                .stream()
                .map(member -> new MemberSimilarity(
                        member,
                        computeSimilarity(interestsEmbedding, member.getInterestsEmbedding())
                                + computeSimilarity(skillsEmbedding, member.getSkillsEmbedding())
                ))
                .sorted((a, b) -> b.similarity.compareTo(a.similarity))
                .limit(10)
                .map(memberSimilarity -> memberSimilarity.member)
                .toList();
    }

    public static List<Float> getEmbedding(List<String> texts) {
        try {
            OpenAIClient client = new OpenAIClientBuilder()
                    .endpoint("https://openai-lio.openai.azure.com/")
                    .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                    .buildClient();

            EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", texts)));
            Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);

            return embeddings.getData().get(0).getEmbedding();
        } catch (Exception ignored) {
            return List.of();
        }
    }

    public static List<Event> findInterests(Member member, EventService eventService) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<String> userInterests = new ArrayList<>(member.getInterests());
        List<Event> events = getPotentialUserEvents(member, eventService);

        if (userInterests.isEmpty() || events.isEmpty()) {
            return events;
        }

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", userInterests)));
        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);
        List<Float> userEmbedding = embeddings.getData().get(0).getEmbedding();

        return events
                .stream()
                .filter(event -> event.getInterestsEmbedding() != null && !event.getInterestsEmbedding().isEmpty())
                .map(event -> new EventSimilarity(event, computeSimilarity(userEmbedding, event.getInterestsEmbedding())))
                .sorted((a, b) -> b.similarity.compareTo(a.similarity))
                .map(event -> event.event)
                .toList();
    }

    public static List<Event> findSkills(Member member, EventService eventService) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<String> userSkills = new ArrayList<>(member.getSkills());
        List<Event> events = getPotentialUserEvents(member, eventService);

        if (userSkills.isEmpty() || events.isEmpty()) {
            return events;
        }

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", userSkills)));
        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);
        List<Float> userEmbedding = embeddings.getData().get(0).getEmbedding();

        return events
                .stream()
                .filter(event -> event.getSkillsEmbedding() != null && !event.getSkillsEmbedding().isEmpty())
                .map(event -> new EventSimilarity(event, computeSimilarity(userEmbedding, event.getSkillsEmbedding())))
                .sorted((a, b) -> b.similarity.compareTo(a.similarity))
                .map(event -> event.event)
                .toList();
    }

    static class EventSimilarity {
        Event event;
        Float similarity;

        public EventSimilarity(Event event, Float similarity) {
            this.event = event;
            this.similarity = similarity;
        }
    }

    static class MemberSimilarity {
        Member member;
        Float similarity;

        public MemberSimilarity(Member member, Float similarity) {
            this.member = member;
            this.similarity = similarity;
        }
    }

    static List<Event> getPotentialUserEvents(Member member, EventService eventService) {
        return eventService
                .getEvents()
                .stream()
                .filter(event -> member
                        .getMemberEvents()
                        .stream()
                        .map(memberEvent -> memberEvent
                                .getEvent()
                                .getId()
                        )
                        .noneMatch(id -> id
                                .equals(event.getId())
                        ) && member
                        .getMemberTrainings()
                        .stream()
                        .map(memberTraining -> memberTraining
                                .getTraining()
                                .getEvent()
                                .getId()
                        )
                        .noneMatch(id -> id
                                .equals(event.getId())
                        )
                )
                .toList();
    }

    static Float computeSimilarity(List<Float> a, List<Float> b) {
        double dotProduct = 0f;
        double normASum = 0f;
        double normBSum = 0f;

        for (int i = 0; i < Math.min(a.size(), b.size()); i++) {
            dotProduct += a.get(i) * b.get(i);
            normASum += a.get(i) * a.get(i);
            normBSum += b.get(i) * b.get(i);
        }

        double dist = Math.sqrt(normASum) * Math.sqrt(normBSum);
        if (dist == 0) {
            return 0f;
        }
        return (float)(dotProduct / dist);
    }

}
