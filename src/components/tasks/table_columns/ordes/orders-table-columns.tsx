"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrders } from "@/types/orderTypes";
import OrderTableActionModal from "../../table_actions/Orders/order-table-action-modal";

export const AllOrdersTableColumn: ColumnDef<IOrders>[] = [
  {
    accessorKey: "orderCode",
    header: () => (
      <div className="font-bold text-black max-w-32">Order Code</div>
    ),
    cell: ({ row }) => <div>{row.original.orderCode}</div>,
  },
  {
    accessorKey: "store",
    header: () => <div className="font-bold text-black max-w-32">Store</div>,
    cell: ({ row }) => <div>{row.original.store}</div>,
  },
  {
    accessorKey: "numOfProducts",
    header: () => (
      <div className="font-bold text-black max-w-32">No. of Products</div>
    ),
    cell: ({ row }) => <div>{row.original.numOfProducts}</div>,
  },
  {
    accessorKey: "customer",
    header: () => <div className="font-bold text-black max-w-32">Customer</div>,
    cell: ({ row }) => <div>{row.original.customer}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="font-bold text-black max-w-32">Amount</div>,
    cell: ({ row }) => <div>{row.original.amount}</div>,
  },
  {
    accessorKey: "deliveryStatus",
    header: () => (
      <div className="font-bold text-black max-w-32">Delivery Status</div>
    ),
    cell: ({ row }) => <div>{row.original.deliveryStatus}</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => (
      <div className="font-bold text-black max-w-32">Payment Method</div>
    ),
    cell: ({ row }) => <div>{row.original.paymentMethod}</div>,
  },
  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className="font-bold text-black max-w-32">Payment Status</div>
    ),
    cell: ({ row }) => (
      <div
        className={`h-8 w-20 flex items-center justify-center rounded-md text-white ${
          row.original.paymentStatus === "Paid" ? "bg-green-400" : "bg-red-400"
        }`}
      >
        {row.original.paymentStatus}
      </div>
    ),
  },
  {
    accessorKey: "refund",
    header: () => <div className="font-bold text-black max-w-32">Refund</div>,
    cell: ({ row }) => <div>{row.original.refund}</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32">Actions</div>,
    cell: ({ row }) => {
        const orderId = row.original.orderCode
      return (
        <div className="relative flex justify-end">
          <OrderTableActionModal orderId={orderId} />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
