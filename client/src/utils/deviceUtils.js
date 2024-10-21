import {
  TYPE_BATTERY,
  TYPE_BUILDING,
  TYPE_ELECTRICAL_GRID,
  TYPE_ELECTRICAL_VEHICLE,
  TYPE_PHOTOVOLTAIC_PANEL,
  TYPE_RESIDUAL_ELECTRICAL_LOADS,
  TYPE_WIND_TURBINE,
} from "../utils/constants";

/* Generate a unique ID for a new device */
export const generateDerId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const derId = `${timestamp}-${random}`;
  return derId;
};

/* Validation rules for different device types */
export const validationSchemas = {
  [TYPE_PHOTOVOLTAIC_PANEL.id]: (data) => {
    console.log("VAIDATION --- TYPE_PHOTOVOLTAIC_PANEL", data);

    const errors = {};

    if (!data.outputPower || data.outputPower < 0 || data.outputPower > 300) {
      errors.outputPower = "Output power must be between 0 and 300";
    }

    if (!data.voltage || data.voltage < 0 || data.voltage > 30) {
      errors.voltage = "Voltage must be between 0 and 30";
    }

    if (!data.current || data.current < 0 || data.current > 10) {
      errors.current = "Current must be between 0 and 10";
    }

    if (
      !data.openCircuitVoltage ||
      data.openCircuitVoltage < 0 ||
      data.openCircuitVoltage > 40
    ) {
      errors.openCircuitVoltage =
        "Open circuit voltage must be between 0 and 40";
    }

    if (
      !data.shortCircuitCurrent ||
      data.shortCircuitCurrent < 0 ||
      data.shortCircuitCurrent > 10
    ) {
      errors.shortCircuitCurrent =
        "Short circuit current must be between 0 and 10";
    }

    if (
      !data.powerTolerance ||
      data.powerTolerance < -3 ||
      data.powerTolerance > 3
    ) {
      errors.powerTolerance = "Power tolerance must be between -3 and 3";
    }

    if (
      !data.maximumAvailablePower ||
      data.maximumAvailablePower < 0 ||
      data.maximumAvailablePower > 250
    ) {
      errors.maximumAvailablePower =
        "Maximum available power must be between 0 and 250";
    }

    return errors;
  },
  [TYPE_BATTERY.id]: (data) => {
    const errors = {};

    if (!data.capacity || data.capacity < 0 || data.capacity > 10) {
      errors.capacity = "Capacity must be between 0 and 10";
    }

    if (
      !data.minStateOfCharge ||
      data.minStateOfCharge < 0 ||
      data.minStateOfCharge > 20
    ) {
      errors.minStateOfCharge =
        "Minimum state of charge must be between 0 and 20";
    }

    if (
      !data.maxStateOfCharge ||
      data.maxStateOfCharge < 90 ||
      data.maxStateOfCharge > 100
    ) {
      errors.maxStateOfCharge =
        "Maximum state of charge must be between 90 and 100";
    }

    if (
      !data.maximumAvailablePower ||
      data.maximumAvailablePower < 0 ||
      data.maximumAvailablePower > 10
    ) {
      errors.maximumAvailablePower =
        "Maximum available power must be between 0 and 10";
    }

    return errors;
  },
  [TYPE_BUILDING.id]: (data) => {
    const errors = {};

    if (
      !data.maximumAvailablePower ||
      data.maximumAvailablePower < 0 ||
      data.maximumAvailablePower > 700
    ) {
      errors.maximumAvailablePower =
        "Maximum available power must be between 0 and 700";
    }

    return errors;
  },
  [TYPE_ELECTRICAL_GRID.id]: (data) => {
    const errors = {};

    if (
      !data.co2EmissionRate ||
      data.co2EmissionRate < 0 ||
      data.co2EmissionRate > 100
    ) {
      errors.co2EmissionRate = "CO2 emission rate must be between 0 and 100";
    }

    if (
      !data.maximumAvailablePower ||
      data.maximumAvailablePower < 0 ||
      data.maximumAvailablePower > 3000
    ) {
      errors.maximumAvailablePower =
        "Maximum available power must be between 0 and 3000";
    }

    return errors;
  },
  [TYPE_ELECTRICAL_VEHICLE.id]: (data) => {
    const errors = {};

    if (!data.motorPower || data.motorPower < 0 || data.motorPower > 125) {
      errors.motorPower = "Motor power must be between 0 and 125";
    }

    if (!data.battery || data.battery < 0 || data.battery > 33) {
      errors.battery = "Battery capacity must be between 0 and 33";
    }

    if (
      !data.maximumAvailablePower ||
      data.maximumAvailablePower < 0 ||
      data.maximumAvailablePower > 125
    ) {
      errors.maximumAvailablePower =
        "Maximum available power must be between 0 and 125";
    }

    return errors;
  },
  [TYPE_RESIDUAL_ELECTRICAL_LOADS.id]: (data) => {
    const errors = {};

    if (
      !data.maximumAvailablePower ||
      data.maximumAvailablePower < 0 ||
      data.maximumAvailablePower > 30
    ) {
      errors.maximumAvailablePower =
        "Maximum available power must be between 0 and 30";
    }

    return errors;
  },
  [TYPE_WIND_TURBINE.id]: (data) => {
    const errors = {};

    if (
      !data.cutInWindSpeed ||
      data.cutInWindSpeed < 1 ||
      data.cutInWindSpeed > 3
    ) {
      errors.cutInWindSpeed = "Cut in wind speed must be between 1 and 3";
    }

    if (!data.outputVoltages || !["12", "48"].includes(data.outputVoltages)) {
      errors.outputVoltages = "Output voltages must be either 12 or 48";
    }

    if (
      !data.powerRatings ||
      data.powerRatings < 0 ||
      data.powerRatings > 850
    ) {
      errors.powerRatings = "Power ratings must be between 0 and 850";
    }

    if (
      !data.currentRatings ||
      data.currentRatings < 0 ||
      data.currentRatings > 30
    ) {
      errors.currentRatings = "Current ratings must be between 0 and 30";
    }

    if (
      !data.maximumAvailablePower ||
      data.maximumAvailablePower < 0 ||
      data.maximumAvailablePower > 30
    ) {
      errors.maximumAvailablePower =
        "Maximum available power must be between 0 and 30";
    }

    return errors;
  },
};

/* General validation for Device common fields */
export const validateCommonFields = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  if (!data.type) {
    console.log("data.type", data.type);
    console.log("data.type.id", data.type.id);
    errors.type = "Type is required. Now " + data.type + " is not valid";
  }

  if (!data.derId || data.derId.trim() === "") {
    errors.derId = "DerId cannot be blank";
  }

  return errors;
};
