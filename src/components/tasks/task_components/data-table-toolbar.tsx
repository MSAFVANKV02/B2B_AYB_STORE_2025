// import { Table } from "@tanstack/react-table";
// import { X } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { priorities } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableViewOptions } from "./data-table-view-options";
// import { DataTableFacetedFilterFlatStyle } from "./data-table-filter-status-flat";

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>;
//   enableStatus?: boolean;
//   enablePriority?: boolean;
//   enableTitle?: boolean;
//   enableView?: boolean;
//   enableSearch?: boolean;
//   searchWith?: string;
//   statuses: any;
//   enableStatusFlatStyle?: boolean;
// }

// export function DataTableToolbar<TData>({
//   table,
//   enableStatus,
//   enablePriority,
//   enableView,
//   enableSearch,
//   searchWith,
//   statuses,
//   enableStatusFlatStyle,
// }: DataTableToolbarProps<TData>) {
//   const isFiltered = table.getState().columnFilters.length > 0;

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex flex-1 items-center space-x-2">
//         {/* <Input
//           placeholder="Filter tasks..."
//           value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("title")?.setFilterValue(event.target.value)
//           }
//           className="h-8 w-[150px] lg:w-[250px]"
//         /> */}
//         {enableSearch && (
//           <Input
//             placeholder={`Search by ${searchWith ?? "column"}...`}
//             type="text"
//             value={
//               (searchWith &&
//                 (table.getColumn(searchWith)?.getFilterValue() as string)) ??
//               ""
//             }
//             onChange={(event) => {
//               if (searchWith) {
//                 table.getColumn(searchWith)?.setFilterValue(event.target.value);
//               }
//             }}
//             className="h-8 w-[150px] lg:w-[250px] py-5"
//           />
//         )}

//         {/* {enableStatus && table.getColumn("status") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("status")}
//             title="Status"
//             options={statuses}
//           />

//         )} */}
//         {enableStatus &&
//           table.getColumn("status") &&
//           (enableStatusFlatStyle ? (
//             <DataTableFacetedFilterFlatStyle
//               column={table.getColumn("status")}
//               title="Status"
//               options={statuses}
//             />
//           ) : (
//             <DataTableFacetedFilter
//               column={table.getColumn("status")}
//               title="Status"
//               options={statuses}
//             />
//           ))}

//         {enablePriority && table.getColumn("priority") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("priority")}
//             title="Priority"
//             options={priorities}
//           />
//         )}
//         {isFiltered && (
//           <Button
//             variant="ghost"
//             onClick={() => table.resetColumnFilters()}
//             className="h-8 px-2 lg:px-3"
//           >
//             Reset
//             <X />
//           </Button>
//         )}
//       </div>
//       {enableView && <DataTableViewOptions table={table} />}
//     </div>
//   );
// }
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { priorities } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilterFlatStyle } from "./data-table-filter-status-flat";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { CalendarDatePicker } from "./data-table-date-picker";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  enableStatus?: boolean;
  enablePriority?: boolean;
  enableTitle?: boolean;
  enableView?: boolean;
  enableSearch?: boolean;
  searchWith?: string | string[];
  statuses: any;
  enableStatusFlatStyle?: boolean;
  enableDatepicker?: boolean;
  dateColumnKey?: string;
  toolBarClassName?: string;
}

export function DataTableToolbar<TData>({
  table,
  enableStatus,
  enablePriority,
  enableView,
  enableSearch,
  searchWith,
  statuses,
  enableStatusFlatStyle,
  toolBarClassName,
  enableDatepicker,
  dateColumnKey = "createdAt",
}: DataTableToolbarProps<TData>) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(),
  });

  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter;

  // Debounced filter handler
  const debouncedFilter = useMemo(
    () =>
      debounce((value: string) => {
        if (!searchWith) return;

        if (searchWith === "all") {
          table.setGlobalFilter(value);
        } else {
          const keys = Array.isArray(searchWith) ? searchWith : [searchWith];
          table.resetColumnFilters();
          keys.forEach((key) => {
            table.getColumn(key)?.setFilterValue(value);
          });
        }
      }, 400),
    [table, searchWith]
  );

  // Run debounced search on input change
  useEffect(() => {
    debouncedFilter(globalSearch);
    return () => {
      debouncedFilter.cancel();
    };
  }, [globalSearch, debouncedFilter]);

  const handleDateSelect = (range: { from: Date; to: Date }) => {
    if (!dateColumnKey) return;
    const column = table.getColumn(dateColumnKey);
    if (!column) return;
    column.setFilterValue(range);
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className={cn("flex flex-1 items-center space-x-2", toolBarClassName)}
      >
        {enableDatepicker && (
          <CalendarDatePicker
            date={dateRange}
            onDateSelect={(range) => {
              setDateRange(range);
              handleDateSelect(range);
            }}
            className="h-10"
            variant="outline"
          />
        )}

        {enableSearch && (
          <Input
            placeholder={`Search by ${
              Array.isArray(searchWith)
                ? searchWith.join(", ")
                : searchWith || "column"
            }...`}
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px] py-5"
          />
        )}

        {enableStatus &&
          table.getColumn("status") &&
          (enableStatusFlatStyle ? (
            <DataTableFacetedFilterFlatStyle
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          ) : (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          ))}

        {enablePriority && table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
              setGlobalSearch("");
            }}
            className="h-8 px-2 text-xs lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      {enableView && <DataTableViewOptions table={table} />}
    </div>
  );
}
