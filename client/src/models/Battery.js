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

    this.capacity = parseFloat(capacity) || undefined;
    this.minStateOfCharge = parseFloat(minStateOfCharge) || undefined;
    this.maxStateOfCharge = parseFloat(maxStateOfCharge) || undefined;
  }
}
