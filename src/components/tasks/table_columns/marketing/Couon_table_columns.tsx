import { ColumnDef } from "@tanstack/react-table";
import { ICouponType } from "@/types/ICouponTypes";
import CouponColumnAction from "@/pages/marketing/copon/coupon_cells/Coupon_Column_Action";

// Define the columns for the coupon table
export const CouponTableColumn: ColumnDef<ICouponType>[] = [
  {
    accessorKey: "coupon_code",
    header: () => (
      <div className="font-bold  max-w-32">Coupon Code</div>
    ),
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "discount_type",
    header: () => (
      <div className="font-bold  max-w-32">Discount Type</div>
    ),
    cell: ({ row }) => <div>{row.original.discountType}</div>,
  },
  {
    accessorKey: "discount_amount",
    header: () => (
      <div className="font-bold  max-w-32">Discount Amount</div>
    ),
    cell: ({ row }) => <div>{row.original.discountValue}</div>,
  },
  {
    accessorKey: "minimum_purchase_amount",
    header: () => (
      <div className="font-bold  max-w-32">Min Purchase Amount</div>
    ),
    cell: ({ row }) => <div>{row.original.minOrderAmount}</div>,
  },
  {
    accessorKey: "start_date",
    header: () => (
      <div className="font-bold  max-w-32">Start Date</div>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original.startDate).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "expired_at",
    header: () => (
      <div className="font-bold  max-w-32">Expiration Date</div>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original.expiryDate).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "is_active",
    header: () => (
      <div className="font-bold  max-w-32">Active Status</div>
    ),
    cell: ({ row }) => (
      <div>{row.original.isActive ? "Active" : "Inactive"}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold  max-w-32">Actions</div>,
    cell: ({ row }) => (
      <div className="relative flex justify-end">
        {/* Add buttons for actions such as edit, delete, etc. */}
        <CouponColumnAction data={row.original} />
      </div>
    ),
  },
];
