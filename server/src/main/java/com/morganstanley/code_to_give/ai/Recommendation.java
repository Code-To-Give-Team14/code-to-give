package com.morganstanley.code_to_give.ai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Recommendation {
    public static Float findInterest(/* User user */) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint("https://openai-lio.openai.azure.com/")
                .credential(new AzureKeyCredential(System.getenv("AZURE_API_KEY")))
                .buildClient();

        List<String> userInterests = new ArrayList<>();
        userInterests.add("Programming");
        userInterests.add("Computer");

        List<String> eventInterests = new ArrayList<>();
        eventInterests.add("Coding");
        eventInterests.add("Hackathon");

        EmbeddingsOptions embeddingsOptions = new EmbeddingsOptions(Arrays.asList(
                String.join(", ", userInterests),
                String.join(", ", eventInterests)
        ));

        Embeddings embeddings = client.getEmbeddings("dev-ada", embeddingsOptions);

        return computeSimilarity(
                embeddings.getData().get(0).getEmbedding(),
                embeddings.getData().get(1).getEmbedding()
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
