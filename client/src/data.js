import PhotovoltaicPanelIcon from "./components/icons/devices/PhotovoltaicPanelIcon";
import WindTurbineIcon from "./components/icons/devices/WindTurbineIcon";
import BatteryIcon from "./components/icons/devices/BatteryIcon";
import ElectricalVehicleIcon from "./components/icons/devices/ElectricalVehicleIcon";
import ElectricalGridIcon from "./components/icons/devices/ElectricalGridIcon";
import BuildingIcon from "./components/icons/devices/BuildingIcon";
import ResidualLoadsIcon from "./components/icons/devices/ResidualLoadsIcon";

/* Define device types */
const TYPE_PHOTOVOLTAIC_PANEL = {
  id: 1,
  name: "Photovoltaic Panel",
  color: "blue.300",
};
const TYPE_WIND_TURBINE = { id: 2, name: "Wind Turbine", color: "green.300" };
const TYPE_BATTERY = { id: 3, name: "Battery", color: "red.400" };
const TYPE_ELECTRICAL_VEHICLE = {
  id: 4,
  name: "Electrical Vehicle",
  color: "gray.300",
};
const TYPE_ELECTRICAL_GRID = {
  id: 5,
  name: "Electrical Grid",
  color: "teal.300",
};
const TYPE_BUILDING = { id: 6, name: "Building", color: "purple.300" };
const TYPE_RESIDUAL_ELECTRICAL_LOADS = {
  id: 7,
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

/* Define device categories */
const CATEGORY_PRODUCER = { id: 1, name: "Producer" };
const CATEGORY_CONSUMER = { id: 2, name: "Consumer" };
const CATEGORY_MIXED = { id: 3, name: "Mixed" };
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

/* Define devices */
const DATA = [
  {
    derId: "123456",
    icon: TYPE_ICONS[TYPE_PHOTOVOLTAIC_PANEL.id],
    name: "Device 1",
    type: TYPE_PHOTOVOLTAIC_PANEL,
    category: CATEGORY_PRODUCER,
    maxAvailablePower: "10.4",
  },
  {
    derId: "123457",
    icon: TYPE_ICONS[TYPE_ELECTRICAL_VEHICLE.id],
    name: "Device 2",
    type: TYPE_ELECTRICAL_VEHICLE,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "15.2",
  },
  {
    derId: "123458",
    icon: TYPE_ICONS[TYPE_BATTERY.id],
    name: "Device 3",
    type: TYPE_BATTERY,
    category: CATEGORY_MIXED,
    maxAvailablePower: "5.0",
  },
  {
    derId: "123459",
    icon: TYPE_ICONS[TYPE_ELECTRICAL_GRID.id],
    name: "Device 4",
    type: TYPE_ELECTRICAL_GRID,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "100",
  },
  {
    derId: "123460",
    icon: TYPE_ICONS[TYPE_BUILDING.id],
    name: "Device 5",
    type: TYPE_BUILDING,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "30.0",
  },
  {
    derId: "123461",
    icon: TYPE_ICONS[TYPE_RESIDUAL_ELECTRICAL_LOADS.id],
    name: "Device 6",
    type: TYPE_RESIDUAL_ELECTRICAL_LOADS,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "8.0",
  },
  {
    derId: "123462",
    icon: TYPE_ICONS[TYPE_PHOTOVOLTAIC_PANEL.id],
    name: "Device 7",
    type: TYPE_PHOTOVOLTAIC_PANEL,
    category: CATEGORY_PRODUCER,
    maxAvailablePower: "12.5",
  },
  {
    derId: "123463",
    icon: TYPE_ICONS[TYPE_WIND_TURBINE.id],
    name: "Device 8",
    type: TYPE_WIND_TURBINE,
    category: CATEGORY_PRODUCER,
    maxAvailablePower: "20.0",
  },
  {
    derId: "123464",
    icon: TYPE_ICONS[TYPE_BATTERY.id],
    name: "Device 9",
    type: TYPE_BATTERY,
    category: CATEGORY_MIXED,
    maxAvailablePower: "7.5",
  },
  {
    derId: "123465",
    icon: TYPE_ICONS[TYPE_ELECTRICAL_GRID.id],
    name: "Device 10",
    type: TYPE_ELECTRICAL_GRID,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "200",
  },
  {
    derId: "123466",
    icon: TYPE_ICONS[TYPE_BUILDING.id],
    name: "Device 11",
    type: TYPE_BUILDING,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "50.0",
  },
  {
    derId: "123467",
    icon: TYPE_ICONS[TYPE_RESIDUAL_ELECTRICAL_LOADS.id],
    name: "Device 12",
    type: TYPE_RESIDUAL_ELECTRICAL_LOADS,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "10.0",
  },
  {
    derId: "123468",
    icon: TYPE_ICONS[TYPE_PHOTOVOLTAIC_PANEL.id],
    name: "Device 13",
    type: TYPE_PHOTOVOLTAIC_PANEL,
    category: CATEGORY_PRODUCER,
    maxAvailablePower: "11.0",
  },
  {
    derId: "123469",
    icon: TYPE_ICONS[TYPE_WIND_TURBINE.id],
    name: "Device 14",
    type: TYPE_WIND_TURBINE,
    category: CATEGORY_PRODUCER,
    maxAvailablePower: "22.0",
  },
  {
    derId: "123470",
    icon: TYPE_ICONS[TYPE_BATTERY.id],
    name: "Device 15",
    type: TYPE_BATTERY,
    category: CATEGORY_MIXED,
    maxAvailablePower: "6.0",
  },
  {
    derId: "123471",
    icon: TYPE_ICONS[TYPE_ELECTRICAL_GRID.id],
    name: "Device 16",
    type: TYPE_ELECTRICAL_GRID,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "150",
  },
  {
    derId: "123472",
    icon: TYPE_ICONS[TYPE_BUILDING.id],
    name: "Device 17",
    type: TYPE_BUILDING,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "40.0",
  },
  {
    derId: "123473",
    icon: TYPE_ICONS[TYPE_RESIDUAL_ELECTRICAL_LOADS.id],
    name: "Device 18",
    type: TYPE_RESIDUAL_ELECTRICAL_LOADS,
    category: CATEGORY_CONSUMER,
    maxAvailablePower: "9.5",
  },
  {
    derId: "123474",
    icon: TYPE_ICONS[TYPE_PHOTOVOLTAIC_PANEL.id],
    name: "Device 19",
    type: TYPE_PHOTOVOLTAIC_PANEL,
    category: CATEGORY_PRODUCER,
    maxAvailablePower: "13.3",
  },
  {
    derId: "123475",
    icon: TYPE_ICONS[TYPE_WIND_TURBINE.id],
    name: "Device 20",
    type: TYPE_WIND_TURBINE,
    category: CATEGORY_PRODUCER,
    maxAvailablePower: "18.5",
  },
];

export default DATA;
