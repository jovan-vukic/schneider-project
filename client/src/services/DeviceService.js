import { Device } from "../models/Device";
import api from "../utils/api";

/* Fetch all devices */
export const getDevices = async () => {
  const response = await api.get("/devices");

  // Ensure response.data is an array and map over it
  return response.data
    ? await Promise.all(
        response.data.map(async (device) => await Device.fromJSON(device))
      )
    : [];
};

/* Fetch deleted devices */
export const getDeletedDevices = async () => {
  const response = await api.get("/devices/deleted");

  // Ensure response.data is an array and map over it
  return response.data
    ? await Promise.all(
        response.data.map(async (device) => await Device.fromJSON(device))
      )
    : [];
};

/* Fetch device by id */
export const getDeviceById = async (id) => {
  const response = await api.get(`/devices/${id}`);
  return await Device.fromJSON(response.data);
};

/* Add new device */
export const addDevice = async (newDevice) => {
  const deviceToAdd = Device.toJSON(newDevice);

  console.log("Device to add:", deviceToAdd);
  const response = await api.post("/devices", deviceToAdd);
  return await Device.fromJSON(response.data);
};

/* Update device */
export const updateDevice = async (id, updatedDevice) => {
  const deviceToUpdate = Device.toJSON(updatedDevice);

  const response = await api.put(`/devices/${id}`, deviceToUpdate);
  return await Device.fromJSON(response.data);
};

/* Delete device */
export const deleteDevice = async (id) => {
  await api.delete(`/devices/${id}`);
};
