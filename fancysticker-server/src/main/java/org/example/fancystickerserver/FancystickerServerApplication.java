package org.example.fancystickerserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@ComponentScan(basePackages = {"org.example.fancystickerserver.controller"})
public class FancystickerServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FancystickerServerApplication.class, args);
    }

}
