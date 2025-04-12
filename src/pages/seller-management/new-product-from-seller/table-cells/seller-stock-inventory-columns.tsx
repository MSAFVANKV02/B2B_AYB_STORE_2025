import { TableColumn } from "react-data-table-component";

// import { ActionsCellRenderer } from "./RenderAction_Cell";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/global/image";

import { IStockStatusTypes, IStockType } from "@/types/stock_types";
import { StoreTypes } from "@/types/storeTypes";
import { IAdminTypes } from "@/types/adminUserTypes";
import ActionsCellRenderer from "./ActionsCellRenderer";
export const SELLER_STOCK_INVENTORY_COLUMNS = (): // refetch: () => void
TableColumn<IStockType>[] => [
  {
    name: "Product Name",
    cell: (row) => {
      console.log(row, "row");
      const isStore = "emailId" in row.destination; // StoreTypes has 'emailId'
      const isAdmin = "email" in row.destination;

      return (
        <div className="flex gap-2 items-center py-3">
          <Image
            src={row.product_details[0]?.product.thumbnails[0] || ""}
            alt="product-thumbnails"
            className="w-14 h-11 rounded-md"
          />

          <div className="flex flex-col gap-1 items-start w-full">
            {/* Product Name - Now breaks properly */}
            <div className="w-full flex items-center">
              <b>Name: </b>
              <span className="break-words whitespace-normal w-full">
                {row.destination?.name || ""}
              </span>
            </div>

            {/* Store Email (if Store) */}
            {isStore && (
              <div className="w-full flex justify-center gap-1 flex-col">
                <div className="flex items-center">
                  <b>Email: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.destination as StoreTypes).emailId}
                  </span>
                </div>
                {/* ------ */}
                <div className="flex items-center">
                  <b>Phone: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.destination as StoreTypes).phoneNumber}
                  </span>
                </div>
              </div>
            )}

            {/* Admin Email (if Admin) */}
            {isAdmin && (
              <div className="w-full flex justify-center gap-1 flex-col">
                <div className="flex items-center">
                  <b>Email: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.destination as IAdminTypes).email}
                  </span>
                </div>
                {/* ------ */}
                <div className="flex items-center">
                  <b>Phone: </b>
                  <span className="break-words whitespace-normal w-full">
                    {(row.destination as IAdminTypes).mobile}
                  </span>
                </div>
              </div>
            )}

            {/* Brand Name */}
            <div className="w-full flex items-center">
              <b>Brand: </b>
              <span className="break-words whitespace-normal w-full">
                {row.product_details[0]?.product.brand?.name || "N/A"}
              </span>
            </div>
          </div>
        </div>
      );
    },
    sortable: true,
    grow: 1,
    minWidth:"250px",
    // center: true,
  },
  {
    name: "Status",
    cell: (row) => {
      const statusClasses: Record<IStockStatusTypes, string> = {
        requested:
          "bg-yellow-100 text-yellow-800 border border-yellow-400 hover:bg-transparent",
        approved:
          "bg-green-100 text-green-800 border border-green-400 hover:bg-transparent",
        in_transit:
          "bg-blue-100 text-blue-800 border border-blue-400 hover:bg-transparent",
        received:
          "bg-pink-100 text-pink-800 border border-pink-400 hover:bg-transparent",
        outofstock:
          "bg-gray-100 text-gray-800 border border-gray-400 hover:bg-transparent",

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
    center: true,

    // width: "150px",
  },
  {
    name: "Base Price",
    selector: (row) => `₹${row.product_details[0]?.product.basePrice ?? 0}`,
    grow: 1,
    center: true,
  },
  {
    name: "Sample Price",
    selector: (row) => `₹${row.product_details[0]?.product.samplePrice ?? 0}`,
    grow: 1,
    center: true,
  },
  {
    name: "MRP",
    selector: (row) => `₹${row.product_details[0]?.product.mrp ?? 0}`,
    grow: 1,
    center: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <>
        <ActionsCellRenderer data={row} isProductList={false} />
        {/* <StoreProductStockRequests data={row} /> */}
      </>
    ),
    // ignoreRowClick: true,
    allowOverflow: true,
    // button: true,
    grow: 1,
  },
];
