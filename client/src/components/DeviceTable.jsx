import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Icon,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import EditableCell from "./common/EditableCell.jsx";
import TypeCell from "./common/TypeCell.jsx";
import Filters from "./filters/Filters.jsx";
import SortIcon from "./icons/SortIcon.jsx";
import UpArrowIcon from "./icons/UpArrowIcon.jsx";
import DownArrowIcon from "./icons/DownArrowIcon.jsx";
import EditButton from "./EditButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import {
  deleteDevice,
  getDevices,
  updateDevice,
} from "../services/DeviceService.js";
import {
  CATEGORY_STRING_MAP,
  STRING_CATEGORY_MAP,
  STRING_TYPE_MAP,
  TYPE_ICONS,
  TYPE_STRING_MAP,
} from "../data.js";

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
    size: 250,
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

const DeviceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  /* Display toast message */
  const showToast = (message, status) => {
    setTimeout(() => {
      toast({
        title: message,
        status: status,
        duration: 2000,
        isClosable: true,
      });
    }, 500);
  };

  /* Fetch the devices from the API */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const devices = await getDevices();

        setData(
          devices &&
            devices.map((device) => {
              const type = STRING_TYPE_MAP[device.type];
              const category = STRING_CATEGORY_MAP[device.category];

              return {
                ...device,
                icon: TYPE_ICONS[type.id],
                type: type,
                category: category,
                maximumAvailablePower: parseFloat(device.maximumAvailablePower),
              };
            })
        );
        setLoading(false);
      } catch (error) {
        showToast("Error fetching devices", "error");
        setLoading(false);
        throw error;
      }
    };

    fetchData();
  }, []);

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
      updateCellData: async (rowIndex, columnId, value) => {
        try {
          // Call updateRowData to update the entire row with the new object
          await table.options.meta.updateRowData(rowIndex, {
            ...data[rowIndex],
            [columnId]: value,
          });
        } catch (error) {
          showToast("Failed to update device cell", "error");
          throw error;
        }
      },
      deleteRowData: async (rowIndex) => {
        try {
          // Delete the row on the server
          await deleteDevice(data[rowIndex].id);

          // Delete the row locally
          setData((old) => old.filter((_, index) => index !== rowIndex));

          showToast("The device has been successfully deleted.", "success");
        } catch (error) {
          showToast("Error deleting device", "error");
          throw error;
        }
      },
      /* Update the whole row and not just the cell value in the row with the specified rowIndex and columnId */
      updateRowData: async (rowIndex, newRowValue) => {
        try {
          newRowValue["maximumAvailablePower"] = parseFloat(
            newRowValue["maximumAvailablePower"]
          );

          console.log("newRowValue", newRowValue);
          console.log("row[rowIndex]", data[rowIndex]);

          // Update the data via the API
          let updatedDevice = { ...newRowValue };

          updatedDevice.type = TYPE_STRING_MAP[updatedDevice.type.id];
          updatedDevice.category =
            CATEGORY_STRING_MAP[updatedDevice.category.id];

          await updateDevice(updatedDevice.id, updatedDevice);

          // Update the local data and the data in the table
          setData((old) =>
            old.map((row, index) => (index === rowIndex ? newRowValue : row))
          );

          console.log("data", data);

          showToast("The device has been successfully updated.", "success");
        } catch (error) {
          showToast("Error updating device", "error");
          throw error;
        }
      },
      addRowData: (newRowValue) => {
        setData((old) => [...old, newRowValue]);

        showToast("The device has been successfully created.", "success");
      },
    },
  });

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

  if (!loading && (!data || data.length === 0)) {
    /* Return just list of devices is empty message */
    console.log(data);
    return (
      <Center h="100vh">
        <Text fontSize="2xl">No devices found</Text>
      </Center>
    );
  }

  /**
   * To get table headers call table.getHeaderGroups().
   * Check with console.log(table.getHeaderGroups()).
   */
  return (
    <Box>
      <Box display="flex">
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <AddButton table={table} />
      </Box>
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
