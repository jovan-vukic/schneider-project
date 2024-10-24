package com.schneider.project.service;

import com.schneider.project.DTOs.SignUpDTO;
import com.schneider.project.exception.InvalidJwtException;
import com.schneider.project.model.User;
import com.schneider.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        var user = userRepository.findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException("User " + username + " not found");
        }
        return user;
    }

    public UserDetails signUp(SignUpDTO data) {
        if (userRepository.findByLogin(data.login()) != null)
            throw new InvalidJwtException("Username " + data.login() + " already exists.");

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, data.role());
        return userRepository.save(newUser);
    }
}
