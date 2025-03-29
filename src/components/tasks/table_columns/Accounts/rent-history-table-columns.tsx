"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrders } from "@/types/orderTypes";
import MyClock from "@/components/myUi/MyClock";

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
