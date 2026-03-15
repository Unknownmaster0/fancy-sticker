package org.example.fancystickerserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
//import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = {"org.example.fancystickerserver.controller"})
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class FancystickerServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FancystickerServerApplication.class, args);
    }

}
