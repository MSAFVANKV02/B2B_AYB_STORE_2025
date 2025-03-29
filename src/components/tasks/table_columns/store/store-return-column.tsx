"use client";

import { ColumnDef } from "@tanstack/react-table";
import StoreReturnProductAction from "../../table_actions/store/store-product-return-action";

export const ReturnFromStoreTableColumn: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32">Date</div>,
    cell: ({ row }) => <div>{row.original.date}</div>,
  },
  {
    accessorKey: "store",
    header: () => <div className="font-bold text-black max-w-32">Return ID</div>,
    cell: () => <div>Store</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="font-bold text-black max-w-32">Store From</div>,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  // {
  //   accessorKey: "gst",
  //   header: () => (
  //     <div className="font-bold text-black max-w-32">Amount</div>
  //   ),
  //   cell: ({ row }) => <div>{row.original.gst}</div>,
  // },

  {
    accessorKey: "pinCode",
    header: () => <div className="font-bold text-black max-w-32 text-start ">Status</div>,
    cell: ({ row }) => <div>{row.original.pinCode}</div>,
  },

  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32"></div>,
    cell: () => {
      //   const order = row.original;
      return (
        <div className="relative flex justify-end">
       
          <StoreReturnProductAction />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
