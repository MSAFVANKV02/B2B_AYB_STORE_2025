"use client";

import { ColumnDef } from "@tanstack/react-table";
import TransactionTableActionModal from "../../table_actions/Accounts/transaction-table-action-modal";
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
export const PaymentHistoryTableColumn: ColumnDef<IOrders>[] = [
  {
    accessorKey: "orderCode",
    header: () => <div className="font-bold text-black max-w-32">Date</div>,
    cell: () => (
      <div>
        {/* {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} */}
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
    accessorKey: "amount",
    header: () => <div className="font-bold text-black max-w-32">Amount</div>,
    cell: ({ row }) => <div>{row.original.amount}</div>,
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
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32"></div>,
    cell: () => {
      // const orderId = row.original.orderCode
      return (
        <div className="relative flex justify-end">
          <TransactionTableActionModal />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
