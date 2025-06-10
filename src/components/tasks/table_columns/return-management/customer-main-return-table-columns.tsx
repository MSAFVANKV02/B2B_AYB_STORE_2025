"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IReturnOrders } from "@/types/return_order_types";
import OrderUserReturnAction from "../../table_actions/reurn-management/customers/return-action-customers";

export const CustomerMainReturnColumn: ColumnDef<IReturnOrders>[] = [
  {
    accessorKey: "createdAt",
    header: () => <div className="font-bold text-black max-w-32">Date</div>,
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
  },
  {
    accessorKey: "return_id",
    header: () => (
      <div className="font-bold text-black max-w-32">Return ID</div>
    ),
    cell: ({ row }) => <div>{row.original.return_id}</div>,
  },
  {
    accessorKey: "customer_id.name",
    header: () => (
      <div className="font-bold text-black max-w-32">User Name</div>
    ),
    cell: ({ row }) => <div>{row.original.customer_id.name}</div>,
  },
  {
    accessorKey: "items",
    header: () => <div className="font-bold text-black max-w-32">Store</div>,
    cell: ({ row }) => {
      const itemLength = row.original.items.length;
      return <div>{itemLength}</div>;
    },
  },

  {
    accessorKey: "status",
    header: () => <div className="font-bold text-black max-w-32">Status</div>,
    cell: ({ row }) => {
      const allDetails = row.original.items.flatMap((item) =>
        item.product.variations.flatMap((variation) => variation.details)
      );

      const returnedDetails = allDetails.filter(
        (detail) => detail.returned_quantity > 0
      );

      const approved = returnedDetails.filter(
        (d) =>
          d.return_status === "refund_approved_by_admin" ||
          d.return_status === "refund_approved_by_store" ||
          d.return_status === "return_approved_by_store" ||
          d.return_status === "refunded" || 
          d.return_status === "replaced"
      ).length;

      const rejected = returnedDetails.filter(
        (d) =>
          d.return_status === "refund_rejected_by_admin" ||
          d.return_status === "rejected"
      ).length;

      // const pending = returnedDetails.filter(
      //   (d) =>
      //     ![
      //       "refund_approved_by_admin",
      //       "refund_rejected_by_admin",
      //       "rejected",
      //     ].includes(d.return_status)
      // ).length;
      const pending = returnedDetails.filter((d) =>
        ["requested"].includes(d.return_status)
      ).length;

      return (
        <div className="text-xs flex flex-wrap gap-3">
          {approved > 0 && (
            <div className="p-1 text-xs text-[#2E7D32] rounded-sm bg-[#E8F5E9] ">
              Approved: {approved}
            </div>
          )}
          {rejected > 0 && (
            <div className="p-1 text-xs text-[#C62828] rounded-sm bg-[#FFEBEE] ">
              Rejected: {rejected}
            </div>
          )}
          {pending > 0 && (
            <div className="p-1 text-xs text-blue-500 rounded-sm bg-blue-50 ">
              Pending: {pending}
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32"></div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="relative flex justify-end">
          <OrderUserReturnAction orders={order} />
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
