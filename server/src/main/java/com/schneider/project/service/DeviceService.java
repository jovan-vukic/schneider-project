package com.schneider.project.service;

import com.schneider.project.exception.DeviceNotFoundException;
import com.schneider.project.exception.InvalidDeviceException;
import com.schneider.project.model.*;
import com.schneider.project.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {
    @Autowired
    private DeviceRepository repository;

    /* Get all devices */
    public List<Device> getDevices() {
        return repository.findAll().stream().filter(device -> device.getIsArchived().equals("0")).toList();
    }

    /* Get deleted devices */
    public List<Device> getDeletedDevices() {
        return repository.findAll().stream().filter(device -> device.getIsArchived().equals("1")).toList();
    }

    /* Get device by id */
    public Device getDevice(Long id) {
        if (id == null)
            throw new InvalidDeviceException("Device ID cannot be null.");

        Device device = repository.findById(id)
                .orElseThrow(() -> new DeviceNotFoundException(id));

        if (device.getIsArchived().equals("1"))
            throw new InvalidDeviceException("Device is already deleted (isArchived = 1).");
        return device;
    }

    /* Add new device */
    public Device addDevice(Device device) {
        if (device == null)
            throw new InvalidDeviceException("Device cannot be null.");

        if (repository.findByDerId(device.getDerId()) != null)
            throw new InvalidDeviceException("Device with derId " + device.getDerId() + " already exists.");

        return repository.save(device);
    }

    /* Update device */
    public Device updateDevice(Long id, Device device) {
        if (id == null || device == null)
            throw new InvalidDeviceException("Device ID or device cannot be null.");

        if (!id.equals(device.getId()))
            throw new InvalidDeviceException("Device ID and parameter ID do not match.");

        Device existingDevice = repository.findById(id)
                .orElseThrow(() -> new DeviceNotFoundException(id));

        if (!device.getId().equals(existingDevice.getId()))
            throw new InvalidDeviceException("Device ID cannot be changed.");

        if (!device.getType().equals(existingDevice.getType()))
            throw new InvalidDeviceException("Device type cannot be changed.");

        if (!device.getDerId().equals(existingDevice.getDerId()))
            throw new InvalidDeviceException("Device derId cannot be changed.");

        device.setCreatedAt(existingDevice.getCreatedAt());
        return repository.save(device);
    }

    /* Delete device */
    public void deleteDevice(Long id) {
        if (id == null)
            throw new InvalidDeviceException("Device ID cannot be null.");

        Device device = repository.findById(id)
                .orElseThrow(() -> new DeviceNotFoundException(id));

        if (device.getIsArchived().equals("1"))
            throw new InvalidDeviceException("Device is already deleted (isArchived = 1).");

        device.setIsArchived("1");
        repository.save(device);
    }

    /* Restore deleted device */
    public void restoreDevice(Long id) {
        if (id == null)
            throw new InvalidDeviceException("Device ID cannot be null.");

        Device device = repository.findById(id)
                .orElseThrow(() -> new DeviceNotFoundException(id));

        if (!device.getIsArchived().equals("1"))
            throw new InvalidDeviceException("Device was not deleted (isArchived = 0).");

        device.setIsArchived("0");
        repository.save(device);
    }
}
