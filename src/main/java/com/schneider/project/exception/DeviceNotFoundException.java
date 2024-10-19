package com.schneider.project.exception;

public class DeviceNotFoundException extends RuntimeException {
    public DeviceNotFoundException(Long id) {
        super("Could not find device with ID = " + id);
    }
}
