// ColorModeToggle.jsx
import { useColorMode, IconButton, Icon } from "@chakra-ui/react";
import SunIcon from "../icons/themes/SunIcon";
import MoonIcon from "../icons/themes/MoonIcon";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle Color Mode"
      icon={
        colorMode === "light" ? <Icon as={MoonIcon} /> : <Icon as={SunIcon} />
      }
      onClick={toggleColorMode}
      variant="outline"
      position="absolute"
      top="1rem"
      right="1rem"
    />
  );
};

export default ColorModeToggle;
