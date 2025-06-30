"use client";

import { ColumnDef } from "@tanstack/react-table";

import { IRentTypes } from "@/types/rent-types";
import RentOverviewActions from "@/components/tasks/table_actions/rent-management/rent-overview-action";



export const RentOverviewTableColumnSDcn: ColumnDef<IRentTypes>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      return (
        <span className="text-xs">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      );
    },
    filterFn: (row, columnId, filterValue) => {
        const date = new Date(row.getValue(columnId));
        return (
          date >= new Date(filterValue.from) && date <= new Date(filterValue.to)
        );
      },
  },
  {
    accessorKey: "sellerId.name",
    header: "Store Name",
  },
  {
    accessorKey: "volume",
    header: "Space (m³)",
  },
  // {
  //   accessorKey: "requestedDays",
  //   header: "Days",
  //   cell: ({ row }) => {
  //     const endDate = new Date(row.original.endDate);
  //     const currentDate = new Date();
  
  //     const currentDateOnly = new Date(
  //       currentDate.getFullYear(),
  //       currentDate.getMonth(),
  //       currentDate.getDate()
  //     );
  //     const endDateOnly = new Date(
  //       endDate.getFullYear(),
  //       endDate.getMonth(),
  //       endDate.getDate()
  //     );
  
  //     const diffInMs = currentDateOnly.getTime() - endDateOnly.getTime();
  //     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  //     let label = "";
  //     let labelColor = "";
  
  //     if (diffInDays > 0) {
  //       label = `${diffInDays} Days Overdue`;
  //       labelColor = "text-red-500";
  //     } else if (diffInDays === 0) {
  //       label = "Expired";
  //       labelColor = "text-red-600 font-semibold";
  //     } else if (Math.abs(diffInDays) <= 5) {
  //       label = "Expiring Soon";
  //       labelColor = "text-yellow-500 font-medium";
  //     } else {
  //       label = `${Math.abs(diffInDays)} Days Left`;
  //       labelColor = "text-green-600";
  //     }
  
  //     return <span className={`text-xs ${labelColor}`}>{label}</span>;
  //   },
  // },
  {
    header: "Days Left",
    cell: ({ row }) => {
      const endDate = new Date(row.original.endDate);
      const currentDate = new Date();
  
      const currentDateOnly = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const endDateOnly = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );
  
      const diffInMs = endDateOnly.getTime() - currentDateOnly.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      let label = "";
      let labelClass = "";
      const number = Math.abs(diffInDays);
  
      if (diffInDays < 0) {
        label = "Overdue";
        labelClass = "bg-red-100 text-red-600";
      } else if (diffInDays === 0) {
        label = "Expired";
        labelClass = "bg-red-200 text-red-800";
      } else if (diffInDays <= 5) {
        label = "Expiring Soon";
        labelClass = "bg-yellow-100 text-yellow-600";
      } else {
        label = "Days Left";
        labelClass = "bg-green-100 text-green-600";
      }
  
      return (
        <span className="text-xs font-medium flex items-center gap-2">
          <span className="text-black">{number}</span>
          <span
            className={`text-[10px] px-2 py-[2px] rounded-md ${labelClass}`}
          >
            {label}
          </span>
        </span>
      );
    },
  },
  
  {
    accessorKey: "totalPrice",
    header: "Amount Paid",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      const status = cell.getValue<string>();
      const statusStyles: Record<string, string> = {
        pending: "text-yellow-500",
        approved: "text-green-500",
        active: "text-blue-500",
        expired: "text-red-500",
        rejected: "text-red-500",
        cancelled: "text-gray-500",
        vacate_requested: "text-orange-500",
        vacated: "text-purple-500",
        vacate_rejected: "text-red-500",
      };
      return (
        <span className={`font-bold ${statusStyles[status] || "text-gray-700"}`}>
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black "></div>,
    cell: () => {
      // const data = row.original;
      return (
        <div className="relative flex justify-end gap-3">
           <RentOverviewActions />

          {/* <OrderReturnAction order={order} /> */}
          {/* Additional action logic can go here */}
        </div>
      );
    },
  },
];
