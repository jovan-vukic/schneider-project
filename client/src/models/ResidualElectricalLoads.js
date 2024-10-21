import { Device } from "./Device";

export class ResidualElectricalLoads extends Device {
  constructor({
    id,
    derId,
    icon,
    name,
    type,
    category,
    maximumAvailablePower,
  }) {
    super({ id, derId, icon, name, type, category, maximumAvailablePower });
  }
}
