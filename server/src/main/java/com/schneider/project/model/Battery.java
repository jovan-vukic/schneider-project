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
public class Battery extends Device {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceCategory category;

    @PrePersist
    private void prePersist() {
        this.category = DeviceCategory.MIXED;
    }

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Capacity must be greater than or equal to 0")
    @Max(value = 10, message = "Capacity must be less than or equal to 10")
    private Double capacity;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Minimum state of charge must be greater than or equal to 0")
    @Max(value = 20, message = "Minimum state of charge must be less than or equal to 20")
    private Double minStateOfCharge;

    @Column(nullable = false)
    @NotNull
    @Min(value = 90, message = "Maximum state of charge must be greater than or equal to 90")
    @Max(value = 100, message = "Maximum state of charge must be less than or equal to 100")
    private Double maxStateOfCharge;

    @Column(nullable = false)
    @NotNull
    @Min(value = 0, message = "Maximum available power must be greater than or equal to 0")
    @Max(value = 10, message = "Maximum available power must be less than or equal to 10")
    private Double maximumAvailablePower;
}
