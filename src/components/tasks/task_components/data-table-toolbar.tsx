"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { priorities } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  enableStatus?: boolean;
  enablePriority?: boolean;
  enableTitle?: boolean;
  enableView?: boolean;
  enableSearch?: boolean;
  searchWith?: string;
  statuses: any;
}

export function DataTableToolbar<TData>({
  table,
  enableStatus,
  enablePriority,
  enableView,
  enableSearch,
  searchWith,
  statuses
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      {/* <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        {enableSearch && (
         <Input
         placeholder={`Search by ${searchWith ?? "column"}...`}
         type="text"
         value={
           (searchWith && table.getColumn(searchWith)?.getFilterValue() as string) ?? ""
         }
         onChange={(event) => {
           if (searchWith) {
             table.getColumn(searchWith)?.setFilterValue(event.target.value);
           }
         }}
         className="h-8 w-[150px] lg:w-[250px] py-5"
       />
       
        )}

        {enableStatus && table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        { enablePriority && table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
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
