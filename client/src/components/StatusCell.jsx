import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { STATUSES } from "../data.js";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" borderRadius="full" bg={color} {...props} />
);

const StatusCell = ({ getValue, row, column, table }) => {
  /* If status is null, default to an empty object */
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;

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
        {/* Add option to clear the status */}
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="gray.300" mr={2} />
          Clear Status
        </MenuItem>

        {STATUSES.map((status) => (
          <MenuItem
            key={status.id}
            /* Update the status in the table state */
            onClick={() => updateData(row.index, column.id, status)}
          >
            <ColorIcon color={status.color} mr={2} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default StatusCell;
