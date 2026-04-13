package org.example.fancystickerserver.constants;


public class ApplicationConstants {

    public ApplicationConstants() {
        throw new AssertionError("Cannot instantiate this class");
    }

    public static final String JWT_SECRET_KEY = "jwtSecretKey";
    public static final String JWT_SECRET_DEFAULT_VALUE = "fancyStickerSecretKeyForJWT!@#$%";
    public static final String JWT_HEADER = "Authorization";

    public static final String ORDER_STATUS_CONFIRMED = "CONFIRMED";
    public static final String ORDER_STATUS_CREATED = "CREATED";
    public static final String ORDER_STATUS_CANCELLED = "CANCELLED";

    public static final String MESSAGE_STATUS_OPEN = "OPEN";
    public static final String MESSAGE_STATUS_CLOSED = "CLOSED";
}
