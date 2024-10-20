import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/* Fetch all devices */
export const getDevices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching devices", error);
    throw error;
  }
};

/* Fetch device by id */
export const getDeviceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching device with id ${id}`, error);
    throw error;
  }
};

/* Add new device */
export const addDevice = async (newDevice) => {
  try {
    const response = await axios.post(API_URL, newDevice);
    return response.data;
  } catch (error) {
    console.error("Error adding device", error);
    throw error;
  }
};

/* Update device */
export const updateDevice = async (id, updatedDevice) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedDevice);
    return response.data;
  } catch (error) {
    console.error("Error updating device", error);
    throw error;
  }
};

/* Delete device */
export const deleteDevice = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting device with id ${id}`, error);
    throw error;
  }
};
