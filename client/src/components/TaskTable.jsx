import { Box, Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DATA from "../data.js";
import EditableCell from "./EditableCell.jsx";
import StatusCell from "./StatusCell.jsx";
import Filters from "./Filters.jsx";
import SortIcon from "./icons/SortIcon.jsx";
import UpArrowIcon from "./icons/UpArrowIcon.jsx";
import DownArrowIcon from "./icons/DownArrowIcon.jsx";

/**
 * AccessorKey is the name of the column in the data.
 * Header is the name of the column.
 * Cell is the content of the cell.
 */
const columns = [
  {
    accessorKey: "task",
    header: "Task",
    /* Pass getValue() method from the cell's info, like in
      "cell: (info) => <p>{info.getValue()?.name}</p>,"
    */
    cell: EditableCell,
    size: 250,
    enableColumnFilter: true,
    /* Uses builtin filter function */
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
    enableColumnFilter: true,
    enableSorting: false,
    filterFn: (row, columnId, filterStatuses) => {
      /* If it returnes false, row will be removed */
      const status = row.getValue(columnId);

      /* filterStatuses is an array of status ids defined in status filter */
      /**
       * When we remove all filteres, the arrray filterStatuses will be empty,
       * so we should return true and keep the row in the table data
       * */
      return filterStatuses.length === 0 || filterStatuses.includes(status?.id);
    },
  },
  {
    accessorKey: "due",
    header: "Due Date",
    cell: (info) => (
      // Add margin on top of p
      <p style={{ marginTop: "0.5rem", textAlign: "center" }}>
        {info.getValue()?.toLocaleDateString()}
      </p>
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: EditableCell,
    size: 250,
  },
];

const TaskTable = () => {
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
      updateData: (rowIndex, columnId, value) => {
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
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
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
      <ButtonGroup siz="sm" isAttached variant="outline">
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

export default TaskTable;
