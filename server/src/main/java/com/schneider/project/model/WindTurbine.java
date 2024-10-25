package com.schneider.project.model;

import com.schneider.project.model.enums.DeviceCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@PrimaryKeyJoinColumn(name = "id")
public class WindTurbine extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceCategory category;

    @PrePersist
    private void prePersist() {
        this.category = DeviceCategory.CONSUMER;
    }

    @Column(nullable = false)
    @NotNull
    @Min(value = 1, message = "Cut in wind speed must be greater than or equal to 1")
    @Max(value = 3, message = "Cut in wind speed must be less than or equal to 3")
    private Double cutInWindSpeed;

    @Column(nullable = false)
    @NotNull
    @Pattern(regexp = "^(12|48)$", message = "Output voltages must be either 12 or 48")
    private String outputVoltages;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Power ratings must be greater than or equal to 0")
    @Max(value = 850, message = "Power ratings must be less than or equal to 850")
    private Double powerRatings;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Current ratings must be greater than or equal to 0")
    @Max(value = 30, message = "Current ratings must be less than or equal to 30")
    private Double currentRatings;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Maximum available power must be greater than or equal to 0")
    @Max(value = 30, message = "Maximum available power must be less than or equal to 30")
    private Double maximumAvailablePower;
}
