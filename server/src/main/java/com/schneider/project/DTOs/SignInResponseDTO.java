package com.schneider.project.DTOs;

import com.schneider.project.model.User;

public record SignInResponseDTO(
        String accessToken,
        User user) {
}
