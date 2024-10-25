import { Device } from "./Device";

export class ElectricalGrid extends Device {
  constructor({
    id,
    derId,
    icon,
    name,
    type,
    category,
    maximumAvailablePower,
    co2EmissionRate,
    createdAt,
    updatedAt,
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
    });

    this.co2EmissionRate = parseFloat(co2EmissionRate) || undefined;
  }
}
