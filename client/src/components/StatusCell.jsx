import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";

const StatusCell = ({ getValue, row, column, table }) => {
  /* If status is null, default to an empty object */
  const { name, color } = getValue() || {};

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        aria-label="Status"
        w="100%"
        h="100%"
        p={1.5}
        bg={color}
        color="gray.800"
      >
        {name}
      </MenuButton>
      <MenuList>
        <MenuItem>New Tab</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem>Open Closed Tab</MenuItem>
        <MenuItem>Open File...</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default StatusCell;
