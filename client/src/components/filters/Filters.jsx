import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
} from "@chakra-ui/react";

import SearchIcon from "../icons/SearchIcon";
import FilterPopover from "./FilterPopover";

const Filters = ({
  columnFilters,
  setColumnFilters,
  filter,
  setGlobalFilter,
}) => {
  return (
    <HStack mb={5} mr={7} spacing={5}>
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
          value={filter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </InputGroup>
      <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </HStack>
  );
};

export default Filters;
