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
  }) {
    this.id = id;
    this.derId = derId;
    this.icon = icon;
    this.name = name;
    this.type = type;
    this.category = category;
    this.maximumAvailablePower = parseFloat(maximumAvailablePower);
  }

  /* Convert a JSON object into a Device object */
  static fromJSON({ id, derId, name, type, category, maximumAvailablePower }) {
    return new Device({
      id,
      derId,
      icon: TYPE_ICONS[STRING_TYPE_MAP[type].id],
      name,
      type: STRING_TYPE_MAP[type],
      category: STRING_CATEGORY_MAP[category],
      maximumAvailablePower,
    });
  }

  /* Convert a Device object into a JSON object */
  toJSON() {
    return {
      id: this.id,
      derId: this.derId,
      name: this.name,
      type: TYPE_STRING_MAP[this.type.id],
      category: CATEGORY_STRING_MAP[this.category.id],
      maximumAvailablePower: this.maximumAvailablePower,
    };
  }
}
