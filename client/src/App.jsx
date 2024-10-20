import { Box, Heading } from "@chakra-ui/react";
import DeviceTable from "./components/DeviceTable";

function App() {
  return (
    <Box maxW={1200} mx="auto" pt={20} fontSize="sm">
      <Heading mb={10}>DER</Heading>
      <DeviceTable />
    </Box>
  );
}

export default App;
