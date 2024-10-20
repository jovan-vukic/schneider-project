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

const StatusItem = ({ status }) => {
  return (
    <Button
      size="sm"
      p={2}
      fontWeight="bold"
      borderRadius={6}
      _hover={{ bg: `gray.700` }}
    >
      <ColorIcon color={status.color} mr={2} />
      {status.name}
    </Button>
  );
};

const FilterPopover = () => {
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
          <Text fontSize="md" color="gray.500" fontWeight="bold" mb={2}>
            Filter By:
          </Text>
          <Text fontWeight="bold" color="gray.500" mb={2}>
            Status
          </Text>
          <VStack align="flex-start" spacing={2}>
            {STATUSES.map((status) => (
              <StatusItem status={status} key={status.id} />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
