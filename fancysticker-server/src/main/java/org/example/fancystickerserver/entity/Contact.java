package org.example.fancystickerserver.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
//import org.hibernate.annotations.ColumnDefault;

//import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "contacts")
public class Contact extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "contact_id", nullable = false, columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "mobile_number", nullable = false, length = 15)
    private String mobileNumber;

    @Column(name = "message", nullable = false, length = 500)
    private String message;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

//    @ColumnDefault("CURRENT_TIMESTAMP")
//    @Column(name = "created_at", nullable = false)
//    private Instant createdAt;
//
//    @Column(name = "created_by", nullable = false, length = 20)
//    private String createdBy;
//
//    @Column(name = "updated_at")
//    private Instant updatedAt;
//
//    @Column(name = "updated_by", length = 20)
//    private String updatedBy;


}