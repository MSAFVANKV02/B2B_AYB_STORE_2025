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
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { ChevronDown } from "lucide-react";

type Props = {
  data: ProductLocalType[];
};

export default function DataTableProductStockReports({ data }: Props) {
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
      header: () => <div className="font-bold text-black">Product Name</div>,
      cell: ({ row }) => (
        <div className="flex gap-2">
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
      accessorKey: "stock",
      header: () => (
        <div className="font-bold text-black text-right">Stock</div>
      ),
      cell: ({ row }) => <div className="text-right">{row.original.stock}</div>,
    },
    {
      accessorKey: "actions",
      header: () => <div className="font-bold text-black w-0"></div>,
      cell: ({ row }) => (
        <TableCell style={{ width: "0px" }}>
     <div className="">
     <IconButton
        onClick={() => toggleAccordion(row.index)}
        aria-label="toggle details"
      >
        {openRow === row.index ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
     </div>
    </TableCell>
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
          placeholder="Filter products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* <DropdownMenu>
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
        </DropdownMenu> */}
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
                <TableRow data-state={row.getIsSelected() && "selected"} className="hover:bg-bgSoft ">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`align-top ${
                        cell.column.id === "stock" ? "text-right" : "text-left"
                      }
                      ${ cell.column.id === "actions" ? "w-0" : ""}
                      `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {/* variation row  */}
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
                                {row
                                  .getVisibleCells()
                                  .map((cell, cellIndex) => (
                                    <TableCell
                                      key={cell.id}
                                      className={`align-top ${
                                        cell.column.id === "stock"
                                          ? "text-right"
                                          : "text-left"
                                      }
                                        ${ cell.column.id === "index" ? "w-[10%]" : ""}
                                       ${ cell.column.id === "actions" ? "2xl:w-[6%] xl:w-[7%] sm:w-[10%]" : ""}
                                      `}
                                    >
                                      {cellIndex === 1 ? (
                                        <div className="flex items-center ">
                                          <img
                                            src="/img/products/Group 710.jpg"
                                            className="w-9 h-9 mr-2"
                                            alt="product sale"
                                          />
                                          {variant.name}
                                        </div>
                                      ) : cell.column.id === "stock" ? (
                                        variant.stock
                                      ) : (
                                        ""
                                      )}
                                    </TableCell>
                                  ))}
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
