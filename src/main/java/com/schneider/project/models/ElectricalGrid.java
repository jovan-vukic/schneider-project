package com.schneider.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@PrimaryKeyJoinColumn(name = "id")
public class ElectricalGrid extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private final Category category = Category.PRODUCER;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Co2 emission rate must be greater than or equal to 0")
    @Max(value = 100, message = "Co2 emission rate must be less than or equal to 100")
    private Double co2EmissionRate;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Maximum available power must be greater than or equal to 0")
    @Max(value = 3000, message = "Maximum available power must be less than or equal to 3000")
    private Double maximumAvailablePower;
}
