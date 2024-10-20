import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onValueChange = () => {
    table.options.meta?.updateCellData(row.index, column.id, value);
  };

  /* Ensure the local value here is always up to date */
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      textAlign={"center"}
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
      onBlur={() => onValueChange()}
    />
  );
};

export default EditableCell;
