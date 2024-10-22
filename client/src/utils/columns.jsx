import { ButtonGroup, Icon } from "@chakra-ui/react";

import TypeCell from "../components/common/TypeCell.jsx";
import EditableCell from "../components/common/EditableCell.jsx";
import EditButton from "../components/EditButton.jsx";
import DeleteButton from "../components/DeleteButton.jsx";

/**
 * AccessorKey is the name of the column in the data.
 * Header is the name of the column.
 * Cell is the content of the cell.
 */
const columns = [
  {
    accessorKey: "icon",
    header: "Device Icon",
    cell: (info) => {
      const IconComponent = info.getValue();
      return IconComponent && <Icon as={IconComponent} fontSize={50} />;
    },
    size: 150,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    /* Pass getValue() method from the cell's info, like in
        "cell: (info) => <p>{info.getValue()?.name}</p>,"
      */
    cell: EditableCell,
    size: 200,
    enableColumnFilter: true,
    /* Uses builtin filter function */
    filterFn: "includesString",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: TypeCell,
    size: 200,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterTypes) => {
      /* If it returnes false, row will be removed */
      const type = row.getValue(columnId);

      /* filterTypes is an array of type ids defined in type filter */
      /**
       * When we remove all filteres, the arrray filterTypes will be empty,
       * so we should return true and keep the row in the table data
       * */
      return filterTypes.length === 0 || filterTypes.includes(type?.id);
    },
    sortingFn: (rowA, rowB) => {
      const typeA = rowA.original.type.name.toLowerCase();
      const typeB = rowB.original.type.name.toLowerCase();

      if (typeA < typeB) return -1;
      if (typeA > typeB) return 1;
      return 0;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => <p>{info.getValue()?.name}</p>,
    sortingFn: (rowA, rowB) => {
      const categoryA = rowA.original.category.name.toLowerCase();
      const categoryB = rowB.original.category.name.toLowerCase();

      if (categoryA < categoryB) return -1;
      if (categoryA > categoryB) return 1;
      return 0;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "derId",
    header: "DER ID",
    cell: (info) => <p>{info.getValue()}</p>,
    size: 250,
  },
  {
    accessorKey: "maximumAvailablePower",
    header: "MAX Available Output Power",
    cell: (info) => <p>{info.getValue() + " kW"}</p>,
    size: 250,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row, table }) => (
      <ButtonGroup>
        <EditButton row={row} table={table} />
        <DeleteButton row={row} table={table} />
      </ButtonGroup>
    ),
    size: 150,
    enableSorting: false,
  },
];

export default columns;
