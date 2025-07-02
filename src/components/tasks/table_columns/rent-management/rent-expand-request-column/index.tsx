import RentExtentRequestAction from "@/components/tasks/table_actions/rent-management/rent-extent-action";
import { IRentTypes } from "@/types/rent-types";
import { ColumnDef } from "@tanstack/react-table";

export const RentExpandRequestTableColumnSDcn: ColumnDef<IRentTypes>[] = [
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
    header: "Seller Name",
  },
  {
    accessorKey: "extension.volume",
    header: "Space (m³)",
  },
  {
    accessorKey: "extension.action",
    header: "Volume Update",
  },
  {
    accessorKey: "extension.requestedDays",
    header: "Update Days",
  },
  {
    accessorKey: "extension.totalPrice",
    header: "Total Amount",
  },

  {
    accessorKey: "action",
    header: "",
    cell: ({row}) => (
      <div className="">
        <RentExtentRequestAction data={row.original} />
      </div>
    ),
  },
];
