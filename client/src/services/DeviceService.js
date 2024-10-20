import { Device } from "../models/Device";
import api from "../utils/api";

/* Fetch all devices */
export const getDevices = async () => {
  const response = await api.get();
  return (
    response.data && response.data.map((device) => Device.fromJSON(device))
  );
};

/* Fetch device by id */
export const getDeviceById = async (id) => {
  const response = await api.get(`/${id}`);
  return Device.fromJSON(response.data);
};

/* Add new device */
export const addDevice = async (newDevice) => {
  const deviceToAdd = new Device(newDevice).toJSON();

  const response = await api.post("/", deviceToAdd);
  return Device.fromJSON(response.data);
};

/* Update device */
export const updateDevice = async (id, updatedDevice) => {
  const deviceToUpdate = new Device(updatedDevice).toJSON();

  console.log("|!!!!!!|", deviceToUpdate);

  const response = await api.put(`/${id}`, deviceToUpdate);
  return Device.fromJSON(response.data);
};

/* Delete device */
export const deleteDevice = async (id) => {
  await api.delete(`/${id}`);
};
