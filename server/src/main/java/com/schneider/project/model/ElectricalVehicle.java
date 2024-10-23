package com.schneider.project.model;

import com.schneider.project.model.enums.DeviceCategory;
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
public class ElectricalVehicle extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private final DeviceCategory category = DeviceCategory.CONSUMER;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Motor power must be greater than or equal to 0")
    @Max(value = 125, message = "Motor power must be less than or equal to 125")
    private Double motorPower;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Battery capacity must be greater than or equal to 0")
    @Max(value = 33, message = "Battery capacity must be less than or equal to 33")
    private Double battery;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Maximum available power must be greater than or equal to 0")
    @Max(value = 125, message = "Maximum available power must be less than or equal to 125")
    private Double maximumAvailablePower;
}
