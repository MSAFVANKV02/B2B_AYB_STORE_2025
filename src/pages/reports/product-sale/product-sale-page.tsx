import DataTableReports from '@/components/tasks/task_components/report/data-table-reports';

export type ProductLocalType = {
    name: string;
    sku: string;
    price: number;
    stock: number;
    category: string;
    unitsSold: number;
    revenue: number;
    avgSalePerCustomer: number;
    returnRate: string;
    variants: {
      name: string;
      sku: string;
      price: number;
      stock: number;
    }[];
  };
  

const sampleData: ProductLocalType[] = [
    {
      name: "Product A",
      sku: "PA-001",
      price: 49.99,
      stock: 100,
      category: "Electronics",
      unitsSold: 1405,
      revenue: 142305,
      avgSalePerCustomer: 1232.3,
      returnRate: "7.5%",
      variants: [
        { name: "Grey", sku: "PA-001-GR", price: 50, stock: 20 },
        { name: "Red", sku: "PA-001-RD", price: 55, stock: 15 },
      ],
    },
    {
      name: "Product B",
      sku: "PB-001",
      price: 29.99,
      stock: 200,
      category: "Clothing",
      unitsSold: 1200,
      revenue: 119988,
      avgSalePerCustomer: 999.9,
      returnRate: "5.0%",
      variants: [
        { name: "Blue", sku: "PB-001-BL", price: 30, stock: 50 },
        { name: "Green", sku: "PB-001-GR", price: 35, stock: 30 },
      ],
    },
  ];
  
  

export default function ProductSalePage() {
  return (
    <div>
        <div className="p-4">
            <h1>Product sale</h1>
        </div>
        {/* ===== */}
        <div className="page-outer">
            <DataTableReports
            data={sampleData}
            />
        </div>
    </div>
  )
}




// import React, { useState } from "react";
// import { DataTable } from "@/components/tasks/task_components/data-table";
// import { ProductSalesTableColumn } from "@/components/tasks/table_columns/reports/product-sale-report-columns";

// type Props = {};

// export interface ProductLocalType {
//   name: string;
//   sku: string;
//   price: number;
//   stock: number;
//   category: string;
//   variants: {
//     name: string;
//     sku: string;
//     price: number;
//     stock: number;
//   }[];
// }

// const sampleData: ProductLocalType[] = [
//   {
//     name: "Product A",
//     sku: "PA-001",
//     price: 49.99,
//     stock: 100,
//     category: "Electronics",
//     variants: [
//       { name: "Variant 1", sku: "PA-001-V1", price: 50, stock: 20 },
//       { name: "Variant 2", sku: "PA-001-V2", price: 55, stock: 15 },
//     ],
//   },
//   {
//     name: "Product B",
//     sku: "PB-001",
//     price: 29.99,
//     stock: 200,
//     category: "Clothing",
//     variants: [
//       { name: "Variant 1", sku: "PB-001-V1", price: 30, stock: 50 },
//       { name: "Variant 2", sku: "PB-001-V2", price: 35, stock: 30 },
//     ],
//   },
// ];

// export default function ProductSalePage({}: Props) {
//   const [expandedRows, setExpandedRows] = useState<string[]>([]);

//   const toggleRow = (sku: string) => {
//     setExpandedRows((prev) =>
//       prev.includes(sku) ? prev.filter((row) => row !== sku) : [...prev, sku]
//     );
//   };

//   return (
//     <div>
//       <div className="p-4">
//         <h1>Product Sale</h1>
//       </div>
//       <div className="page-outer">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">Product Name</th>
//               <th className="p-2 border">SKU</th>
//               <th className="p-2 border">Price</th>
//               <th className="p-2 border">Stock</th>
//               <th className="p-2 border">Category</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sampleData.map((product) => (
//               <React.Fragment key={product.sku}>
//                 <tr>
//                   <td className="p-2 border">{product.name}</td>
//                   <td className="p-2 border">{product.sku}</td>
//                   <td className="p-2 border">${product.price.toFixed(2)}</td>
//                   <td className="p-2 border">{product.stock}</td>
//                   <td className="p-2 border">{product.category}</td>
//                   <td className="p-2 border">
//                     <button
//                       onClick={() => toggleRow(product.sku)}
//                       className="text-blue-500"
//                     >
//                       {expandedRows.includes(product.sku)
//                         ? "Hide Variants"
//                         : "Show Variants"}
//                     </button>
//                   </td>
//                 </tr>
//                 {expandedRows.includes(product.sku) && (
//                   <tr>
//                     <td colSpan={6} className="p-2 border bg-gray-50">
//                       <div>
//                         <div className="grid grid-cols-4 font-bold text-sm mb-2">
//                           <span>Name</span>
//                           <span>SKU</span>
//                           <span>Price</span>
//                           <span>Stock</span>
//                         </div>
//                         {product.variants.map((variant, index) => (
//                           <div
//                             key={index}
//                             className="grid grid-cols-4 text-sm border-b py-1"
//                           >
//                             <span>{variant.name}</span>
//                             <span>{variant.sku}</span>
//                             <span>${variant.price.toFixed(2)}</span>
//                             <span>{variant.stock}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
