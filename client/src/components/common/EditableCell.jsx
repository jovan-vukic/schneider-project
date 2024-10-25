import { Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [hitEnter, setHitEnter] = useState(false);

  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const onValueChange = async (event) => {
    if (hitEnter) {
      setHitEnter(false);
      return;
    }

    if (event.key === "Enter") setHitEnter(true);

    await table.options.meta?.updateCellData(row.index, column.id, value);
  };

  /* Ensure the local value here is always up to date */
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!isAdmin)
    return (
      <Text
        textAlign={"center"}
        variant="filled"
        w="85%"
        size="md"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        borderColor="transparent"
      >
        {value}
      </Text>
    );

  return (
    <Input
      textAlign={"center"}
      type="text"
      variant="filled"
      w="85%"
      size="md"
      overflow="hidden"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      borderColor="transparent"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => onValueChange(e)}
      onKeyDown={(e) => e.key === "Enter" && onValueChange(e)}
    />
  );
};

export default EditableCell;
