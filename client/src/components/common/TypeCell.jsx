import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { TYPES } from "../../data.js";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" borderRadius="full" bg={color} {...props} />
);

const TypeCell = ({ getValue, row, column, table }) => {
  /* If type is null, default to an empty object */
  const { name, color } = getValue() || {};
  const { updateCellData } = table.options.meta;

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        aria-label="Type"
        w="100%"
        h="100%"
        p={1.5}
        bg={color}
        color="gray.800"
      >
        {name}
      </MenuButton>
      <MenuList>
        {/* Add option to clear the type */}
        <MenuItem
          onClick={async () => updateCellData(row.index, column.id, null)}
        >
          <ColorIcon color="gray.300" mr={2} />
          Clear Type
        </MenuItem>

        {TYPES.map((type) => (
          <MenuItem
            key={type.id}
            /* Update the type in the table state */
            onClick={async () => updateCellData(row.index, column.id, type)}
          >
            <ColorIcon color={type.color} mr={2} />
            {type.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TypeCell;
