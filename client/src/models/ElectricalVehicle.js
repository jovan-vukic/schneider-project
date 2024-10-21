import { Device } from "./Device";

export class ElectricalVehicle extends Device {
  constructor({
    id,
    derId,
    icon,
    name,
    type,
    category,
    maximumAvailablePower,
    motorPower,
    battery,
  }) {
    super({ id, derId, icon, name, type, category, maximumAvailablePower });

    this.motorPower = parseFloat(motorPower) || undefined;
    this.battery = parseFloat(battery) || undefined;
  }
}
