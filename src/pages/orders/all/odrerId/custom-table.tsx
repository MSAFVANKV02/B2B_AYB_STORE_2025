import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import type { ColumnDef, Table as TableType } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";

type Props<TData, TValue> = {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  tableHeadClass?: string;
  tableRowClass?: string;
  className?: string;
  tableCellClass?: string;
  tableClass?: string;
  tableHeadRowClass?: string;
  index: number;
};

function CustomMainReturnTable<TData, TValue>({
  table,
  isLoading,
  tableCellClass,
  tableHeadClass,
  tableRowClass,
  columns,
  tableClass,
  tableHeadRowClass,
  index,
}: Props<TData, TValue>) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className={cn("overflow-x-auto w-full border-separate  border-spacing-y-0 ", tableClass,
        index === 0 && "border-spacing-y-0 "
      )}>
        {index === 0 && (
          <TableHeader className={cn("border-none ", tableHeadClass)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn("border-b border-b-black")}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      " border-b border-b-[#888888] text-xs sm:text-sm text-neutral-600 dark:text-neutral-300",
                      tableHeadRowClass
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        )}

    {index === 0 &&   <Separator className="my-2 e bg-transparent dark:bg-inherit" /> }

        <TableBody className="[&_tr:last-child]: rounded-lg border ">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div role="status">
                  <span>Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, rowIndex) => {
                const isFirst = rowIndex === 0;
                const isLast = rowIndex === table.getRowModel().rows.length - 1;
                const rowLength = table.getRowModel().rows.length;

        
                return (
                  <TableRow
                    key={row.id}
                    className={cn("bg-white ", tableRowClass)}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      const isFirstCell = cellIndex === 0;
                    //   const isFirstRow = row.index === 0;
                    //   const rowLenght = row.index === 0;


                      const isLastCell = cellIndex === columns.length - 1;
        
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "py-3 px-4  text-xs border-t border-b sm:text-sm",
                            tableCellClass,
                            isFirst && isFirstCell && "rounded-tl-md ",
                            isFirst && isLastCell && "rounded-tr-md",
                            isLast && isFirstCell && "rounded-bl-md",
                            isLast && isLastCell && "rounded-br-md",
                            isFirstCell && "border-l",
                            isLastCell && "border-r",
                             rowLength > 1 &&isFirst && "border-b-0",


                          )}
                        //   className={cn(
                        //     "  py-2 mt-2  border-t border-b sm:text-sm text-xs ",
                        //     tableCellClass,
                        //     row.index === 0 && "rounded-lg  border-b-0 ",
      
                        //     (row.index === 0||row.index === 0) && cellIndex === 0 &&"  rounded-tl-md border-b-0 ",
                        //       cellIndex === 0 && "border-l r", // First column
                        //       cellIndex === columns.length - 1 &&
                        //         " border-r rounded-r-md"
                        //   )}
                        >
                            {/* {rowLength} */}
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-none">
              <TableCell colSpan={columns.length} className="p-0 border-none">
                <div
                  className={cn(
                    ` overflow-hidden border`,
                    row.index === 0 &&
                      " mt-3 rounded-md  rounded-bl-none rounded-br-none",
                    row.index === 1 && " border-t-0",

                    table.getRowModel().rows.length - 1 === row.index &&
                      "rounded-md rounded-tl-none rounded-tr-none"
                  )}
                >
                  <Table className="w-full table-fixed border-none">
                    <tbody>
                      <TableRow className="border-none">
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="py-2 text-sm border-none text-left"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </tbody>
                  </Table>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </div>
  );
}

export default CustomMainReturnTable;
