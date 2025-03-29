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
import { Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { ProductLocalType } from "@/pages/reports/product-sale/product-sale-page";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

type Props = {
  data: ProductLocalType[];
};

export default function DataTableReports({ data }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openRow, setOpenRow] = React.useState<number | null>(null);

  const toggleAccordion = (productIndex: number) => {
    setOpenRow(openRow === productIndex ? null : productIndex);
  };

  const columns: ColumnDef<ProductLocalType>[] = [
    {
      accessorKey: "index",
      header: () => <div className="font-bold text-black">#</div>,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="font-bold text-black   w-[250px]">Product Name</div>
      ),
      cell: ({ row }) => (
        <div className="flex gap-2 w-[250px]">
          <img
            src="/img/products/image 75.png"
            className="w-14 h-14"
            alt="product sale"
          />
          <div className="text-xs flex flex-col">
            <span>{row.original.name}</span>
            <div>
              <b>Size: </b>
              <span>X,L,SM</span>
            </div>
            <div>
              <b>Color: </b>
              <span>Gray, Red, Green</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "store",
      header: () => <div className="font-bold text-black">Store</div>,
      cell: ({ row }) => <div>Store {row.index + 1}</div>,
    },
    {
      accessorKey: "unitsSold",
      header: () => <div className="font-bold text-black">Unit Sold</div>,
      cell: ({ row }) => <div>{row.original.unitsSold}</div>,
    },
    {
      accessorKey: "revenue",
      header: () => <div className="font-bold text-black">Revenue</div>,
      cell: ({ row }) => <div>${row.original.revenue}</div>,
    },
    {
      accessorKey: "avgSalePerCustomer",
      header: () => (
        <div className="font-bold text-black">Average Sale / Customer</div>
      ),
      cell: ({ row }) => <div>{row.original.avgSalePerCustomer}</div>,
    },
    {
      accessorKey: "returnRate",
      header: () => <div className="font-bold text-black">Return Rate</div>,
      cell: ({ row }) => <div>{row.original.returnRate}</div>,
    },
    {
      accessorKey: "actions",
      header: () => <div className="font-bold text-black">Action</div>,
      cell: ({ row }) => (
        <IconButton
          onClick={() => toggleAccordion(row.index)}
          aria-label="toggle details"
        >
          {openRow === row.index ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              </React.Fragment>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`align-top text-left ${
                        index === 1 ? "w-[250px]" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {/* Variant Rows (Accordion) */}
                <TableRow>
                  <TableCell colSpan={columns.length} style={{ padding: 0 }}>
                    <Collapse
                      in={openRow === row.index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Table>
                        <TableBody>
                          {row.original.variants?.map(
                            (variant, variantIndex) => (
                              <TableRow
                                key={`${row.index}-${variantIndex}`}
                                className="bg-white"
                              >
                                {/* 1 */}
                                <TableCell className="w-[60px]"></TableCell>

                                {/* 2 */}
                                <TableCell className="flex">
                                  <img
                                    src="/img/products/Group 710.jpg"
                                    className="w-9 h-9"
                                    alt="product sale"
                                  />
                                  {variant.name}
                                </TableCell>
                                {/* 3 */}
                                <TableCell className="w-[130px]"></TableCell>


                                {/* 4 */}
                                <TableCell>S-{variant.stock},</TableCell>

                                {/* 5 */}
                                <TableCell>${row.original.revenue}</TableCell>
                                {/* 6 */}
                                <TableCell>
                                  {row.original.avgSalePerCustomer}
                                </TableCell>
                                {/* 7 */}
                                <TableCell>${row.original.returnRate}%</TableCell>
                                {/* 8 */}
                                <TableCell></TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
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
