package org.example.fancystickerserver.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.fancystickerserver.dto.LoginRequestDto;
import org.example.fancystickerserver.dto.LoginResponseDto;
import org.example.fancystickerserver.dto.RegisterRequestDto;
import org.example.fancystickerserver.dto.UserDto;
import org.example.fancystickerserver.entity.Customer;
import org.example.fancystickerserver.repository.CustomerRepository;
import org.example.fancystickerserver.utils.JwtUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CustomerRepository customerRepository;
    private final CompromisedPasswordChecker compromisedPasswordChecker;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.username(),
                            loginRequestDto.password())
            );

            UserDto user = new UserDto();
            var loggedInUser = (Customer) authentication.getPrincipal();
            BeanUtils.copyProperties(loggedInUser, user);
            String jwtToken = jwtUtil.generateJwtToken(authentication);
            return ResponseEntity.ok().body(
                    new LoginResponseDto(HttpStatus.OK.getReasonPhrase(),
                            user,
                            jwtToken)
            );
        } catch (BadCredentialsException badCredentialsException) {
            return BuildLoginError(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        } catch (AuthenticationException authenticationException) {
            return BuildLoginError(HttpStatus.UNAUTHORIZED, "Authentication failed");
        } catch (Exception exception) {
            log.error("e: ", exception);
            return BuildLoginError(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurs");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDto registerRequestDto) {

        CompromisedPasswordDecision decision =
                compromisedPasswordChecker.check(registerRequestDto.getPassword());

        if(decision.isCompromised()) {
            return ResponseEntity.badRequest().body(Map.of("password", "Choose a strong password."));
        }

        Optional<Customer> existingCustomer =
                customerRepository.findByEmailOrMobileNumber(registerRequestDto.getEmail(),
                        registerRequestDto.getMobileNumber());

        // either email or mobile number is already in use
        if(existingCustomer.isPresent()) {
            HashMap<String, String> errors = new HashMap<>();
            Customer customer = existingCustomer.get();

            if(customer.getEmail().equalsIgnoreCase(registerRequestDto.getEmail())) {
                errors.put("email", "Email is already in use");
            }

            if(customer.getMobileNumber().equalsIgnoreCase(registerRequestDto.getMobileNumber())) {
                errors.put("mobileNumber", "Mobile number is already in use");
            }

            return ResponseEntity.badRequest().body(errors);
        }

        // happy case scenario
        Customer customer = new Customer();
        BeanUtils.copyProperties(registerRequestDto, customer);
        customer.setPasswordHash(passwordEncoder.encode(registerRequestDto.getPassword()));
        customerRepository.save(customer);

            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    public ResponseEntity<LoginResponseDto> BuildLoginError(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(new LoginResponseDto(
                message, null, null
        ));
    }
}
