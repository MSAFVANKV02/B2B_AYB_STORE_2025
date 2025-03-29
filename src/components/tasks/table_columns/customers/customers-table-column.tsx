"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUsers } from "@/types/userTypes";
import CustomersActions from "../../table_actions/customers/customers-actions";

export const CustomersTableColumn: ColumnDef<IUsers>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32">Name</div>,
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "store",
    header: () => <div className="font-bold text-black max-w-32">Store</div>,
    cell: () => <div>Store</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="font-bold text-black max-w-32">Email</div>,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "gst",
    header: () => (
      <div className="font-bold text-black max-w-32">GST number</div>
    ),
    cell: ({ row }) => <div>{row.original.gst}</div>,
  },

  {
    accessorKey: "pinCode",
    header: () => <div className="font-bold text-black max-w-32">PinCode</div>,
    cell: ({ row }) => <div>{row.original.pinCode}</div>,
  },

  {
    accessorKey: "buildingNo",
    header: () => (
      <div className="font-bold text-black max-w-32">Building number</div>
    ),
    cell: ({ row }) => <div>{row.original.buildingNo}</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32">Options</div>,
    cell: () => {
      //   const order = row.original;
      return (
        <div className="relative flex justify-end">
          <CustomersActions />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
