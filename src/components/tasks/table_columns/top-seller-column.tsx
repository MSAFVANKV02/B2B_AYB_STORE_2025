import { IUserProps } from "@/types/adminUserTypes";
import { ColumnDef } from "@tanstack/react-table";



export const TopSellerColumn: ColumnDef<IUserProps>[] = [
  {
    accessorKey: "title",
    header: "Seller Name",
    cell: ({ row }) => <span className="span">{row.getValue("title")}</span>,
  },
  {
    accessorKey: "email",
    header: "Sales quantity",
    cell: ({ row }) => <span className="span">{row.getValue("email")}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopSellerTable={true}/>,
  // },
];
