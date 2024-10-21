// theme/styles.js
const styles = {
  global: {
    "html, body": {
      backgroundColor: { base: "gray.900", light: "gray" }, // Dark and light background
      color: { base: "whiteAlpha.800", light: "gray.900" }, // Dark and light text color
    },
    svg: {
      cursor: "pointer",
    },
    ".table": {
      border: "1px solid #424242",
    },
    ".tr": {
      display: "flex",
      width: "fit-content",
    },
    ".th, .td": { boxShadow: "inset 0 0 0 1px #424242" },
    ".th": {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: { base: "gray.400", light: "gray.600" }, // Dark and light text color for header
      padding: "0.5rem",
      fontWeight: "bold",
      fontSize: "xs",
      textTransform: "uppercase",
      textAlign: "center",
    },
    ".td > input": {
      m: "1",
      padding: "0.2rem",
      bg: "transparent",
      maxW: "100%",
      color: { base: "white", light: "red.800" },
      border: { base: "1px solid transparent", light: "1px solid #d1d1d1" }, // Border for light mode
      borderRadius: "4px",
    },
    ".date-wrapper": {
      display: "flex",
      alignItems: "center",
      w: "100%",
      h: "100%",
    },
    ".resizer": {
      position: "absolute",
      opacity: 0,
      top: 0,
      right: 0,
      h: "100%",
      w: "5px",
      bg: "#27bbff",
      cursor: "col-resize",
      userSelect: "none",
      touchAction: "none",
      borderRadius: "6px",
    },
    ".resizer.isResizing": {
      bg: { base: "#2eff31", light: "#3472c9" }, // Dark and light resizer color when resizing
      opacity: 1,
    },
    "*:hover > .resizer": {
      opacity: 1,
    },
  },
};

export default styles;
