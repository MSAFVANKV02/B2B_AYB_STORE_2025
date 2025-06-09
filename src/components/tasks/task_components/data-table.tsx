import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as ReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Collapse } from "@mui/material";
import { cn } from "@/lib/utils";
import { UseModal } from "@/providers/context/context";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // isCustomTableRow?: (row: Row<TData>, index: number) => React.ReactNode;
  isCustomTableBody?: (table: ReactTable<TData>,columns:ColumnDef<TData, TValue>[]) => React.ReactNode;

  haveVariation?: React.ReactNode;
  data: TData[];
  enableStatus?: boolean;
  enablePriority?: boolean;
  enableTitle?: boolean;
  enableView?: boolean;
  enableSearch?: boolean;
  searchWith?: string;
  statuses?: Array<{
    value: string;
    label: string;
    icon: React.ElementType;
  }>;
  isLoading?: boolean;
  tableHeadClass?: string;
  enableStatusFlatStyle?: boolean;
  tableRowClass?: string;
  className?: string;
  tableCellClass?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enableStatus,
  enableView,
  enablePriority,
  enableSearch,
  searchWith,
  statuses,
  haveVariation,
  isLoading,
  tableHeadClass,
  enableStatusFlatStyle,
  tableRowClass,
  className,
  tableCellClass,
  isCustomTableBody,
}: DataTableProps<TData, TValue>) {
  const { openRow } = UseModal();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4  md:w-auto w-[90vw]">
      <DataTableToolbar
        table={table}
        enableStatus={enableStatus}
        enablePriority={enablePriority}
        enableSearch={enableSearch}
        searchWith={searchWith}
        statuses={statuses}
        enableStatusFlatStyle={enableStatusFlatStyle}
        //  enableTitle={enableTitle}
        enableView={enableView}
      />
      {/* isCustomTableBody(row, i) for custom table */}
      <div className={cn("rounded-md border", className)}>
        {isCustomTableBody ? (
          isCustomTableBody(table,columns)
        ) : (
          <Table>
            <TableHeader className={cn("", tableHeadClass)}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="" role="status">
                      <span className="">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody className={cn("[&_tr:last-child]:border")}>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, i) => {
                    const isLastRow = i === table.getRowModel().rows.length - 1;
                    return (
                      <React.Fragment key={row.id}>
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          className={cn(
                            `${row.index % 2 === 0 ? "bg-gray-50" : ""}`,
                            tableRowClass,
                            !isLastRow && "mb-3"
                          )}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className={cn("align-top", tableCellClass)}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>

                        {/* <TableRow>
                  <TableCell colSpan={columns.length} className="p-4">
                    <Collapse
                      in={openRow === row.index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="w-full">{haveVariation}</div>
                    </Collapse>
                  </TableCell>
                </TableRow> */}

                        {openRow === row.index && (
                          <TableRow>
                            <TableCell colSpan={columns.length} className="p-4">
                              <Collapse in={true} timeout="auto">
                                <div className="w-full">{haveVariation}</div>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
