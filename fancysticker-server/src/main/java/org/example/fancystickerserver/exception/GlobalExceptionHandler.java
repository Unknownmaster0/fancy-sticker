package org.example.fancystickerserver.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.example.fancystickerserver.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDto> handleBadCredentialsException(BadCredentialsException exception, WebRequest webRequest) {
        // Log full error details on server
        log.error("Authentication failed: ", exception);

        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.UNAUTHORIZED,
                "Invalid credentials", LocalDateTime.now());
        return new ResponseEntity<>(errorResponseDto, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGlobalException(Exception exception, WebRequest webRequest) {
        // Log full error details with stack trace on server
        log.error("Unexpected error occurred: ", exception);

        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Something went wrong", LocalDateTime.now());
        return new ResponseEntity<>(errorResponseDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidationException(MethodArgumentNotValidException
                                                                        methodArgumentNotValidException) {
        // Log validation errors for debugging
        log.warn("Validation error: {}", methodArgumentNotValidException.getMessage());

        Map<String, String> exception = new HashMap<>();
        List<FieldError> fieldErrorsList = methodArgumentNotValidException.getBindingResult().getFieldErrors();
        fieldErrorsList.forEach(error -> exception.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(exception);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String,String>> handleConstraintViolationException(
        ConstraintViolationException constraintViolationException
    ){
        // Log constraint violation errors for debugging
        log.warn("Constraint violation: {}", constraintViolationException.getMessage());

        Map<String, String> exception = new HashMap<>();
        Set<ConstraintViolation<?>> constraintViolationsSet = constraintViolationException.getConstraintViolations();
        constraintViolationsSet.forEach(constraintViolation -> exception.put(constraintViolation
                .getPropertyPath().toString(), constraintViolation.getMessage()));

        return ResponseEntity.badRequest().body(exception);
    }

}
