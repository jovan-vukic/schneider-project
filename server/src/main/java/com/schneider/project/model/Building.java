package com.schneider.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@PrimaryKeyJoinColumn(name = "id")
public class Building extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private final Category category = Category.CONSUMER;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Maximum available power must be greater than or equal to 0")
    @Max(value = 700, message = "Maximum available power must be less than or equal to 700")
    private Double maximumAvailablePower;
}