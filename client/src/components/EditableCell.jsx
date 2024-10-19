import { Input } from "@chakra-ui/react";
import { useState } from "react";

const EditableCell = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      type="text"
      variant="filled"
      w="85%"
      size="sm"
      color="whiteAlpha.800"
      overflow="hidden"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default EditableCell;
