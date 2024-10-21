import { Device } from "../models/Device";
import api from "../utils/api";

/* Fetch all devices */
export const getDevices = async () => {
  const response = await api.get();

  // Ensure response.data is an array and map over it
  return response.data
    ? await Promise.all(
        response.data.map(async (device) => await Device.fromJSON(device))
      )
    : [];
};

/* Fetch device by id */
export const getDeviceById = async (id) => {
  const response = await api.get(`/${id}`);
  return await Device.fromJSON(response.data);
};

/* Add new device */
export const addDevice = async (newDevice) => {
  const deviceToAdd = Device.toJSON(newDevice);

  console.log("Device to add:", deviceToAdd);
  const response = await api.post("", deviceToAdd);
  return await Device.fromJSON(response.data);
};

/* Update device */
export const updateDevice = async (id, updatedDevice) => {
  const deviceToUpdate = Device.toJSON(updatedDevice);

  const response = await api.put(`/${id}`, deviceToUpdate);
  return await Device.fromJSON(response.data);
};

/* Delete device */
export const deleteDevice = async (id) => {
  await api.delete(`/${id}`);
};
