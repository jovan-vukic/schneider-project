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
} from "@chakra-ui/react";

import { useDevices } from "../../hooks/useDevices";
import HistoryIcon from "../icons/HistoryIcon";
import { getDevices } from "../../services/DeviceService";

const DeviceActionHistory = () => {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const sortActionHistory = async () => {
    setLoading(true);

    let devices;

    try {
      devices = await getDevices();
    } catch (error) {
      showToast("Error fetching devices", "error");
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
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
        });
        return;
      }

      if (device.createdAt) {
        actions.push({
          type: "created",
          timestamp: new Date(device.createdAt),
          deviceId: device.name + " [" + device.type.name + "]",
        });
      }
    });

    // Sort actions by timestamp, descending
    const sortedActions = actions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);

    setHistory(sortedActions);
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
      <PopoverContent mr={2}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Device Action History</PopoverHeader>
        <PopoverBody>
          {history.length > 0 ? (
            <List spacing={3}>
              {history.slice(0, 10).map((action, index) => (
                <ListItem key={index}>
                  <Text fontWeight="bold">
                    {action.type === "created" ? "Created" : "Updated"} Device
                    {": "}
                    {action.deviceId}
                  </Text>
                  <Text fontSize="sm">
                    At: {action.timestamp.toLocaleString()}
                  </Text>
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
