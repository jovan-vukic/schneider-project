import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import SearchIcon from "./icons/SearchIcon";

const Filters = () => {
  return (
    <Box mb={5}>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          type="text"
          borderRadius={3}
          variant="filled"
          placeholder="Search"
          _placeholder={{ color: "gray.500" }}
        />
      </InputGroup>
    </Box>
  );
};

export default Filters;
