import {
  Box,
  Button,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";

import FilterIcon from "../icons/FilterIcon";
import { ColorIcon } from "../common/TypeCell";
import { TYPES, CATEGORIES } from "../../utils/constants";

const TypeItem = ({ type, isActive, setColumnFilters }) => {
  return (
    <Button
      bg={isActive && `green.600`}
      color={isActive && `white`}
      size="sm"
      p={2}
      fontWeight="bold"
      borderRadius={6}
      _hover={!isActive && { bg: `gray.500` }}
      onClick={() =>
        setColumnFilters((old) => {
          const types = old.find((f) => f.id === "type")?.value;

          if (!types) return old.concat({ id: "type", value: [type.id] });

          return old.map((f) =>
            f.id === "type"
              ? {
                  ...f,
                  value: isActive
                    ? types.filter((s) => s !== type.id)
                    : types.concat(type.id),
                }
              : f
          );
        })
      }
    >
      <ColorIcon color={type.color} mr={2} />
      {type.name}
    </Button>
  );
};

const CategoryItem = ({ category, isActive, setColumnFilters }) => {
  return (
    <Button
      bg={isActive && `green.600`}
      color={isActive && `white`}
      size="sm"
      p={2}
      fontWeight="bold"
      borderRadius={6}
      _hover={!isActive && { bg: `gray.500` }}
      onClick={() =>
        setColumnFilters((old) => {
          const categories = old.find((f) => f.id === "category")?.value;

          if (!categories)
            return old.concat({ id: "category", value: [category.id] });

          return old.map((f) =>
            f.id === "category"
              ? {
                  ...f,
                  value: isActive
                    ? categories.filter((s) => s !== category.id)
                    : categories.concat(category.id),
                }
              : f
          );
        })
      }
    >
      {category.name}
    </Button>
  );
};

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  /* Get array of all active types to check if specific type is active */
  /* We check if current TypeItem is in this array which means it is active. */
  const types = columnFilters.find((f) => f.id === "type")?.value || [];

  const categories =
    columnFilters.find((f) => f.id === "category")?.value || [];

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button size="sm" leftIcon={<Icon as={FilterIcon} fontSize="xs" />}>
          <Text>Filter</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent w="400px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody p={5}>
          <HStack spacing={8} align="flex-start">
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Filter By:
              </Text>
              <Text fontWeight="bold" color="gray.400" mb={2}>
                Type
              </Text>
              <VStack align="flex-start" spacing={2}>
                {TYPES.map((type) => (
                  <TypeItem
                    key={type.id}
                    type={type}
                    isActive={types.includes(type.id)}
                    setColumnFilters={setColumnFilters}
                  />
                ))}
              </VStack>
            </Box>
            <Box mt={8}>
              <Text fontWeight="bold" color="gray.400" mb={2}>
                Category
              </Text>
              <VStack align="flex-start" spacing={2}>
                {CATEGORIES.map((category) => (
                  <CategoryItem
                    key={category.id - 50}
                    category={category}
                    isActive={categories.includes(category.id)}
                    setColumnFilters={setColumnFilters}
                  />
                ))}
              </VStack>
            </Box>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
