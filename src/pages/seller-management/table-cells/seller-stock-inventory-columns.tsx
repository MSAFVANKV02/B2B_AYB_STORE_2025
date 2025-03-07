
import { TableColumn } from "react-data-table-component";

// import { ActionsCellRenderer } from "./RenderAction_Cell";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/global/image";

import { IStockType } from "@/types/stock_types";
export const SELLER_STOCK_INVENTORY_COLUMNS = (
  refetch: () => void
): TableColumn<IStockType>[] => [
  {
    name: "Product Name",
    cell: (row) => {
      console.log(row,'row');
      
      const productNames = row.product_details
        .map((product) => product.product.product_name)
        .join(", ");

      const allSizes = row.product_details
        .flatMap((product) =>
          product.variant_details.flatMap((variant) =>
            variant.size_details.map((size) => size.size)
          )
        )
        .join(", ");

      const allColors = row.product_details
        .flatMap((product) =>
          product.variant_details.map((variant) => variant.color)
        )
        .join(", ");

      return (
        <div className="flex gap-2 items-center py-3">
          <Image
            src={row.product_details[0]?.product.thumbnails[0] || ""}
            alt="product-thumbnails"
            className="w-14 h-11 rounded-md"
          />

          <div className="flex flex-col gap-1 items-start w-full overflow-hidden">
            <div className="w-full truncate flex items-center">
              <b>Name: </b>
              <span>{productNames || ""}</span>
            </div>
            <div className="w-full truncate flex items-center">
              <b>Brand: </b>
              <span>
                {row.product_details[0]?.product.brand?.name || "N/A"}
              </span>
            </div>
            <div className="w-full truncate flex items-center">
              <b>Sizes :</b>
              <span>{allSizes}</span>
            </div>
            <div className="w-full truncate flex items-center">
              <b>Colors :</b>
              <span>{allColors}</span>
            </div>
          </div>
        </div>
      );
    },
    sortable: true,
    width: "250px",
  },
  {
    name: "Status",
    cell: (row) => (
      <Badge className="bg-gray-100 text-gray-800 border border-gray-400">
        {row.status}
      </Badge>
    ),
    width: "150px",
  },
  {
    name: "Base Price",
    selector: (row) =>
      `₹${row.product_details[0]?.product.basePrice ?? 0}`,
    width: "150px",
  },
  {
    name: "Sample Price",
    selector: (row) =>
      `₹${row.product_details[0]?.product.samplePrice ?? 0}`,
    width: "150px",
  },
  {
    name: "MRP",
    selector: (row) => row.product_details[0]?.product.mrp ?? 0,
    width: "150px",
  },
];
