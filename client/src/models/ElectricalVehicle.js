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
    createdAt,
    updatedAt,
    isArchived,
  }) {
    super({
      id,
      derId,
      icon,
      name,
      type,
      category,
      maximumAvailablePower,
      createdAt,
      updatedAt,
      isArchived,
    });

    this.motorPower = parseFloat(motorPower) || undefined;
    this.battery = parseFloat(battery) || undefined;
  }
}
