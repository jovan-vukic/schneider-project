import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import SearchIcon from "./icons/SearchIcon";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "task")?.value || "";

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
          value={taskName}
          onChange={(e) => {
            onFilterChange("task", e.target.value);
          }}
        />
      </InputGroup>
    </Box>
  );
};

export default Filters;
