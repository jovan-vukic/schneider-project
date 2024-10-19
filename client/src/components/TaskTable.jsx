import { Box } from "@chakra-ui/react";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DATA from "../data.js";

/**
 * AccessorKey is the name of the column in the data.
 * Header is the name of the column.
 * Cell is the content of the cell.
 */
const columns = [
  {
    accessorKey: "task",
    header: "Task",
    cell: (info) => <p>{info.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => <p>{info.getValue()?.name}</p>,
  },
  {
    accessorKey: "due",
    header: "Due Date",
    cell: (info) => <p>{info.getValue()?.toLocaleDateString()}</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (info) => <p>{info.getValue()}</p>,
  },
];

const TaskTable = () => {
  const [data, setData] = useState(DATA);

  /**
   * Data is the table data from the data.js file.
   * Columns is the table columns array from above.
   * getCoreRowModel is a function from @tanstack/react-table.
   */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * To get table headers call table.getHeaderGroups().
   * Check with console.log(table.getHeaderGroups()).
   */
  return (
    <Box>
      <Box className="table">
        {table.getHeaderGroups().map((headerGroup) => (
          // For each header group render a box
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              // For each header in the header group render a box
              <Box className="th" key={header.id}>
                {/* Render the header (columns[i].header value) */}
                {header.column.columnDef.header}
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
              <Box className="td" key={cell.id}>
                {/* Render the cell (columns[i].cell value) */}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default TaskTable;
