// import { cn } from "@/lib/utils";
// import { flexRender } from "@tanstack/react-table";
// import {
//   Table,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";

// import type { ColumnDef, Table as TableType } from "@tanstack/react-table";

// type Props<TData, TValue> = {
//   table: TableType<TData>;
//   columns: ColumnDef<TData, TValue>[];
//   isLoading?: boolean;
//   tableHeadClass?: string;
//   enableStatusFlatStyle?: boolean;
//   tableRowClass?: string;
//   className?: string;
//   tableCellClass?: string;
// };

// function CustomMainReturnTable<TData, TValue>({
//   table,
//   isLoading,
//   tableCellClass,
//   tableHeadClass,
//   tableRowClass,
//   columns,
// }: Props<TData, TValue>) {
//   return (
//     <div>
//       <Table className="overflow-x-auto w-f">
//         <TableHeader className={cn("", tableHeadClass)}>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <TableHead key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </TableHead>
//               ))}
//             </TableRow>
//           ))}
//         </TableHeader>
//       </Table>

//       <div className="flex flex-col gap-3 mt-3">
//         {isLoading ? (
//           <TableBody>
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 <div className="" role="status">
//                   <span className="">Loading...</span>
//                 </div>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         ) : table.getRowModel().rows.length ? (
//           table.getRowModel().rows.map((row) => (
//             <div
//               key={row.id}
//               className={cn(
//                 "flex w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden",
//                 tableRowClass
//               )}
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <div
//                   key={cell.id}
//                   className={cn(
//                     "flex-1 px-4 py-3 text-sm flex items-center",
//                     tableCellClass
//                   )}
//                 >
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </div>
//               ))}
//             </div>
//           ))
//         ) : (
//           <div className="text-center p-6 text-gray-500">No results.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomMainReturnTable;
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
import { useMemo, useState } from "react";
import {
  IReturnDetail,
  IReturnOrders,
  ReturnItem,
} from "@/types/return_order_types";

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
}: Props<TData, TValue>) {
  const column = table.getColumn("status");
  // const facets = column?.getFacetedUniqueValues();
  // const selectedValues = new Set(column?.getFilterValue() as string[]);
  const selectedValue = column?.getFilterValue() as string | undefined;

  const [subFilter, setSubFilter] = useState<string>("replace");

  // useEffect(() => {
  //   if (
  //     selectedValue === "Approved" ||
  //     selectedValue === "refund" ||
  //     selectedValue === "replace"
  //   ) {
  //     navigate("?filter=approved");
  //   } else {
  //     navigate("?filter");
  //   }
  // }, [selectedValue]);

  // console.log(table.getRowModel().rows);

  const options = [
    {
      name: "Replacement",
      value: "replace",
    },
    {
      name: "Refund",
      value: "refund",
    },
  ];

  const visibleRows = useMemo(() => {
    const allRows = table.getRowModel().rows;

    if (selectedValue !== "Approved" || !subFilter) return allRows;

    return allRows.filter((row) => {
      const order = row.original as IReturnOrders;

      const details = order.items.flatMap((item: ReturnItem) =>
        item.product.variations.flatMap((variation) => variation.details)
      );

      return details.some((detail: IReturnDetail) => {
        return (
          detail.returned_quantity > 0 &&
          detail.return_status &&
          detail.return_mode?.toLowerCase() === subFilter.toLowerCase()
        );
      });
    });
  }, [table, selectedValue, subFilter]);

  // const showSubFilters =
  //   selectedValue === "Approved" ||
  //   selectedValue === "Refund" ||
  //   selectedValue === "Replacement";

  return (
    <div className="w-full overflow-x-auto">
      {/* {selectedValue} */}
      {/* {selectedValue === "Approved" && (
       <div className="border-t-2 pt-3">
         <div className="border w-fit flex gap-1 px-1 text-xs py-1 rounded-full bg-white shadow-sm ">
          {["Refund", "Replacement"].map((subFilter) => {
            // const isSubSelected = selectedValue === subFilter;
            return (
              <button
                key={subFilter}
                className={`h-10 min-w-32 px-3 rounded-full ${
                  selectedValue === subFilter
                    ? "bg-textMain text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => {
                  const newValue =
                    selectedValue === subFilter ? "Approved" : subFilter;
                  column?.setFilterValue(newValue);
                }}
              >
                {subFilter.charAt(0).toUpperCase() + subFilter.slice(1)}
              </button>
            );
          })}
        </div>
       </div>
      )} */}

      {selectedValue === "Approved" && (
        <div className="border-t-2 pt-3">
          <div className="border w-fit flex gap-1 px-1 text-xs py-1 rounded-full bg-white shadow-sm ">
            {options.map((option, i) => (
              <button
                key={i}
                className={`h-10 min-w-32 px-3 rounded-full ${
                  subFilter === option.value
                    ? "bg-textMain text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => {
                  setSubFilter(
                    subFilter === option.value ? "none" : option.value
                  );
                }}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <Table
        className={cn(
          "overflow-x-auto w-full   border-separate border-spacing-y-3 ",
          tableClass
        )}
      >
        <TableHeader className={cn("", tableHeadClass)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={cn("")}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn(
                    "text-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-300",
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

        <TableBody className="[&_tr:last-child]: rounded-lg">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div role="status">
                  <span>Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : //  table.getRowModel().rows.length ? (
          //   table.getRowModel().rows.map((row) => (
          visibleRows.length ? (
            visibleRows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "border-none shadow-sm  transition-all duration-300 py-0 px-0 my-5",
                  tableRowClass
                )}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      " sm:px-4 px-2 py-6  border-t border-b sm:text-sm text-xs ",
                      tableCellClass,
                      cellIndex === 0 && "border-l rounded-l-lg ", // First column
                      cellIndex === columns.length - 1 &&
                        "border-r rounded-r-lg"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomMainReturnTable;
