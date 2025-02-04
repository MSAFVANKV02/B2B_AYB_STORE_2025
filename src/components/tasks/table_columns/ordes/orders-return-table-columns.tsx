"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrders } from "@/types/orderTypes";
import OrderReturnAction from "../../table_actions/Orders/order-return-action";

export const OrderReturnColumn: ColumnDef<IOrders>[] = [
  {
    accessorKey: "orderCode",
    header: () => (
      <div className="font-bold text-black max-w-32">Order Code</div>
    ),
    cell: ({ row }) => <div>{row.original.orderCode}</div>,
  },
  {
    accessorKey: "returnId",
    header: () => (
      <div className="font-bold text-black max-w-32">Return ID</div>
    ),
    cell: () => <div>Return ID</div>,
  },
  {
    accessorKey: "customer",
    header: () => <div className="font-bold text-black max-w-32">Customer</div>,
    cell: ({ row }) => <div>{row.original.customer}</div>,
  },
  {
    accessorKey: "store",
    header: () => <div className="font-bold text-black max-w-32">Store</div>,
    cell: ({ row }) => <div>{row.original.store}</div>,
  },

  {
    accessorKey: "status",
    header: () => <div className="font-bold text-black max-w-32">Status</div>,
    cell: () => (
      <div>
        <small>On transit</small>
      </div>
    ),
  },

  {
    accessorKey: "refund",
    header: () => <div className="font-bold text-black max-w-32">Reason</div>,
    cell: () => (
      <div>
        <span>reason Here ..</span>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32"></div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="relative flex justify-end">
          <OrderReturnAction order={order} />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
