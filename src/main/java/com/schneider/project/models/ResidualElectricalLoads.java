package com.schneider.project.models;

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
public class ResidualElectricalLoads extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private final Category category = Category.CONSUMER;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Maximum available power must be greater than or equal to 0")
    @Max(value = 30, message = "Maximum available power must be less than or equal to 30")
    private Double maximumAvailablePower;
}
