import RentOverviewActions from "@/components/tasks/table_actions/rent-management/rent-overview-action";
import { IRentTypes } from "@/types/rent-types";
import { ColumnDef } from "@tanstack/react-table";


export const RentOverviewTableColumnSDcn: ColumnDef<IRentTypes>[] = [
  {
    accessorKey: "seller_name",
    header: "Seller Name",
  },
  {
    accessorKey: "space_m3",
    header: "Space (m³)",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
  },
  {
    accessorKey: "days_remaining",
    header: "Days Remaining / Overdue",
    cell: ({ row }) => {
      const value = row.original.days_remaining;
      const isOverdue = value.toLowerCase().includes("overdue");
      return (
        <span className={isOverdue ? "text-red-600" : "text-black"}>
          {value}
        </span>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const isOverdue = status === "Overdue";
      return (
        <span className={`px-2 py-1 rounded text-xs text-white ${isOverdue ? "bg-red-600" : "bg-green-500"}`}>
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: () => (
      <div className="">
        <RentOverviewActions />
      </div>
    )
  }
];
