import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  getDevices,
  addDevice,
  updateDevice,
  deleteDevice,
} from "../services/DeviceService";

export const useDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  /* Display toast message */
  const showToast = (message, status) => {
    setTimeout(() => {
      toast({
        title: message,
        status: status,
        duration: 4000,
        isClosable: true,
      });
    }, 500);
  };

  /* Fetch the devices from the API */
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);

      try {
        const fetchedDevices = await getDevices();
        setDevices(fetchedDevices);
      } catch (error) {
        showToast("Error fetching devices", "error");
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  /* Add a new device */
  const addNewDevice = async (device) => {
    try {
      console.log(" device", device);

      const addedDevice = await addDevice(device);
      setDevices((old) => [...old, addedDevice]);

      showToast("The device has been successfully added.", "success");
    } catch (error) {
      showToast("Error adding device", "error");
      console.error("Error adding device:", error);
    }
  };

  /* Update an existing device */
  const updateExistingDevice = async (device) => {
    try {
      const updatedDevice = await updateDevice(device.id, device);
      setDevices((old) =>
        old.map((d) => (d.id === device.id ? updatedDevice : d))
      );

      showToast("The device has been successfully updated.", "success");
    } catch (error) {
      showToast("Error updating device", "error");
      console.error("Error updating device:", error);
    }
  };

  /* Delete an existing device */
  const deleteExistingDevice = async (deviceId) => {
    try {
      await deleteDevice(deviceId);
      setDevices((old) => old.filter((d) => d.id !== deviceId));

      showToast("The device has been successfully deleted.", "success");
    } catch (error) {
      showToast("Error deleting device", "error");
      console.error("Error deleting device:", error);
    }
  };

  return {
    devices,
    loading,
    addNewDevice,
    updateExistingDevice,
    deleteExistingDevice,
  };
};
