package org.example.fancystickerserver.entity;

@lombok.Getter
@lombok.Setter@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "roles")
@jakarta.persistence.AttributeOverrides({
@jakarta.persistence.AttributeOverride(name = "createdBy",
column = @jakarta.persistence.Column(nullable = false,
length = 20)),
@jakarta.persistence.AttributeOverride(name = "updatedBy",
column = @jakarta.persistence.Column(length = 20))})
public class Role extends org.example.fancystickerserver.entity.BaseEntity {
@jakarta.persistence.Id
@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
@jakarta.persistence.Column(name = "role_id", nullable = false)
private java.lang.Long id;

@jakarta.validation.constraints.NotNull
@jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.LAZY, optional = false)
@org.hibernate.annotations.OnDelete(action = org.hibernate.annotations.OnDeleteAction.CASCADE)
@jakarta.persistence.JoinColumn(name = "customer_id", nullable = false)
private org.example.fancystickerserver.entity.Customer customer;

@jakarta.validation.constraints.Size(max = 50)
@jakarta.validation.constraints.NotNull
@jakarta.persistence.Column(name = "name", nullable = false, length = 50)
private java.lang.String name;



}