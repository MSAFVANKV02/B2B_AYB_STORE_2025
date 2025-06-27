"use client";

import { ColumnDef } from "@tanstack/react-table";
import {  IFlatOrderItemDetailsType } from "@/types/orderTypes";
import Image from "@/components/global/image";

export const OrderDetailsTableColumnSDcn: ColumnDef<IFlatOrderItemDetailsType>[] = [
  {
    id: "image",
    header: () => <div className="font-bold">IMAGE</div>,
    cell: ({ row }) => {
      const image = row.original.variation.image
      return (
        <div className="">
        { row.original.showVerifiedLabel ? (
            <Image
            src={image}
            alt="Product"
            
            className="rounded w-10 h-10 overflow-hidden object-cover bg-gray-200"
            classNameImg="w-full h-full object-contain"
          />
      ) : null}
        </div>
      );
    },
  },
  {
    id: "name",
    header: () => <div className="font-bold">NAME</div>,
    cell: ({ row }) =>
      row.original.showVerifiedLabel ? (
        <div className="whitespace-normal font-medium">
          {row.original.product.product_name}
        </div>
      ) : null,
  },
  {
    id: "color",
    header: () => <div className="font-bold">COLOR</div>,
    cell: ({ row }) => <div>{row.original.variation.colorName}</div>,
  },
  {
    id: "size",
    header: () => <div className="font-bold">SIZE</div>,
    cell: ({ row }) => <div>{row.original.details.size}</div>,
  },
  {
    id: "quantity",
    header: () => <div className="font-bold">QTY</div>,
    cell: ({ row }) => <div>{row.original.details.quantity}</div>,
  },
  {
    id: "price",
    header: () => <div className="font-bold">PRICE (1PCS)</div>,
    cell: ({ row }) => <div>₹{row.original.details.selling_price}</div>,
  },
  {
    id: "total",
    header: () => <div className="font-bold">TOTAL</div>,
    cell: ({ row }) => (
      <div>
        ₹{row.original.details.selling_price * row.original.details.quantity}
      </div>
    ),
  },
];
// 
// import { ColumnDef } from "@tanstack/react-table";

// // This type represents grouped data per product with variation details
// export type IGroupedOrderDetails = {
//   product_id: string;
//   product_name: string;
//   image: string;
//   variationDetails: {
//     color: string;
//     size: string;
//     quantity: number;
//     selling_price: number;
//   }[];
// };

// // We use column definitions only for table headers. The body is custom-rendered.
// export const OrderDetailsTableColumnSDcn: ColumnDef<IGroupedOrderDetails>[] = [
//   { id: "image", header: () => <div className="font-bold">Image</div> },
//   { id: "name", header: () => <div className="font-bold">Name</div> },
//   { id: "color", header: () => <div className="font-bold">Color</div> },
//   { id: "size", header: () => <div className="font-bold">Size</div> },
//   { id: "quantity", header: () => <div className="font-bold">Qty</div> },
//   { id: "price", header: () => <div className="font-bold">Price</div> },
//   { id: "total", header: () => <div className="font-bold">Total</div> },
// ];
