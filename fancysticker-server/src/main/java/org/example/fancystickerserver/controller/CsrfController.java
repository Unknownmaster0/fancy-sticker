package org.example.fancystickerserver.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/csrf-token")
public class CsrfController {
    @GetMapping
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        // in the security config, we set the CsrfTokenRequestAttributeHandler to save the token in the request
        // attribute with the key CsrfToken.class.getName(). Read the details of the CsrfTokenRequestAttributeHandler in the Spring Security documentation.
        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
    }
}
