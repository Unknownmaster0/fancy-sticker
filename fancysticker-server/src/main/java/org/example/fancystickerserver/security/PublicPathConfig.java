package org.example.fancystickerserver.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PublicPathConfig {
    @Bean
    public List<String> publicPaths() {
        return List.of("/api/v1/auth/**",
                "/api/v1/products/**",
                "/api/v1/contacts/**",
                "/error" // this is needed to allow Spring Security to handle errors properly without causing infinite loops
        );
    }
}
