import { Device } from "./Device";

export class Battery extends Device {
  constructor({
    id,
    derId,
    icon,
    name,
    type,
    category,
    maximumAvailablePower,
    capacity,
    minStateOfCharge,
    maxStateOfCharge,
  }) {
    console.log("Battery CONSTRUCTOR", {
      id,
      derId,
      icon,
      name,
      type,
      category,
      maximumAvailablePower,
    });
    super({ id, derId, icon, name, type, category, maximumAvailablePower });

    this.capacity = parseFloat(capacity) || undefined;
    this.minStateOfCharge = parseFloat(minStateOfCharge) || undefined;
    this.maxStateOfCharge = parseFloat(maxStateOfCharge) || undefined;
  }
}
