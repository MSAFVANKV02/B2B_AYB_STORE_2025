import { IUserProps } from "@/types/adminUserTypes";
import { ColumnDef } from "@tanstack/react-table";


export const TopProductsColumn: ColumnDef<IUserProps>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
    cell: ({ row }) => <span className="span">{row.getValue("title")}</span>,
  },
  {
    accessorKey: "email",
    header: "Sales Qty",
    cell: ({ row }) => <span className="span">{row.getValue("email")}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopProductsTable={true}/>,
  // },
];
