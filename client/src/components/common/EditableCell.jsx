import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [hitEnter, setHitEnter] = useState(false);

  const onValueChange = async (event) => {
    if (hitEnter) {
      setHitEnter(false);
      return;
    }

    if (event.key === "Enter") setHitEnter(true);
    else setHitEnter(false);

    await table.options.meta?.updateCellData(row.index, column.id, value);
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
      overflow="hidden"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => onValueChange(e)}
      onKeyDown={(e) => e.key === "Enter" && onValueChange(e)}
    />
  );
};

export default EditableCell;
