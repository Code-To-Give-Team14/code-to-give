package com.morganstanley.code_to_give.infra.swagger;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
            .servers(Collections.singletonList(new Server().url("/")))
            .info(new Info().title("code-to-give-api"))
            .externalDocs(new ExternalDocumentation().description("code-to-give-api"));
    }
}

