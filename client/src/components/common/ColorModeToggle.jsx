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
      position="absolute" // Change position as needed
      top="1rem" // Adjust the positioning as necessary
      right="1rem" // Adjust the positioning as necessary
    />
  );
};

export default ColorModeToggle;
