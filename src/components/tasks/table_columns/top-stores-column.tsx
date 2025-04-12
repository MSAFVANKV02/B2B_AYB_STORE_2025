import { IUserProps } from "@/types/adminUserTypes";
import { ColumnDef } from "@tanstack/react-table";



export const TopStoresColumn: ColumnDef<IUserProps>[] = [
  {
    accessorKey: "user.buildingName",
    header: "Product Name",
    cell: ({ row }) => <span className="span">{row.original.user.isBlocked}</span>,
  },
  {
    accessorKey: "user.emailId",
    header: "Orders",
    cell: ({ row }) => <span className="span">{row.original.user._id}</span>,
  },
  {
    accessorKey: "user.pinCode",
    header: "Total sales(₹)",
    cell: ({ row }) => <span className="span">{row.original.user.isRegistered}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopStoresTable={true}/>,
  // },
];
