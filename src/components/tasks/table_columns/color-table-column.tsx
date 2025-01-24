"use client";

import { ColumnDef } from "@tanstack/react-table";
import ReviewActionModal from "../table_actions/review_Action_Modal";
import { IColors } from "@/pages/products/colors/color-page";

// import { DataTableColumnHeader } from "../task_components/data-table-column-header";

export const ColorTableColumn: ColumnDef<IColors>[] = [
  {
    accessorKey: "numbers",

    header: () => <div className="font-bold text-black max-w-32 ">#</div>,
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },

  {
    accessorKey: "color_code",
    header: () => <div className="font-bold text-black max-w-32 ">Color</div>,
    cell: ({ row }) => {
      return (
        <div
          className="w-10 h-10 rounded-sm"
          style={{
            backgroundColor: row.original.color_code,
          }}
        />
      );
    },
  },

  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32 ">Name</div>,
    cell: ({ row }) => {
      const catName = row.original.name;
      return <div>{catName}</div>;
    },
  },


  {
    accessorKey: "actions",
    // header: "Actions",
    header: () => <div className="font-bold text-black"></div>,
    cell: () => {
      return (
        <div className="relative flex justify-end">
          <ReviewActionModal />

          {/* Add menu logic here */}
        </div>
      );
    },
  },
];
