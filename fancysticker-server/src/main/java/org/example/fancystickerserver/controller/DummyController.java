package org.example.fancystickerserver.controller;

import org.example.fancystickerserver.dto.UserDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dummy")
public class DummyController {
    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(RequestEntity<UserDto> userDto) {
        System.out.println(userDto.getBody());
        System.out.println(userDto.getMethod());
        System.out.println(userDto.getUrl());
        System.out.println(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    @PostMapping("/request-headers")
    public String requestHeaders(@RequestHeader HttpHeaders httpHeaders) {
        List<String> location = httpHeaders.get("User-Location");
        System.out.println(location.toString());
        return "Received headers with value : " + httpHeaders.toString();
    }
}

/*

    @GetMapping("/headers")
    public String readHeaders(@RequestHeader HttpHeaders headers) {
        List<String> location= headers.get("User-Location");
        return "Recevied headers with value : " + headers.toString();
    }

    @GetMapping("/search")
    public String searchUser(@Size(min = 5, max = 30) @RequestParam(required = false, defaultValue = "Guest",
            name = "name") String userName) {
        return "Searching for user : " + userName;
    }

    @GetMapping("/multiple-search")
    public String multipleSearch(@RequestParam Map<String,String> params) {
        return "Searching for user : " + params.get("firstName") + " " + params.get("lastName");
    }

    @GetMapping({"/user/{userId}/posts/{postId}", "/user/{userId}"})
    public String getUser(@PathVariable(name = "userId") String id,
            @PathVariable(required = false) String postId) {
        return "Searching for user : " + id + " and post : " + postId;
    }

    @GetMapping({"/user/map/{userId}/posts/{postId}", "/user/map/{userId}"})
    public String getUserUsingMap(@PathVariable Map<String,String> pathVariables) {
        return "Searching for user : " + pathVariables.get("userId") + " and post : "
                + pathVariables.get("postId");
    }


}*/