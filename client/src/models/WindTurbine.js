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

    this.cutInWindSpeed = parseFloat(cutInWindSpeed) || undefined;
    this.outputVoltages = outputVoltages || "";
    this.powerRatings = parseFloat(powerRatings) || undefined;
    this.currentRatings = parseFloat(currentRatings) || undefined;
  }
}
