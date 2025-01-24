"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StoreTypes } from "@/types/storeTypes";
import AyButton from "@/components/myUi/AyButton";
import { useNavigate } from "react-router-dom";
import MyClock from "@/components/myUi/MyClock";

type Props = {
  data: StoreTypes[];
};

export function DataTableStorePayout({ data }: Props) {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<StoreTypes>[] = [
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.original.created_at;
        // const formattedDate = date
        //   ? new Intl.DateTimeFormat("en-GB", {
        //       day: "2-digit",
        //       month: "short",
        //       year: "numeric",
        //       hour: "2-digit",
        //       minute: "2-digit",
        //       second: "2-digit",
        //       hour12: true, // Enables 12-hour format
        //     }).format(new Date(date))
        //   : "N/A"; // Fallback for undefined dates
        return (
          <div className="lowercase">
            <MyClock date={date} showTime={false} />
          </div>
        );
      },
    },
    {
      accessorKey: "storeName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Store
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.original.storeName}</div>
      ),
    },
    {
        accessorKey: "amount",
        header: () => {
          return (
           <div className="">Amount</div>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.original.amount}</div>
        ),
      },
      {
        accessorKey: "status",
        header: () => {
          return (
           <div className="">Status</div>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.original.status}</div>
        ),
      },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col gap-3 md:items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={
            (table.getColumn("storeName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("storeName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* add new button ==== starts */}
        <AyButton
          title="+ Create seller payment"
          sx={{
            ml: {
             md:"auto",
            },
            borderRadius: "100px",
            width: {
              md:"fit-content"
            },
            px: "14px",
            py: "10px",
          }}
          onClick={() => {
            navigate(`/seller/payout-seller?type=create`);
          }}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody className="border-none">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-none `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={` ${cell.column.id === "actions" ? "w-0" : ""}
                      ${cell.column.id === "select" ? "w-20" : ""}
                      `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
