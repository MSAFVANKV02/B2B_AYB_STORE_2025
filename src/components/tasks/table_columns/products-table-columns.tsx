"use client";

import { MySwitch } from "@/components/myUi/mySwitch";
import { IProducts } from "@/types/productType";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../task_components/data-table-column-header";
import AllProductsActionModal from "../table_actions/All_Products_Action_Modal";

// import { DataTableColumnHeader } from "../task_components/data-table-column-header";

export const ProductTableColumns: ColumnDef<IProducts>[] = [
  {
    accessorKey: "product_name",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      const allSizes = product.variations
        .map((variant: any) =>
          variant.details.map((detail: any) => detail.size).join(", ")
        )
        .join(", ");
      const allColors = product.variations
        .map((variant: any) => variant.colorName)
        .join(", ");

      return (
        <div className="flex items-start gap-4">
          <img
            src={`${product?.gallery_image || ""}`}
            alt={product.product_name}
            width={50}
            height={50}
            className="object-cover rounded text-xs"
          />
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{product.product_name}</div>
            <div className="text-xs text-gray-500">
              <b>Brand:</b> {product.brand || "N/A"}
            </div>
            <div className="text-xs text-gray-500">
              <b>product_weight:</b> {product.product_weight} gm
            </div>
            <div className="text-xs text-gray-500">
              <b>Min. Order:</b> {product.minimum_quantity} pieces
            </div>
            <div className="text-xs text-gray-500">
              <b>Sizes:</b> {allSizes}
            </div>
            <div className="text-xs text-gray-500">
              <b>Added By:</b> {product.product_owner}{" "}
            </div>
            <div className="text-xs text-gray-500">
              <b>Colors:</b> {allColors}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "variations",
    // header: "Variants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variants" />
    ),
    cell: ({ row }) => {
      const variations = row.original.variations;
      return (
        <div>
          {variations.map((variant: any) => (
            <div key={variant.colorName} className="flex items- flex-col gap-5 justify-start">
           
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-200">
                <img src={`${variant.image}`} alt="" className="w-full h-full mb-4 bg-gray-400 object-cover" />
                </div>
             
              <span className="text-sm">{variant.colorName}</span>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalStock",
    // header: "Total Stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Stock" />
    ),
    cell: ({ row }) => {
      const variations = row.original.variations;
      //   const totalStock = row.original.variations.reduce(
      //     (acc: number, variant: any) =>
      //       acc +
      //       variant.details.reduce((sum: number, detail: any) => sum + detail.stock, 0),
      //     0
      //   );
      return (
        <div className="">
          {variations.map((variant: any) => (
            <div key={variant.colorName} className="flex items-center gap-2 w-8 h-8 mb-3">
              {variant.details.map((detail: any) => (
                <div key={detail._id}>
                  {detail.size}-{detail.stock},
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    // header: "Discount",
    header: () => <div className="font-bold text-black">Discount</div>,
    cell: ({ row }) => {
      return <span className=" w-8 h-8 mb-3 flex items-center">${row.original.discount}</span>;
    },
  },
  {
    accessorKey: "selling_price",
    // header: "Selling Price",
    header: () => <div className="font-bold text-black">Selling Price</div>,
    cell: ({ row }) => {
      return <span className="gap-2 w-8 h-8 mb-3 flex items-center">${row.original.base_price}</span>;
    },
  },
  {
    accessorKey: "price_per_pieces",
    // header: "Price / Pieces",
    header: () => <div className="font-bold text-black">Piece / Pieces</div>,
    cell: ({ row }) => {
      const prices = row.original.price_per_pieces;
      return (
        <div className="text-sm">
          {prices.map((price: any) => (
            <div key={price._id}>
              <div className="flex items-center gap-2">
                <span className="span">{price.min_Piece}</span>-
                <span className="span">{price.max_Piece} pieces</span>
              </div>
              ${price.discount}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "sample_price",
    // header: "Sample Price",
    header: () => <div className="font-bold text-black">Sample Price</div>,
    cell: ({ row }) => <span>${row.original.sample_price}</span>,
  },
  {
    accessorKey: "priceMRP",
    // header: "Price (MRP)",
    header: () => <div className="font-bold text-black">Price (MRP)</div>,
    cell: ({ row }) => <span>${row.original.mrp}</span>,
  },
  {
    accessorKey: "is_todays_deal",
    // header: "Today's Deal",
    header: () => <div className="font-bold text-black">Today's Deal</div>,
    cell: ({ row }) => (
      <MySwitch
        isOn={!row.original.is_todays_deal}
        id="is_todays_deal"
        handleToggle={() => {
          console.log("toggled");
          //  row.original.status =!row.original.status;
        }}
      />
    ),
  },
  {
    accessorKey: "is_published",
    // header: "is_published",
    header: () => <div className="font-bold text-black">published</div>,
    cell: ({ row }) => (
      <MySwitch
        isOn={!row.original.is_published}
        id="is_published"
        handleToggle={() => {
          console.log("toggled");
          //  row.original.status =!row.original.status;
        }}
      />
    ),
  },
  {
    accessorKey: "is_featured_product",
    // header: "is_featured_product",
    header: () => <div className="font-bold text-black">featured</div>,
    cell: ({ row }) => (
      <MySwitch
        isOn={!row.original.is_featured_product}
        id="is_featured_product"
        handleToggle={() => {
          console.log("toggled");
          //  row.original.status =!row.original.status;
        }}
      />
    ),
  },
  {
    accessorKey: "status",
    // header: "Status",
    header: () => <div className="font-bold text-black">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      return <span className={`px-2 py-1 rounded `}>{status}</span>;
    },
  },
  {
    accessorKey: "actions",
    // header: "Actions",
    header: () => <div className="font-bold text-black"></div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="relative">
          <AllProductsActionModal product={product} />

          {/* Add menu logic here */}
        </div>
      );
    },
  },
];
