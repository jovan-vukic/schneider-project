import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";

import DATA from "../data.js";
import EditableCell from "./EditableCell.jsx";
import TypeCell from "./TypeCell.jsx";
import Filters from "./Filters.jsx";
import SortIcon from "./icons/SortIcon.jsx";
import UpArrowIcon from "./icons/UpArrowIcon.jsx";
import DownArrowIcon from "./icons/DownArrowIcon.jsx";
import EditButton from "./EditButton.jsx";
import DeleteButton from "./DeleteButton.jsx";

/**
 * AccessorKey is the name of the column in the data.
 * Header is the name of the column.
 * Cell is the content of the cell.
 */
const columns = [
  {
    accessorKey: "derId",
    header: "DER ID",
    cell: (info) => <p>{info.getValue()}</p>,
    size: 150,
  },
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
    accessorKey: "maxAvailablePower",
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

const DeviceTable = () => {
  const [data, setData] = useState(DATA);

  /* By default there are no filters */
  const [columnFilters, setColumnFilters] = useState([]);

  /**
   * Data is the table data from the data.js file.
   * Columns is the table columns array from above.
   * getCoreRowModel is a function from @tanstack/react-table.
   * Anything inside of state object is accessible
   * to other components via table.getState().
   */
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    /* Update "data" through EditableCell */
    meta: {
      updateCellData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              /* Update the row */
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      deleteRowData: (rowIndex) => {
        setData((old) => old.filter((_, index) => index !== rowIndex));
      },
      /* Update the whole row and not just the cell value in the row with the specified rowIndex and columnId */
      updateRowData: (rowIndex, newRowValue) => {
        setData((old) =>
          old.map((row, index) => (index === rowIndex ? newRowValue : row))
        );
      },
    },
  });

  /**
   * To get table headers call table.getHeaderGroups().
   * Check with console.log(table.getHeaderGroups()).
   */
  return (
    <Box>
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          // For each header group render a box
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              // For each header in the header group render a box
              <Box className="th" w={header.getSize()} key={header.id}>
                {/* Render the header (columns[i].header value) */}
                {header.column.columnDef.header}

                {/* Render sorting icon */}
                {header.column.getCanSort() && (
                  <Icon
                    as={
                      header.column.getIsSorted() === "asc"
                        ? UpArrowIcon
                        : header.column.getIsSorted() === "desc"
                        ? DownArrowIcon
                        : SortIcon
                    }
                    mx={3}
                    fontSize={16}
                    onClick={header.column.getToggleSortingHandler()}
                    color={
                      header.column.getIsSorted() ? "yellow.300" : "gray.400"
                    }
                  />
                )}

                {/* Render the resizer bar for the columns */}
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  /* If the column is being resized add isResizing class */
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}
                />
              </Box>
            ))}
          </Box>
        ))}
        {/* Render the rows */}
        {table.getRowModel().rows.map((row) => (
          // For each row render a box
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              // For each cell in a row render a box
              <Box
                className="td"
                w={cell.column.getSize()}
                key={cell.id}
                display="flex" // Use Flexbox for centering
                justifyContent="center" // Center horizontally
                alignItems="center" // Center vertically
                height="60px"
              >
                {/* Render the cell (columns[i].cell value) */}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Text mb={3} mt={3}>
        {/* Print "Page X of Y" */}
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </Text>
      {/* Render buttons to change the page */}
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default DeviceTable;
