package com.schneider.project.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = PhotovoltaicPanel.class, name = "PHOTOVOLTAIC_PANEL"),
        @JsonSubTypes.Type(value = WindTurbine.class, name = "WIND_TURBINE"),
        @JsonSubTypes.Type(value = Battery.class, name = "BATTERY"),
        @JsonSubTypes.Type(value = ElectricalVehicle.class, name = "ELECTRICAL_VEHICLE"),
        @JsonSubTypes.Type(value = ElectricalGrid.class, name = "ELECTRICAL_GRID"),
        @JsonSubTypes.Type(value = Building.class, name = "BUILDING"),
        @JsonSubTypes.Type(value = ResidualElectricalLoads.class, name = "RESIDUAL_ELECTRICAL_LOADS"),
})
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public abstract class Device {
    public enum DeviceType {
        PHOTOVOLTAIC_PANEL,
        WIND_TURBINE,
        BATTERY,
        ELECTRICAL_VEHICLE,
        ELECTRICAL_GRID,
        BUILDING,
        RESIDUAL_ELECTRICAL_LOADS
    }

    public enum Category {
        PRODUCER,
        CONSUMER,
        MIXED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Valid
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, message = "Name must be at least 3 characters long")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private DeviceType type;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "DerId cannot be blank")
    private String derId;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}