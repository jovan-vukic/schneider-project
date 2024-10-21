import {
  Button,
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
import { TYPES } from "../../utils/constants";

const TypeItem = ({ type, isActive, setColumnFilters }) => {
  return (
    <Button
      bg={isActive ? `green.600` : `gray.400`}
      color={isActive ? `white` : `black`}
      size="sm"
      p={2}
      fontWeight="bold"
      borderRadius={6}
      _hover={{ bg: `gray.700` }}
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

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  /* Get array of all active types to check if specific type is active */
  /* We check if current TypeItem is in this array which means it is active. */
  const types = columnFilters.find((f) => f.id === "type")?.value || [];

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button size="sm" leftIcon={<Icon as={FilterIcon} fontSize="xs" />}>
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text fontSize="md" color="gray.300" fontWeight="bold" mb={2}>
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
