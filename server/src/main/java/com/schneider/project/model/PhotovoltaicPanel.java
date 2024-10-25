package com.schneider.project.model;

import com.schneider.project.model.enums.DeviceCategory;
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
public class PhotovoltaicPanel extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceCategory category;

    @PrePersist
    private void prePersist() {
        this.category = DeviceCategory.PRODUCER;
    }

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Output power must be greater than or equal to 0")
    @Max(value = 300, message = "Output power must be less than or equal to 300")
    private Double outputPower;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Voltage must be greater than or equal to 0")
    @Max(value = 30, message = "Voltage must be less than or equal to 30")
    private Double voltage;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Current must be greater than or equal to 0")
    @Max(value = 10, message = "Current must be less than or equal to 10")
    private Double current;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Open circuit voltage must be greater than or equal to 0")
    @Max(value = 40, message = "Open circuit voltage must be less than or equal to 40")
    private Double openCircuitVoltage;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Short circuit voltage must be greater than or equal to 0")
    @Max(value = 10, message = "Short circuit voltage must be less than or equal to 10")
    private Double shortCircuitCurrent;

    @Column(nullable = false)
    @NotNull
    @Min(value = -3, message = "Power tolerance must be greater than or equal to -3")
    @Max(value = 3, message = "Power tolerance must be less than or equal to 3")
    private Double powerTolerance;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Maximum available power must be greater than or equal to 0")
    @Max(value = 250, message = "Maximum available power must be less than or equal to 250")
    private Double maximumAvailablePower;
}
