import {
  CATEGORY_STRING_MAP,
  STRING_CATEGORY_MAP,
  STRING_TYPE_MAP,
  TYPE_ICONS,
  TYPE_STRING_MAP,
} from "../utils/constants";

export class Device {
  constructor({
    id,
    derId,
    icon,
    name,
    type,
    category,
    maximumAvailablePower,
    createdAt,
    updatedAt,
  }) {
    // Parse Long value
    this.id = parseInt(id) || undefined;
    this.derId = derId;
    this.icon = icon;
    this.name = name;
    this.type = type;
    this.category = category;
    this.maximumAvailablePower = parseFloat(maximumAvailablePower) || undefined;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /* Convert a JSON object into a Device object */
  static async fromJSON(data) {
    const type = data.type;
    data = {
      ...data,
      id: data.id,
      derId: data.derId,
      icon: TYPE_ICONS[STRING_TYPE_MAP[data.type].id],
      name: data.name,
      type: STRING_TYPE_MAP[data.type],
      category: STRING_CATEGORY_MAP[data.category],
      maximumAvailablePower: data.maximumAvailablePower,
    };

    switch (type) {
      case "PHOTOVOLTAIC_PANEL": {
        const { PhotovoltaicPanel } = await import("./PhotovoltaicPanel");
        return new PhotovoltaicPanel(data);
      }
      case "WIND_TURBINE": {
        const { WindTurbine } = await import("./WindTurbine");
        return new WindTurbine(data);
      }
      case "BATTERY": {
        const { Battery } = await import("./Battery");
        return new Battery(data);
      }
      case "ELECTRICAL_VEHICLE": {
        const { ElectricalVehicle } = await import("./ElectricalVehicle");
        return new ElectricalVehicle(data);
      }
      case "ELECTRICAL_GRID": {
        const { ElectricalGrid } = await import("./ElectricalGrid");
        return new ElectricalGrid(data);
      }
      case "BUILDING": {
        const { Building } = await import("./Building");
        return new Building(data);
      }
      case "RESIDUAL_ELECTRICAL_LOADS": {
        const { ResidualElectricalLoads } = await import(
          "./ResidualElectricalLoads"
        );
        return new ResidualElectricalLoads(data);
      }
      default:
        throw new Error(`Unknown device type: ${data.type}`);
    }
  }

  /* Convert a Device object into a JSON object */
  static toJSON(device) {
    return {
      ...device,
      id: device.id || "",
      derId: device.derId,
      icon: null,
      name: device.name,
      type: TYPE_STRING_MAP[device.type.id],
      category: CATEGORY_STRING_MAP[device.category.id],
      maximumAvailablePower: device.maximumAvailablePower,
    };
  }
}
