import { Device } from "./Device";

export class PhotovoltaicPanel extends Device {
  constructor({
    id,
    derId,
    icon,
    name,
    type,
    category,
    maximumAvailablePower,
    outputPower,
    voltage,
    current,
    openCircuitVoltage,
    shortCircuitCurrent,
    powerTolerance,
  }) {
    super({ id, derId, icon, name, type, category, maximumAvailablePower });

    this.outputPower = parseFloat(outputPower) || undefined;
    this.voltage = parseFloat(voltage) || undefined;
    this.current = parseFloat(current) || undefined;
    this.openCircuitVoltage = parseFloat(openCircuitVoltage) || undefined;
    this.shortCircuitCurrent = parseFloat(shortCircuitCurrent) || undefined;
    this.powerTolerance = parseFloat(powerTolerance) || undefined;
  }
}
