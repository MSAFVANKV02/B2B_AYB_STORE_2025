"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "@/components/global/image";
import { Badge } from "@/components/ui/badge";
import ActionsCellRenderer from "@/pages/seller-management/new-product-from-seller/table-cells/ActionsCellRenderer";
import { IStockStatusTypes, IStockType } from "@/types/stock_types";
import { IAdminTypes } from "@/types/adminUserTypes";
import { StoreTypes } from "@/types/storeTypes";

export const StoreRequestedTableColumnShaDcn: ColumnDef<IStockType>[] = [
  {
    accessorKey: "product",
    header: () => <div className="font-bold text-black dark:text-neutral-300 ">Product</div>,
    cell: ({row}) => {
      console.log(row, "row");
      const isStore = "emailId" in row.original.destination; // StoreTypes has 'emailId'
      const isAdmin = "email" in row.original.destination;

      return (
        <div className="flex gap-2  py-3">
          <Image
            src={row.original.product_details[0]?.product.thumbnails[0] || ""}
            alt="product-thumbnails"
            className="w-14 h-11 rounded-md"
          />

          <div className="flex flex-col gap-1 items-start w-full">
            {/* Product Name - Now breaks properly */}
            <div className="w-full flex items-center">
              <b>Name: </b>
              <span className="break-words whitespace-normal w-full">
                {row.original.destination?.name || ""}
              </span>
            </div>

            {/* Store Email (if Store) */}
            {isStore && (
              <div className="w-full flex justify-center gap-1 flex-col">
                <div className="flex items-center">
                  <b>Email: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.original.destination as StoreTypes).emailId}
                  </span>
                </div>
                {/* ------ */}
                <div className="flex items-center">
                  <b>Phone: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.original.destination as StoreTypes).phoneNumber}
                  </span>
                </div>
              </div>
            )}

            {/* Admin Email (if Admin) */}
            {isAdmin && (
              <div className="w-full flex justify-center gap-1 flex-col">
                <div className="flex items-center">
                  <b>Email: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.original.destination as IAdminTypes).email}
                  </span>
                </div>
                {/* ------ */}
                <div className="flex items-center">
                  <b>Phone: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.original.destination as IAdminTypes).mobile}
                  </span>
                </div>
              </div>
            )}

            {/* Brand Name */}
            <div className="w-full flex items-center">
              <b>Brand: </b>
              <span className="break-words whitespace-normal w-full">
                {row.original.product_details[0]?.product.brand?.name || "N/A"}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <div className="font-bold text-black dark:text-neutral-300 max-w-32">Status</div>,
    cell: ({row}) => {
      const statusClasses: Record<IStockStatusTypes, string> = {
        requested:
          "bg-yellow-100 text-yellow-800 border border-yellow-400 hover:bg-transparent",
        approved:
          "bg-green-100 text-green-800 border border-green-400 hover:bg-transparent",
        in_transit:
          "bg-blue-100 text-blue-800 border border-blue-400 hover:bg-transparent",
        received:
          "bg-pink-100 text-pink-800 border border-pink-400 hover:bg-transparent",
        outofstock:
          "bg-gray-100 text-gray-800 border border-gray-400 hover:bg-transparent",

        rejected:
          "bg-red-100 text-red-800 border border-red-400 hover:bg-transparent",
      };

      return (
        <Badge
          className={`${
            statusClasses[row.original.status] ||
            "bg-gray-100 text-gray-800 border border-gray-400 "
          }`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "basePrice",
    header: () => <div className="font-bold text-black dark:text-neutral-300 max-w-32">Base Price</div>,
    cell: ({ row }) => {
    

      return (
       <div className="">
        ₹{row.original.product_details[0]?.product.basePrice}
       </div>
      );
    },
  },
  {
    accessorKey: "samplePrice",
    header: () => <div className="font-bold text-black dark:text-neutral-300 max-w-32">Sample Price</div>,
    cell: ({ row }) => {
    

      return (
       <div className="">
        ₹{row.original.product_details[0]?.product.samplePrice}
       </div>
      );
    },
  },
  {
    accessorKey: "mrp",
    header: () => <div className="font-bold text-black dark:text-neutral-300 max-w-32">MRP</div>,
    cell: ({ row }) => {
    

      return (
       <div className="">
        ₹{row.original.product_details[0]?.product.mrp}
       </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black dark:text-neutral-300 max-w-32">Action</div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="relative flex justify-end">
         <ActionsCellRenderer data={order} isProductList={false} />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
