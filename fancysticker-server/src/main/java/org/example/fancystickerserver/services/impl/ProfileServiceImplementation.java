package org.example.fancystickerserver.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.dto.AddressDto;
import org.example.fancystickerserver.dto.ProfileRequestDto;
import org.example.fancystickerserver.dto.ProfileResponseDto;
import org.example.fancystickerserver.dto.UserDto;
import org.example.fancystickerserver.entity.Address;
import org.example.fancystickerserver.entity.Customer;
import org.example.fancystickerserver.entity.Role;
import org.example.fancystickerserver.repository.CustomerRepository;
import org.example.fancystickerserver.services.IProfileService;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImplementation implements IProfileService {
    private final CustomerRepository customerRepository;

    @Override
    public ProfileResponseDto getProfile() {
        Customer customer = getAuthenticatedCustomer();
        return mapCustomerToProfileResponseDto(customer);
    }

    @Override
    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        Customer customer = getAuthenticatedCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
        BeanUtils.copyProperties(profileRequestDto, customer);
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }
        address.setState(profileRequestDto.getState());
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        customer.setAddress(address);
        customer = customerRepository.save(customer);
        ProfileResponseDto responseDto = mapCustomerToProfileResponseDto(customer);
        responseDto.setEmailUpdated(isEmailUpdated);
        return responseDto;
    }

    public Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return customerRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        UserDto user = new UserDto();
        BeanUtils.copyProperties(customer, user);
        user.setUserId(customer.getId());

        // Map roles as comma-separated string (consistent with AuthController pattern)
        String roles = customer.getRoles().stream()
                .map(Role::getName)
                .reduce((role1, role2) -> role1 + "," + role2)
                .orElse("");
        user.setRoles(roles);

        // Map address fields if address exists
        if (customer.getAddress() != null) {
            AddressDto addressDto = new AddressDto();
            BeanUtils.copyProperties(customer.getAddress(), addressDto);
            user.setAddressDto(addressDto);
        }

profileResponseDto.setUser(user);
        return profileResponseDto;
    }
}
