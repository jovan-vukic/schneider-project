import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles,
  config,
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          borderRadius: "md",
          bg: props.colorMode === "dark" ? "gray.100" : "gray.900",
          color: props.colorMode === "dark" ? "gray.900" : "white",
        },
      }),
    },
    Input: {
      baseStyle: () => ({
        field: {
          borderColor: "gray.100 !important",
        },
      }),
    },
    MenuButton: {
      baseStyle: () => ({
        field: {
          borderColor: "gray.100 !important",
        },
      }),
    },
  },
});

export default theme;
