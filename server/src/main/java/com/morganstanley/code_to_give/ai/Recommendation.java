package com.morganstanley.code_to_give.ai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.morganstanley.code_to_give.domain.entity.Member;

import java.util.ArrayList;
import java.util.List;

public class Recommendation {

    public static List<Float> getEmbedding(List<String> texts) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", texts)));
        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);

        return embeddings.getData().get(0).getEmbedding();
    }

    public static Float findInterest(Member member) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<String> userInterests = new ArrayList<>(member.getInterests());

        List<String> eventInterests = new ArrayList<>();
        eventInterests.add("Coding");
        eventInterests.add("Hackathon");
        List<Float> eventEmbedding = getEmbedding(eventInterests);

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(List.of(String.join(", ", userInterests)));

        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);

        return computeSimilarity(
                embeddings.getData().get(0).getEmbedding(),
                eventEmbedding
        );
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
