package com.morganstanley.code_to_give.ai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.morganstanley.code_to_give.domain.event.entity.Event;
import com.morganstanley.code_to_give.domain.member.entity.Member;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Recommendation {

    // For testing purposes
    private static final List<String> event1Interests = Arrays.asList("Coding", "Hackathon");
    private static final List<String> event2Interests = Arrays.asList("Football", "Sports", "Training");
    private static final List<Event> events = Arrays.asList(
            new Event(
                    "Code to Give",
                    "A hackathon for people interested in coding",
                    List.of(),
                    List.of(),
                    List.of(),
                    event1Interests,
                    getEmbedding(event1Interests),
                    LocalDateTime.now(),
                    LocalDateTime.now(),
                    "Venue A",
                    100,
                    List.of()
            ),
            new Event(
                    "Football training",
                    "Football training for people of all age",
                    List.of(),
                    List.of(),
                    List.of(),
                    event2Interests,
                    getEmbedding(event2Interests),
                    LocalDateTime.now(),
                    LocalDateTime.now(),
                    "Venue B",
                    20,
                    List.of()
            )
    );

    public static List<Float> getEmbedding(List<String> texts) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", texts)));
        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);

        return embeddings.getData().get(0).getEmbedding();
    }

    public static List<Event> findInterests(Member member) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<String> userInterests = new ArrayList<>(member.getInterests());

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", userInterests)));
        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);
        List<Float> userEmbedding = embeddings.getData().get(0).getEmbedding();

        return events
                .stream()
                .map(event -> new EventSimilarity(event, computeSimilarity(userEmbedding, event.getInterestsEmbedding())))
                .sorted((a, b) -> b.similarity.compareTo(a.similarity))
                .map(event -> event.event)
                .toList();
    }

    public static List<Event> findSkills(Member member) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<String> userSkills = new ArrayList<>(member.getSkills());

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", userSkills)));
        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);
        List<Float> userEmbedding = embeddings.getData().get(0).getEmbedding();

        return events
                .stream()
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

    static Float computeSimilarity(List<Float> a, List<Float> b) {
        double dotProduct = 0f;
        double normASum = 0f;
        double normBSum = 0f;

        for (int i = 0; i < a.size(); i++) {
            dotProduct += a.get(i) * b.get(i);
            normASum += a.get(i) * a.get(i);
            normBSum += b.get(i) * b.get(i);
        }

        double dist = Math.sqrt(normASum) * Math.sqrt(normBSum);
        return (float)(dotProduct / dist);
    }

}
