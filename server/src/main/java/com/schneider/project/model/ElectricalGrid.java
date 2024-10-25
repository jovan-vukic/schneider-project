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
public class ElectricalGrid extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceCategory category;

    @PrePersist
    private void prePersist() {
        this.category = DeviceCategory.PRODUCER;
    }

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
