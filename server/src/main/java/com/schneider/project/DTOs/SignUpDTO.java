package com.schneider.project.DTOs;

import com.schneider.project.model.enums.UserRole;

public record SignUpDTO(
        String login,
        String password,
        UserRole role) {
}
