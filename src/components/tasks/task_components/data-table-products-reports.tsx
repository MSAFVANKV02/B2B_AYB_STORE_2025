// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ProductLocalType } from "../table_columns/reports/product-sale-report-columns";
// import React, { useState } from "react";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
//   } from "@/components/ui/accordion"

// type Props = {
//     data: ProductLocalType[];

// };

// export default function DataTableProductsReports({data}: Props) {
//     const [openRows, setOpenRows] = useState<Set<number>>(new Set());

//     const toggleAccordion = (productIndex: number) => {
//       const newOpenRows = new Set(openRows);
//       if (newOpenRows.has(productIndex)) {
//         newOpenRows.delete(productIndex);
//       } else {
//         newOpenRows.add(productIndex);
//       }
//       setOpenRows(newOpenRows);
//     };
//   return (
//     <div>
//       <Table>
//         <TableCaption>Product Sale Report</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Product</TableHead>
//             <TableHead>SKU</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Stock</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>action</TableHead>

//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((product, productIndex) => (
//             <React.Fragment key={productIndex}>
//               {/* Product Row */}
//               <TableRow
//                 className="bg-gray-100 cursor-pointer"

//               >
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.sku}</TableCell>
//                 <TableCell>${product.price.toFixed(2)}</TableCell>
//                 <TableCell>{product.stock}</TableCell>
//                 <TableCell >{product.category}</TableCell>
//                 <TableCell   onClick={() => toggleAccordion(productIndex)}>=</TableCell>

//               </TableRow>

//               {/* Variant Rows (Accordion) */}
//               {openRows.has(productIndex) &&
//                 product.variants.map((variant, variantIndex) => (
//                   <TableRow
//                     key={`${productIndex}-${variantIndex}`}
//                     className="bg-white"
//                   >
//                     <TableCell className="pl-8">
//                       Variant: {variant.name}
//                     </TableCell>
//                     <TableCell>{variant.sku}</TableCell>
//                     <TableCell>${variant.price.toFixed(2)}</TableCell>
//                     <TableCell>{variant.stock}</TableCell>
//                     <TableCell>-</TableCell>
//                   </TableRow>
//                 ))}
//             </React.Fragment>
//           ))}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={5}>Total</TableCell>
//             <TableCell className="text-right">$2,500.00</TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// }

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { ProductLocalType } from "@/pages/reports/product-sale/product-sale-page";

type Props = {
  data: ProductLocalType[];
};

export default function DataTableProductsReports({ data }: Props) {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const toggleAccordion = (productIndex: number) => {
    setOpenRow(openRow === productIndex ? null : productIndex);
  };

  return (
    <div>
      <Table>
        <TableCaption>Product Sale Report</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>

            <TableHead className="w-[250px]">Product Name</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Unit Sold</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Average Sale / Customer</TableHead>
            <TableHead className="">Return Rate</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product, productIndex) => (
            <React.Fragment key={productIndex}>
              {/* Product Row */}
              <TableRow className="bg-gray-100 ">
                {/* 1 */}
                <TableCell className=" ">{productIndex + 1}</TableCell>
                {/* 2 */}
                <TableCell className="flex w-[250px]">
                  <img
                    src="/img/products/image 75.png"
                    className="w-14 h-14"
                    alt="product sale"
                  />
                  <div className="text-xs flex flex-col">
                    <span>{product.name}</span>
                    <div>
                      <b>Size: </b>
                      <span>X,L,SM</span>
                    </div>
                    <div>
                      <b>Color: </b>
                      <span>Gray, Red, Green</span>
                    </div>
                  </div>
                </TableCell>
                {/* 3 */}
                <TableCell>Store {productIndex + 1}</TableCell>
                {/* 4 */}
                <TableCell>{product.unitsSold}</TableCell>
                {/* 5 */}
                <TableCell>${product.revenue}</TableCell>
                {/* 6 */}
                <TableCell>{product.avgSalePerCustomer}</TableCell>
                {/* 7 */}
                <TableCell>{product.returnRate}</TableCell>
                {/* 8 */}
                <TableCell>
                 <div className="">
                 <IconButton
                    onClick={() => toggleAccordion(productIndex)}
                    aria-label="toggle details"
                  >
                    {openRow === productIndex ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                 </div>
                </TableCell>
              </TableRow>

              {/* Variant Rows (Accordion) */}
              <TableRow>
                <TableCell colSpan={8} style={{ padding: 0 }}>
                  <Collapse
                    in={openRow === productIndex}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Table>
                      <TableBody>
                        {product.variants.map((variant, variantIndex) => (
                          <TableRow
                            key={`${productIndex}-${variantIndex}`}
                            className="bg-white"
                          >
                            {/* 1 */}
                            <TableCell className="w-[60px]"></TableCell>

                            {/* 2 */}
                            <TableCell className="flex">
                              <img
                                src="/img/products/Group 710.jpg"
                                className="w-9 h-9"
                                alt="product sale"
                              />
                              {variant.name}
                            </TableCell>
                            {/* 3 */}
                            <TableCell className="w-[px]"></TableCell>

                            {/* 4 */}
                            <TableCell>S-{variant.stock},</TableCell>

                            {/* 5 */}
                            <TableCell>${product.revenue}</TableCell>
                            {/* 6 */}
                            <TableCell>{product.avgSalePerCustomer}</TableCell>
                            {/* 7 */}
                            <TableCell>${product.returnRate}%</TableCell>
                            {/* 8 */}
                            <TableCell></TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
