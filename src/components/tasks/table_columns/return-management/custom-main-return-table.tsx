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

type Props<TData, TValue> = {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  tableHeadClass?: string;
  enableStatusFlatStyle?: boolean;
  tableRowClass?: string;
  className?: string;
  tableCellClass?: string;
};

function CustomMainReturnTable<TData, TValue>({
  table,
  isLoading,
  tableCellClass,
  tableHeadClass,
  tableRowClass,
  columns,
}: Props<TData, TValue>) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="overflow-x-auto w-full  border-separate border-spacing-y-3 ">
        <TableHeader className={cn("", tableHeadClass)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
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
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn("border-none shadow-sm hover:bg-gray-50 transition-all duration-300 py-0 px-0 my-5", tableRowClass)}
              >
                {row.getVisibleCells().map((cell,cellIndex) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      " sm:px-4 px-2 py-6  border-t border-b sm:text-sm text-xs ",
                      tableCellClass,
                      cellIndex === 0 && "border-l rounded-l-lg ",                     // First column
                      cellIndex === columns.length - 1 && "border-r rounded-r-lg",  
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
