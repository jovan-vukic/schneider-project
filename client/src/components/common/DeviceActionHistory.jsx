import React, { useEffect, useState } from "react";
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  List,
  ListItem,
  Text,
  Spinner,
  Icon,
  Box,
} from "@chakra-ui/react";

import HistoryIcon from "../icons/HistoryIcon";
import {
  getDeletedDevices,
  getDevices,
  restoreDeletedDevice,
} from "../../services/DeviceService";

import { useDevices } from "../../hooks/useDevices";
import ReverseIcon from "../icons/ReverseIcon";

const DeviceActionHistory = () => {
  const [history, setHistory] = useState([]);

  const sortActionHistory = async () => {
    let devices;
    let deletedDevices;

    try {
      devices = await getDevices();
      deletedDevices = await getDeletedDevices();
    } catch (error) {
      console.error("Error fetching devices:", error);
    }

    // Create an array to hold action history
    const actions = [];

    // Collect actions from each device
    devices.forEach((device) => {
      if (device.updatedAt && device.updatedAt !== device.createdAt) {
        actions.push({
          type: "updated",
          timestamp: new Date(device.updatedAt),
          deviceId: device.name + " [" + device.type.name + "]",
          id: device.id,
        });
        return;
      }

      if (device.createdAt) {
        actions.push({
          type: "created",
          timestamp: new Date(device.createdAt),
          deviceId: device.name + " [" + device.type.name + "]",
          id: device.id,
        });
      }
    });

    // Collect actions from each deleted device
    deletedDevices.forEach((device) => {
      actions.push({
        type: "deleted",
        timestamp: new Date(device.updatedAt),
        deviceId: device.name + " [" + device.type.name + "]",
        id: device.id,
      });
    });

    // Sort actions by timestamp, descending
    const sortedActions = actions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);

    setHistory(sortedActions);
  };

  const restore = async (id) => {
    try {
      await restoreDeletedDevice(id);

      // Refresh
      window.location.reload();
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          icon={<HistoryIcon />}
          aria-label="View device action history"
          position="absolute"
          top="5rem"
          right="1rem"
          onClick={sortActionHistory}
        />
      </PopoverTrigger>
      <PopoverContent mr={4} w="400px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Device Action History</PopoverHeader>
        <PopoverBody>
          {history.length > 0 ? (
            <List spacing={3}>
              {history.slice(0, 10).map((action, index) => (
                <ListItem key={index}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Text fontWeight="bold">
                        {action.type === "created"
                          ? "Created"
                          : action.type === "updated"
                          ? "Updated"
                          : "Deleted"}{" "}
                        Device
                        {": "}
                        {action.deviceId}
                      </Text>
                      <Text fontSize="sm">
                        At: {action.timestamp.toLocaleString()}
                      </Text>
                    </Box>
                    <Box mr={5} mt={2}>
                      {action.type === "deleted" && (
                        <Icon
                          ml={2}
                          color="blue.700"
                          fontSize="xl"
                          as={ReverseIcon}
                          onClick={() => restore(action.id)}
                        />
                      )}
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>No action history available</Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DeviceActionHistory;
