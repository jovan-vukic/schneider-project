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

import FilterIcon from "./icons/FilterIcon";
import { ColorIcon } from "./StatusCell";
import { STATUSES } from "../data";

const StatusItem = ({ status, isActive, setColumnFilters }) => {
  return (
    <Button
      bg={isActive ? `green.800` : `gray.800`}
      size="sm"
      p={2}
      fontWeight="bold"
      borderRadius={6}
      _hover={{ bg: `gray.700` }}
      onClick={() =>
        setColumnFilters((old) => {
          const statuses = old.find((f) => f.id === "status")?.value;

          if (!statuses)
            return old.concat({ id: "status", value: [status.id] });

          return old.map((f) =>
            f.id === "status"
              ? {
                  ...f,
                  value: isActive
                    ? statuses.filter((s) => s !== status.id)
                    : statuses.concat(status.id),
                }
              : f
          );
        })
      }
    >
      <ColorIcon color={status.color} mr={2} />
      {status.name}
    </Button>
  );
};

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  /* Get array of all active statuses to check if specific status is active */
  /* We check if current StatusItem is in this array which means it is active. */
  const statuses = columnFilters.find((f) => f.id === "status")?.value || [];

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
            Status
          </Text>
          <VStack align="flex-start" spacing={2}>
            {STATUSES.map((status) => (
              <StatusItem
                key={status.id}
                status={status}
                isActive={statuses.includes(status.id)}
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
