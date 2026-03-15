package org.example.fancystickerserver.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.dto.ProfileRequestDto;
import org.example.fancystickerserver.dto.ProfileResponseDto;
import org.example.fancystickerserver.entity.Address;
import org.example.fancystickerserver.entity.Customer;
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
        Boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
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
        System.out.println("address = " + address.toString());
        customer.setAddress(address);
        customer = customerRepository.save(customer);
        ProfileResponseDto responseDto = mapCustomerToProfileResponseDto(customer);
        responseDto.setEmailUpdated(isEmailUpdated);
        return responseDto;
    }

    private Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return customerRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        profileResponseDto.setCustomerId(customer.getId());
        profileResponseDto.setName(customer.getName());
        profileResponseDto.setEmail(customer.getEmail());
        profileResponseDto.setMobileNumber(customer.getMobileNumber());

        // Map address fields if address exists
        if (customer.getAddress() != null) {
            Address address = customer.getAddress();
            profileResponseDto.setStreet(address.getStreet());
            profileResponseDto.setCity(address.getCity());
            profileResponseDto.setState(address.getState());
            profileResponseDto.setPostalCode(address.getPostalCode());
            profileResponseDto.setCountry(address.getCountry());
        }

        return profileResponseDto;
    }
}
