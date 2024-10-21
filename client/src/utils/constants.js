import PhotovoltaicPanelIcon from "../components/icons/devices/PhotovoltaicPanelIcon";
import WindTurbineIcon from "../components/icons/devices/WindTurbineIcon";
import BatteryIcon from "../components/icons/devices/BatteryIcon";
import ElectricalVehicleIcon from "../components/icons/devices/ElectricalVehicleIcon";
import ElectricalGridIcon from "../components/icons/devices/ElectricalGridIcon";
import BuildingIcon from "../components/icons/devices/BuildingIcon";
import ResidualLoadsIcon from "../components/icons/devices/ResidualLoadsIcon";

/* Define device types */
export const TYPE_PHOTOVOLTAIC_PANEL = {
  id: 0,
  name: "Photovoltaic Panel",
  color: "blue.300",
};

export const TYPE_WIND_TURBINE = {
  id: 1,
  name: "Wind Turbine",
  color: "green.300",
};

export const TYPE_BATTERY = {
  id: 2,
  name: "Battery",
  color: "red.400",
};

export const TYPE_ELECTRICAL_VEHICLE = {
  id: 3,
  name: "Electrical Vehicle",
  color: "gray.300",
};

export const TYPE_ELECTRICAL_GRID = {
  id: 4,
  name: "Electrical Grid",
  color: "teal.300",
};

export const TYPE_BUILDING = {
  id: 5,
  name: "Building",
  color: "purple.300",
};

export const TYPE_RESIDUAL_ELECTRICAL_LOADS = {
  id: 6,
  name: "Residual Electrical Loads",
  color: "yellow.300",
};

export const TYPES = [
  TYPE_PHOTOVOLTAIC_PANEL,
  TYPE_WIND_TURBINE,
  TYPE_BATTERY,
  TYPE_ELECTRICAL_VEHICLE,
  TYPE_ELECTRICAL_GRID,
  TYPE_BUILDING,
  TYPE_RESIDUAL_ELECTRICAL_LOADS,
];

export const STRING_TYPE_MAP = {
  ["PHOTOVOLTAIC_PANEL"]: TYPE_PHOTOVOLTAIC_PANEL,
  ["WIND_TURBINE"]: TYPE_WIND_TURBINE,
  ["BATTERY"]: TYPE_BATTERY,
  ["ELECTRICAL_VEHICLE"]: TYPE_ELECTRICAL_VEHICLE,
  ["ELECTRICAL_GRID"]: TYPE_ELECTRICAL_GRID,
  ["BUILDING"]: TYPE_BUILDING,
  ["RESIDUAL_ELECTRICAL_LOADS"]: TYPE_RESIDUAL_ELECTRICAL_LOADS,
};

export const TYPE_STRING_MAP = {
  [TYPE_PHOTOVOLTAIC_PANEL.id]: "PHOTOVOLTAIC_PANEL",
  [TYPE_WIND_TURBINE.id]: "WIND_TURBINE",
  [TYPE_BATTERY.id]: "BATTERY",
  [TYPE_ELECTRICAL_VEHICLE.id]: "ELECTRICAL_VEHICLE",
  [TYPE_ELECTRICAL_GRID.id]: "ELECTRICAL_GRID",
  [TYPE_BUILDING.id]: "BUILDING",
  [TYPE_RESIDUAL_ELECTRICAL_LOADS.id]: "RESIDUAL_ELECTRICAL_LOADS",
};

/* Define device categories */
const CATEGORY_PRODUCER = { id: 0, name: "Producer" };
const CATEGORY_CONSUMER = { id: 1, name: "Consumer" };
const CATEGORY_MIXED = { id: 2, name: "Mixed" };

export const CATEGORIES = [
  CATEGORY_PRODUCER,
  CATEGORY_CONSUMER,
  CATEGORY_MIXED,
];

export const TYPE_CATEGORY_MAP = {
  [TYPE_PHOTOVOLTAIC_PANEL.id]: CATEGORY_PRODUCER,
  [TYPE_WIND_TURBINE.id]: CATEGORY_PRODUCER,
  [TYPE_BATTERY.id]: CATEGORY_MIXED,
  [TYPE_ELECTRICAL_VEHICLE.id]: CATEGORY_CONSUMER,
  [TYPE_ELECTRICAL_GRID.id]: CATEGORY_PRODUCER,
  [TYPE_BUILDING.id]: CATEGORY_CONSUMER,
  [TYPE_RESIDUAL_ELECTRICAL_LOADS.id]: CATEGORY_CONSUMER,
};

export const STRING_CATEGORY_MAP = {
  ["PRODUCER"]: CATEGORY_PRODUCER,
  ["CONSUMER"]: CATEGORY_CONSUMER,
  ["MIXED"]: CATEGORY_MIXED,
};

export const CATEGORY_STRING_MAP = {
  [CATEGORY_PRODUCER.id]: "PRODUCER",
  [CATEGORY_CONSUMER.id]: "CONSUMER",
  [CATEGORY_MIXED.id]: "MIXED",
};

/* Define type icons */
export const TYPE_ICONS = {
  [TYPE_PHOTOVOLTAIC_PANEL.id]: PhotovoltaicPanelIcon,
  [TYPE_WIND_TURBINE.id]: WindTurbineIcon,
  [TYPE_BATTERY.id]: BatteryIcon,
  [TYPE_ELECTRICAL_VEHICLE.id]: ElectricalVehicleIcon,
  [TYPE_ELECTRICAL_GRID.id]: ElectricalGridIcon,
  [TYPE_BUILDING.id]: BuildingIcon,
  [TYPE_RESIDUAL_ELECTRICAL_LOADS.id]: ResidualLoadsIcon,
};
