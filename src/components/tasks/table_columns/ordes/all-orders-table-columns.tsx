"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrders, IOrderStatus } from "@/types/orderTypes";
import AllOrderTableAction from "../../table_actions/Orders/all-orders-action/all-order-table-action";

export const AllOrdersTableColumnSDcn: ColumnDef<IOrders>[] = [
  // {
  //   accessorKey: "createdAt",
  //   header: "Date",
  //   filterFn: (row, columnId, filterValue) => {
  //     const date = new Date(row.getValue(columnId));
  //     return (
  //       date >= new Date(filterValue.from) && date <= new Date(filterValue.to)
  //     );
  //   },
  // },
  {
    accessorKey: "order_id",
    header: () => <div className="font-bold ">Order ID</div>,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.original.order_id}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-bold ">Date</div>,
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));
      return (
        date >= new Date(filterValue.from) && date <= new Date(filterValue.to)
      );
    },
  },
  {
    // accessorKey: "customer_id.name",
    accessorFn: (row) => row.customer_id?.name ?? "",
    id: "customer_name",
    header: () => <div className="font-bold ">Customer</div>,
    cell: ({ row }) => <div>{row.original.customer_id.name}</div>, // or row.original.customer
  },
  {
    accessorKey: "products",
    header: () => <div className="font-bold ">Products</div>,
    cell: ({ row }) => <div>{row.original.store_orders[0].items.length}</div>,
  },
  {
    // accessorKey: "total_amount",
    accessorFn: (row) => row.order_total?.total_amount,
    id: "total_amount",
    header: () => <div className="font-bold ">Total</div>,
    cell: ({ row }) => <div>{row.original.order_total.total_amount}</div>,
  },
  {
    // accessorKey: "paymentMethod",
    accessorFn: (row) => row.payment_method,
    id: "paymentMethod",
    header: () => <div className="font-bold ">Payment Mode</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.original.payment_method}</div>
    ),
  },
  {
    // accessorKey: "deliveryType",
    accessorFn: (row) =>
      row.store_orders?.[0]?.parcel_details?.shipping_method ?? "",
    id: "deliveryType",
    header: () => <div className="font-bold ">Delivery Type</div>,
    cell: ({ row }) => {
      const DeliveryType =
        row.original.store_orders[0].parcel_details.shipping_method
          .split("_")
          .join(" ");

      return (
        <div>
          {DeliveryType === "parcel pickup" ? "Door Delivery" : DeliveryType}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="font-bold ">Status</div>,
    cell: ({ row }) => {
      const storeOrder = row.original.store_orders?.[0];
      const status = storeOrder?.order_status as IOrderStatus;
      const isReturned = storeOrder?.is_returned;
      const statusLabelMap: Record<IOrderStatus, string> = {
        pending: "Pending",
        processing: "In Progress",
        ready_to_pickup: "Ready for Pickup",
        shipped: "Shipped",
        out_for_delivery: "Out for Delivery",
        delivered: "Delivered",
        cancelled: "Cancelled",
      };

      const statusColorMap: Record<IOrderStatus, string> = {
        pending: "bg-yellow-50 text-yellow-600 border border-yellow-500 dark:bg-yellow-50/20 dark:border-yellow-500/30 dark:text-neutral-300",
        processing: "bg-blue-50 text-blue-600 border border-blue-500 dark:bg-blue-50/20 dark:border-blue-500/30 dark:text-neutral-300",
        ready_to_pickup:
          "bg-orange-50 text-orange-600 border border-orange-500 dark:bg-orange-50/20 dark:border-orange-500/30 dark:text-neutral-300",
        shipped: "bg-[#16A085]/10 text-[#16A085] border border-[#16A085] dark:bg-[#16A085]/20 dark:border-[#16A085]/30 dark:text-neutral-300",
        out_for_delivery:
          "bg-violet-50 text-violet-600 border border-violet-500 dark:bg-violet-50/20 dark:border-violet-500/30 dark:text-neutral-300",
        delivered: "bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60] dark:bg-[#27AE60]/20 dark:border-[#27AE60]/30 dark:text-neutral-300",
        cancelled: "bg-red-50 text-red-600 border border-red-500 dark:bg-red-50/20 dark:border-red-500/30 dark:text-neutral-300",
      };
      // const status = row.original.store_orders?.[0]?.order_status as IOrderStatus;

      if (isReturned) {
        return (
          <div className="px-2 py-1 rounded text-xs text-center w-fit bg-pink-100 text-pink-600 border border-pink-400">
            Returned
          </div>
        );
      }

      const label = statusLabelMap[status] ?? "Unknown";
      const color = statusColorMap[status] ?? "bg-gray-200";

      return (
        <div className={`px-2 py-1 rounded text-xs text-center w-fit ${color}`}>
          {label}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold "></div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <AllOrderTableAction orders={row.original} />
      </div>
    ),
  },
];
