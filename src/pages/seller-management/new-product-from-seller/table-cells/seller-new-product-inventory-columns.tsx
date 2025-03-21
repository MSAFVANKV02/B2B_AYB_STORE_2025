
import { IProducts, IProductStatus } from "@/types/productType";
import { TableColumn } from "react-data-table-component";


// import { ActionsCellRenderer } from "./RenderAction_Cell";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/global/image";
import ActionsCellRenderer from "./ActionsCellRenderer";
export const SELLER_NEW_PRODUCT_INVENTORY_COLUMNS = (
  refetch: () => void
): TableColumn<IProducts>[] => [
  // {
  //     name: " ",
  //     selector: row => row._id || "",  // Just a placeholder, does not affect functionality
      // width: "50px",
  //     center: true,
  //     omit: false,  // Ensure it is not omitted
  //   },
  {
    name: "Product Name",
    cell: (row) => {
      const variations = row.variations ?? [];

      
        const allSizes =
        Array.from(
          new Set(
            variations.flatMap((variant) =>
              (variant.details ?? []).map((detail) => detail.size)
            )
          )
        ).join(", ") || "No sizes available";

      const allColors = variations
        .map((variant: any) => variant.colorName)
        .join(", ");

      return (
        <div className="flex gap-2 items-center py-3">
          <Image
            src={row.thumbnails[0]}
            alt="product-thumbnails"
            className="w-14 h-11 rounded-md"
          />

          <div className="flex flex-col gap-1 items-start w-full overflow-hidden">
            <div className="w-full truncate flex items-center">
              <b>Name: </b>
              <span>{row.product_name || ""}</span>
            </div>
            {/* === */}
            <div className="w-full truncate flex items-center">
              <b>Brand: </b>
              <span>{row.brand?.name || ""}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Min-Qty: </b>
              <span>{row.minimum_quantity}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Sizes :</b>
              <span>{allSizes}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Colors :</b>
              <span>{allColors}</span>
            </div>
          </div>
        </div>
      );
    },

    sortable: true,
    grow: 1, // Makes this column take up more space
    // width: "250px",
  },
  {
    name: "Status",
    cell: (row) => {
      const statusClasses: Record<IProductStatus, string> = {
        pending:
          "bg-yellow-100 text-yellow-800 border border-yellow-400 hover:bg-transparent",
        approved:
          "bg-green-100 text-green-800 border border-green-400 hover:bg-transparent",
        hold: "bg-gray-100 text-gray-800 border border-gray-400 hover:bg-transparent",
        rejected:
          "bg-red-100 text-red-800 border border-red-400 hover:bg-transparent",
      };

      return (
        <Badge
          className={`${
            statusClasses[row.status] ||
            "bg-gray-100 text-gray-800 border border-gray-400 "
          }`}
        >
          {row.status}
        </Badge>
      );
    },
    grow: 1,
    // width: "150px",
  },
  {
    name: "Base Price",
    selector: (row) => `₹${row.basePrice ?? 0}`,
    grow: 1,
    // width: "150px",
  },
  {
    name: "Sample Price",
    selector: (row) => `₹${row.samplePrice ?? 0}`,
    grow: 1,
    // width: "150px",
  },
  {
    name: "MRP",
    selector: (row) => row.mrp ?? 0,
    grow: 1,
    // width: "150px",
  },

  {
    name: "Actions",
    cell: (row) => (
      <>
        <ActionsCellRenderer data={row} refetch={refetch} />
        {/* <StoreProductStockRequests data={row} /> */}
      </>
    ),
    // ignoreRowClick: true,
    allowOverflow: true,
    // button: true,
    grow: 1,
  },
];
