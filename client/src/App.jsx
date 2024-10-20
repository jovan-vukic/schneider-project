import { Box, Heading } from "@chakra-ui/react";
import DeviceTable from "./components/DeviceTable";

function App() {
  return (
    <Box maxW={1000} mx="auto" px={6} pt={24} fontSize="sm">
      <Heading mb={10}>DER</Heading>
      <DeviceTable />
    </Box>
  );
}

export default App;
