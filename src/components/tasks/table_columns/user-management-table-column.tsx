import { IAdminTypes } from "@/types/adminUserTypes";
import { ColumnDef } from "@tanstack/react-table";
import AdminTableAction from "../table_actions/admins/admin-table-action";

export const UserManagementColumn: ColumnDef<IAdminTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="span">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="span">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="span capitalize">{row.getValue("role")}</span>
    ),
  },
  {
    accessorKey: "pages",
    header: "Accessible Pages",
    cell: ({ row }) => {
      const pages = row.getValue("pages") as string[]; // Assert that pages is a string array
      return (
        <>
          {row.original.role === "admin" ? (
            <div className="">
              <span className="text-xs text-textGray">All Pages Access</span>
            </div>
          ) : (
            <ul className="list-disc pl-4">
              {pages.map((page, index) => (
                <li key={index}>{page}</li>
              ))}
            </ul>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <AdminTableAction row={row.original} />
      </div>
    ),
  },
];
