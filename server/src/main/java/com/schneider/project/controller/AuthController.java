package com.schneider.project.controller;

import com.schneider.project.DTOs.JwtDTO;
import com.schneider.project.DTOs.SignInDTO;
import com.schneider.project.DTOs.SignUpDTO;
import com.schneider.project.config.auth.TokenProvider;
import com.schneider.project.model.User;
import com.schneider.project.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService service;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDTO data) {
        service.signUp(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody @Valid SignInDTO data) {
        var usernamePasswordToken = new UsernamePasswordAuthenticationToken(
                data.login(),
                data.password()
        );
        var user = authenticationManager.authenticate(usernamePasswordToken);
        var accessToken = tokenProvider.createAccessToken(((User) user.getPrincipal()).getUsername());
        return ResponseEntity.ok(new JwtDTO(accessToken));
    }
}
