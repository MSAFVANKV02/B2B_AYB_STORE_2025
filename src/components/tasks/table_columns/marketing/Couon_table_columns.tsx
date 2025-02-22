import { ColumnDef } from "@tanstack/react-table";
import { ICoupon } from "@/types/types"; // Make sure this path matches your project structure

// Define the columns for the coupon table
export const CouponTableColumn: ColumnDef<ICoupon>[] = [
  {
    accessorKey: "coupon_code",
    header: () => <div className="font-bold text-black max-w-32">Coupon Code</div>,
    cell: ({ row }) => <div>{row.original.coupon_code}</div>,
  },
  {
    accessorKey: "discount_type",
    header: () => <div className="font-bold text-black max-w-32">Discount Type</div>,
    cell: ({ row }) => <div>{row.original.discount_type}</div>,
  },
  {
    accessorKey: "discount_amount",
    header: () => <div className="font-bold text-black max-w-32">Discount Amount</div>,
    cell: ({ row }) => <div>{row.original.discount_amount}</div>,
  },
  {
    accessorKey: "minimum_purchase_amount",
    header: () => <div className="font-bold text-black max-w-32">Min Purchase Amount</div>,
    cell: ({ row }) => <div>{row.original.minimum_purchase_amount}</div>,
  },
  {
    accessorKey: "start_date",
    header: () => <div className="font-bold text-black max-w-32">Start Date</div>,
    cell: ({ row }) => <div>{new Date(row.original.start_date).toLocaleDateString()}</div>,
  },
  {
    accessorKey: "expired_at",
    header: () => <div className="font-bold text-black max-w-32">Expiration Date</div>,
    cell: ({ row }) => <div>{new Date(row.original.expired_at).toLocaleDateString()}</div>,
  },
  {
    accessorKey: "is_active",
    header: () => <div className="font-bold text-black max-w-32">Active Status</div>,
    cell: ({ row }) => <div>{row.original.is_active ? "Active" : "Inactive"}</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32">Actions</div>,
    cell: () => (
      <div className="relative flex justify-end">
        {/* Add buttons for actions such as edit, delete, etc. */}
        <button>Edit</button>
        <button>Delete</button>
      </div>
    ),
  },
];
