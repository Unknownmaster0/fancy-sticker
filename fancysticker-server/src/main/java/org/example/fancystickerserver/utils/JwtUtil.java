package org.example.fancystickerserver.utils;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.constants.ApplicationConstants;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import io.jsonwebtoken.security.Keys;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final Environment env;

    public String generateJwtToken(Authentication authentication) {
        String secret = env.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        User fetchedUser = (User) authentication.getPrincipal();

        // generate token and return
        return Jwts.builder().issuer("Fancy Sticker").subject("JWT Token")
                .claim("username", fetchedUser.getUsername())
                .issuedAt(new java.util.Date())
                .expiration(new java.util.Date((new java.util.Date().getTime() + 60 * 60 * 1000)))
                .signWith(secretKey)
                .compact();
    }
}
