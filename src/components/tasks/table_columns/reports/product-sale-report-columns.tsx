"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface ProductLocalType {
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  variants: {
    name: string;
    sku: string;
    price: number;
    stock: number;
  }[];
}

export const ProductSalesTableColumn: ColumnDef<ProductLocalType>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-black max-w-32">Product Name</div>,
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "sku",
    header: () => <div className="font-bold text-black max-w-32">SKU</div>,
    cell: ({ row }) => <div>{row.original.sku}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="font-bold text-black max-w-32">Price</div>,
    cell: ({ row }) => <div>${row.original.price.toFixed(2)}</div>,
  },
  {
    accessorKey: "stock",
    header: () => <div className="font-bold text-black max-w-32">Stock</div>,
    cell: ({ row }) => <div>{row.original.stock}</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="font-bold text-black max-w-32">Category</div>,
    cell: ({ row }) => <div>{row.original.category}</div>,
  },
  {
    accessorKey: "variants",
    header: () => <div className="font-bold text-black max-w-32">Variants</div>,
    cell: ({ row }) => {
      const variants = row.original.variants;
      return (
        <Accordion type="single" collapsible>
          <AccordionItem value="variant-details">
            <AccordionTrigger className="font-medium text-blue-500">
              View Variants
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-2 space-y-2 border-t">
                <div className="flex justify-between font-bold text-sm">
                  <span>Name</span>
                  <span>SKU</span>
                  <span>Price</span>
                  <span>Stock</span>
                </div>
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2 text-sm"
                  >
                    <span>{variant.name}</span>
                    <span>{variant.sku}</span>
                    <span>${variant.price.toFixed(2)}</span>
                    <span>{variant.stock}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold text-black max-w-32">Options</div>,
    cell: () => {
      return (
        <div className="relative flex justify-end">
          {/* Add custom actions here */}
        </div>
      );
    },
  },
];
