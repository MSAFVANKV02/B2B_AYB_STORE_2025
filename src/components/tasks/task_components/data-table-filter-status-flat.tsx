import * as React from "react";
import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilterFlatStyle<TData, TValue>({
  column,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  // const selectedValues = new Set(column?.getFilterValue() as string[]);
  const selectedValue = column?.getFilterValue() as string | undefined;

  return (
    <>
      <div className="flex gap-3">
        {options.map((option,idx) => {
          // const isSelected = selectedValues.has(option.value);
          const isSelected = selectedValue === option.value;
          return (
            <Button
            key={idx}
            onClick={() => {
              const newValue = isSelected ? undefined : option.value;
              column?.setFilterValue(newValue);
            }}
              // onClick={() => {
              //   if (isSelected) {
              //     selectedValues.delete(option.value);
              //   } else {
              //     selectedValues.add(option.value);
              //   }
              //   const filterValues = Array.from(selectedValues);
              //   column?.setFilterValue(
              //     filterValues.length ? filterValues : undefined
              //   );
              // }}
              className={` ${isSelected ? "bg-[#F1F9FF] " : ""} rounded-md`}
              variant={"outline"}
            >
              {option.label}
              {selectedValue === option.value && facets?.get(option.value) && (
                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                  {facets.get(option.value)}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </>
  );
}
