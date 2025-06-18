"use client";

import { ColumnDef } from "@tanstack/react-table";
import MyClock from "@/components/myUi/MyClock";


type IOrders = {
  orderCode: string;
  store: string;
  numOfProducts: number;
  customer: string;
  amount: string; // you can convert this to number if needed
  deliveryStatus: "Pending" | "Shipped" | "Delivered" | "Cancelled"; // extend based on your statuses
  paymentMethod: "Cash on Delivery" | "Online Payment" | string; // adjust based on your methods
  paymentStatus: "Paid" | "Un-paid";
  refund: "Refunded" | "No Refund";
  createdAt: string; // consider `Date` if parsed
  returnType: "replace" | "refund" | "none"; // extend as per your logic
};

export const RentHistoryColumn: ColumnDef<IOrders>[] = [
  {
    accessorKey: "orderCode",
    header: () => <div className="font-bold text-black max-w-32">Date</div>,
    cell: () => (
      <div>
        <MyClock
          date={new Date()}
          showSeconds={false}
          use12Hour
          showTime={false}
        />
      </div>
    ),
  },
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
      <div className="font-bold text-black max-w-32">Tenant Name</div>
    ),
    cell: () => <div>Tenant Name</div>,
  },
  {
    accessorKey: "customer",
    header: () => (
      <div className="font-bold text-black max-w-32">Rent Amount</div>
    ),
    cell: ({ row }) => <div>{row.original.customer}</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => (
      <div className="font-bold text-black max-w-32">Payment Method</div>
    ),
    cell: ({ row }) => <div>{row.original.paymentMethod}</div>,
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
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32"></div>,
    cell: () => {
      // const order = row.original;
      return (
        <div className="relative flex justify-end">
          {/* <OrderReturnAction order={order} /> */}
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
