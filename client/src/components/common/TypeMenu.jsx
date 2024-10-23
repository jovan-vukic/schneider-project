import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Icon,
  useColorMode,
} from "@chakra-ui/react";

import { TYPES } from "../../utils/constants";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const TypeMenu = ({ data, handleChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === "dark" ? "gray.100" : "gray.900";
  const hoverColor = colorMode === "dark" ? "gray.300" : "gray.700";
  const textColor = colorMode === "dark" ? "gray.900" : "white";

  return (
    <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={ChevronDownIcon} />}
        bg={`${backgroundColor} !important`}
        color={textColor}
        variant={"outline"}
      >
        {data.type.name || "Select Type"}
      </MenuButton>
      <MenuList bg={backgroundColor} color={textColor}>
        {TYPES.map((type) => (
          <MenuItem
            bg={backgroundColor}
            color={textColor}
            _hover={{ bg: hoverColor }}
            key={type.id}
            onClick={() => {
              handleChange(type.id);
              onClose();
            }}
          >
            {type.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TypeMenu;
