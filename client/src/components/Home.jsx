import { Box, Heading } from "@chakra-ui/react";

import DeviceTable from "./DeviceTable";
import DeviceActionHistory from "./common/DeviceActionHistory";
import { useDevices } from "../hooks/useDevices";

const Home = () => {
  return (
    <Box maxW={1200} mx="auto" pt={20} fontSize="md">
      <DeviceActionHistory />
      <Heading mb={10}>DER</Heading>
      <DeviceTable />
    </Box>
  );
};

export default Home;
