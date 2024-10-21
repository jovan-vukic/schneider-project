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
  }) {
    super({ id, derId, icon, name, type, category, maximumAvailablePower });

    this.co2EmissionRate = parseFloat(co2EmissionRate) || undefined;
  }
}
