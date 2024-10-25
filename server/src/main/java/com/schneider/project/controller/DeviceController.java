package com.schneider.project.controller;

import com.schneider.project.model.Device;
import com.schneider.project.service.DeviceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
@Validated
public class DeviceController {
    @Autowired
    private DeviceService service;

    @GetMapping
    public ResponseEntity<List<Device>> getDevices() {
        List<Device> devices = service.getDevices();

        if (devices.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(devices);
    }

    @GetMapping("/deleted")
    public ResponseEntity<List<Device>> getDeletedDevices() {
        List<Device> devices = service.getDeletedDevices();

        if (devices.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(devices);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> getDevice(@PathVariable Long id) {
        Device device = service.getDevice(id);
        return ResponseEntity.ok(device);
    }

    @PostMapping
    public ResponseEntity<Device> addDevice(@Valid @RequestBody Device device) {
        Device createdDevice = service.addDevice(device);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDevice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @Valid @RequestBody Device device) {
        Device updatedDevice = service.updateDevice(id, device);
        return ResponseEntity.ok(updatedDevice);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Device> deleteDevice(@PathVariable Long id) {
        service.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Device> restoreDevice(@PathVariable Long id) {
        service.restoreDevice(id);
        return ResponseEntity.noContent().build();
    }
}
