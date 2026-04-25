package org.example.fancystickerserver.repository;

import org.example.fancystickerserver.entity.Role;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    
    @Cacheable("roles") // by name this cache is find is "roles"
    Optional<Role> findByName (String name);
}
