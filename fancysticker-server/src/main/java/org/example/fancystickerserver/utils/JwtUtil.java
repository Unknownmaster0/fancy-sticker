package org.example.fancystickerserver.utils;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.constants.ApplicationConstants;
import org.example.fancystickerserver.entity.Customer;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final Environment env;

    public String generateJwtToken(Authentication authentication) {
        String secret = env.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Customer fetchedCustomer = (Customer) authentication.getPrincipal();

        // generate token and return
        // FOR TESTING: Token expires in 1 minute
        // TO REVERT TO 24 HOURS: Change the line below to: long expirationTime = 24 * 60 * 60 * 1000;
        // long expirationTime = 60 * 1000; // 1 minute (for testing)
        long expirationTime = 24 * 60 * 60 * 1000; // 24 hours (for production)
        return Jwts.builder().issuer("Fancy Sticker").subject("JWT Token")
                .claim("username", fetchedCustomer.getName())
                .claim("email", fetchedCustomer.getEmail())
                .claim("mobileNumber", fetchedCustomer.getMobileNumber())
                .claim("roles",
                        authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
                .issuedAt(new java.util.Date())
                .expiration(new java.util.Date((new java.util.Date().getTime() + expirationTime)))
                .signWith(secretKey)
                .compact();
    }
}
