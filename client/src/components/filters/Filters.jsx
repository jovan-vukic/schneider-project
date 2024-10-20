import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import SearchIcon from "../icons/SearchIcon";
import FilterPopover from "./FilterPopover";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const nameName = columnFilters.find((f) => f.id === "name")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((old) =>
      /* Remove the filter with the same id */
      old
        .filter((columnFilter) => columnFilter.id !== id)
        .concat({
          id,
          value,
        })
    );

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
          value={nameName}
          onChange={(e) => {
            onFilterChange("name", e.target.value);
          }}
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
