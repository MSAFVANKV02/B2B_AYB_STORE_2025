import { ColumnDef } from "@tanstack/react-table";

import {  KycStatuses } from "../data/data";
import { DataTableColumnHeader } from "../task_components/data-table-column-header";
import { DataTableRowActionsDashboard } from "../table_actions/data-table-action-dashboard";
import { IUserProps } from "@/types/adminUserTypes";


// interface KycColumnProps {
//   isDashboard?: boolean; // optional prop for dashboard
// }

export const kycColumn: ColumnDef<IUserProps>[] = [
  // export const kycColumn = ({ isDashboard=true }: KycColumnProps): ColumnDef<IUserProps>[] => [
    {
      accessorKey: "kyc.businessName", // Corrected accessor to target nested property
      header: "Business Name",
      cell: ({ row }) => <span className="span">{row.original.kyc.businessName}</span>,
    },
    {
      accessorKey: "kyc.emailId", // Direct access to email
      header: "Email",
      cell: ({ row }) => <span className="span">{row.original.kyc.emailId}</span>,
    },
    {
      accessorKey: "user.mobile", // Direct access to mobile
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mobile" />
      ),
      cell: ({ row }) => <span className="span">{row.original.user.mobile}</span>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "user.kycStatus", // Corrected accessor to target nested property `status` inside `kyc`
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = KycStatuses.find(
          (status) => status.value === row.original.user.kycStatus // Access the nested status
        );
        if (!status) {
          return null;
        }
        return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span className="span">{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  {
    id: "actions",
    cell: ({ row }) =>
      <DataTableRowActionsDashboard row={row} type="kyc_dash_modal" />
    ,
  },
];
