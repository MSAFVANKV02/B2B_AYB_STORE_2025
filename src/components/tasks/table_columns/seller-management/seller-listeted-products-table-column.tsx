"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProducts, IProductStatus } from "@/types/productType";
import Image from "@/components/global/image";
import { Badge } from "@/components/ui/badge";
import ActionsCellRenderer from "@/pages/seller-management/new-product-from-seller/table-cells/ActionsCellRenderer";

export const SellerListedTableColumnShaDcn: ColumnDef<IProducts>[] = [
  {
    accessorKey: "product",
    header: () => <div className="font-bold text-black dark:text-neutral-300 ">Product</div>,
    cell: ({ row }) => {
      const variations = row.original.variations ?? [];

      const allSizes =
        Array.from(
          new Set(
            variations.flatMap((variant) =>
              (variant.details ?? []).map((detail) => detail.size)
            )
          )
        ).join(", ") || "No sizes available";

      const allColors = variations
        .map((variant: any) => variant.colorName)
        .join(", ");

      return (
        <div className="flex gap-2 py-3 ">
          <Image
            src={row.original.thumbnails[0]}
            alt="product-thumbnails"
            className="w-14 h-11 rounded-md"
          />

          <div className="flex flex-col gap-1  text-xs  items-start w-full overflow-hidden">
            <div className="w-full break-words flex gap-1">
              <b>Name: </b>
              <span className="truncate overflow-hidden" >{row.original.product_name || ""}</span>
            </div>
            {/* === */}
            <div className="w-full truncate flex items-center">
              <b>Brand: </b>
              <span>{row.original.brand?.name || ""}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Min-Qty: </b>
              <span>{row.original.minimum_quantity}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Sizes :</b>
              <span>{allSizes}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Colors :</b>
              <span>{allColors}</span>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <div className="font-bold text-black dark:text-neutral-300 max-w-32">Status</div>,
    cell: ({ row }) => {
      const statusClasses: Record<IProductStatus, string> = {
        pending:
          "bg-yellow-100 text-yellow-800 border border-yellow-400 hover:bg-transparent",
        approved:
          "bg-green-100 text-green-800 border border-green-400 hover:bg-transparent",
        hold: "bg-gray-100 text-gray-800 border border-gray-400 hover:bg-transparent",
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
        ₹{row.original.basePrice}
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
        ₹{row.original.samplePrice}
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
        ₹{row.original.mrp}
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
         <ActionsCellRenderer data={order} />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
