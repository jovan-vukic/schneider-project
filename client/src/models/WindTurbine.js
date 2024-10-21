import { Device } from "./Device";

export class WindTurbine extends Device {
  constructor({
    id,
    derId,
    icon,
    name,
    type,
    category,
    maximumAvailablePower,
    cutInWindSpeed,
    outputVoltages,
    powerRatings,
    currentRatings,
  }) {
    super({ id, derId, icon, name, type, category, maximumAvailablePower });

    this.cutInWindSpeed = parseFloat(cutInWindSpeed) || undefined;
    this.outputVoltages = outputVoltages || "";
    this.powerRatings = parseFloat(powerRatings) || undefined;
    this.currentRatings = parseFloat(currentRatings) || undefined;
  }
}
