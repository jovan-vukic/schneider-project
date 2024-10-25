import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGlobalFilter } from "react-table";

import Filters from "./filters/Filters.jsx";
import SortIcon from "./icons/SortIcon.jsx";
import UpArrowIcon from "./icons/UpArrowIcon.jsx";
import DownArrowIcon from "./icons/DownArrowIcon.jsx";
import AddButton from "./AddButton.jsx";
import { useDevices } from "../hooks/useDevices";
import columns from "../utils/columns.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";

const DeviceTable = () => {
  const {
    devices,
    loading,
    addNewDevice,
    updateExistingDevice,
    deleteExistingDevice,
  } = useDevices();

  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN" || "";

  /* By default there are no filters */
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState([]);

  const table = useReactTable(
    {
      data: devices || [],
      columns,
      state: {
        columnFilters,
        globalFilter,
      },
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      columnResizeMode: "onChange",
      meta: {
        updateCellData: (rowIndex, columnId, value) => {
          updateExistingDevice({
            ...devices[rowIndex],
            [columnId]: value,
          });
        },
        deleteRowData: (rowIndex) => deleteExistingDevice(devices[rowIndex].id),
        updateRowData: (newRow) => updateExistingDevice(newRow),
        addRowData: (newRow) => addNewDevice(newRow),
      },
    },
    useGlobalFilter
  );

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Box>
      <Box display="flex">
        {devices?.length > 0 && (
          <Filters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            table={table}
            filter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
        {isAdmin && <AddButton table={table} />}
      </Box>
      {devices?.length > 0 && (
        <>
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
                          header.column.getIsSorted()
                            ? "yellow.300"
                            : "gray.400"
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
          <ButtonGroup size="md" isAttached variant="outline">
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
        </>
      )}
    </Box>
  );
};

export default DeviceTable;
