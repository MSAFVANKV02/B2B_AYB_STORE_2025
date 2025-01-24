import { MySwitch } from "@/components/myUi/mySwitch";
import { IProducts } from "@/types/productType";
import React from "react";

type Props = {
  values: IProducts | null;
  setFieldValue: (field: string, value: any) => void;
};

export default function AllNewProductsTable({ values, setFieldValue }: Props) {
  return (
    <div className="lg:w-[86%] overflow-x-auto">
      <table className="table-auto w-full ">
        <thead>
          <tr className="">
            <th className="border rounded-tl-xl text-xs text-textGray px-4 py-4">
              Variant
            </th>
            <th className="border text-xs text-textGray px-4 py-2">Size</th>
            <th className="border text-xs text-textGray px-4 py-2">Stock</th>
            <th className="border text-xs text-textGray px-4 py-2">
              Discount (%)
            </th>
            {values?.selectWise === "bundle" && (
              <th className="border text-xs text-textGray px-4 py-2">
                Bundle Quantity
              </th>
            )}
            <th className="border text-xs text-textGray px-4 py-2">
              Selling Price
            </th>
            <th className="border text-xs text-textGray px-4 py-2">SKU ID</th>
            <th className="border text-xs text-textGray px-4 py-2">Sample</th>
          </tr>
        </thead>
        <tbody>
          {(values?.variations || []).map((variation, vIndex) => (
            <React.Fragment key={vIndex}>
              {(variation.details || []).map((variant, index) => (
                <tr key={`${vIndex}-${index}`} className="border text-xs">
                  {/* Display color and image for the first row only */}
                  {index === 0 && (
                    <td
                      className="border py-4 px-4 w-[250px] align-top"
                      rowSpan={variation.details?.length || 1}
                    >
                      <div className="flex items-center gap-2">
                        {variation.image && typeof variation.image === "string" ? (
                          <img
                            src={""}
                            alt="Variant"
                            className="w-7 h-7 object-cover rounded-sm"
                          />
                        ):(
                          <img
                          src={URL.createObjectURL(variation.image)??""}
                          alt="Variant"
                          className="w-7 h-7 object-cover rounded-sm"
                        />
                        )}
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{
                            backgroundColor: `${variation.colorCode}`,
                          }}
                        ></div>
                        <span className=" font-medium">
                          {variation.colorName}
                        </span>
                      </div>
                    </td>
                  )}
                  {/* Size */}
                  <td className="border px-4 py-1 text-center">
                    {variant.size || "N/A"}
                  </td>

                  {/* Stock */}
                  <td className="border px-4 py-1 text-center">
                    <input
                      type="number"
                      min="0"
                      className="w-full border rounded px-2 text-center py-2"
                      value={variant.stock || 0}
                      onChange={(e) =>
                        setFieldValue(
                          `variations[${vIndex}].details[${index}].stock`,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                    />
                  </td>

                  {/* Discount */}
                  <td className="border px-4 py-1 text-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full border rounded px-2 text-center py-2"
                      value={variant.discount || 0}
                      onChange={(e) =>
                        setFieldValue(
                          `variations[${vIndex}].details[${index}].discount`,
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </td>

                  {/* bundle quantity ========= */}
                  {values?.selectWise === "bundle" && (
                    <td className="border px-4 py-1 text-center">
                      <input
                        type="number"
                        min="0"
                        className="w-full border rounded px-2 text-center py-2"
                        value={variant.bundle_quantity || 0}
                        onChange={(e) =>
                          setFieldValue(
                            `variations[${vIndex}].details[${index}].bundle_quantity`,
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                  )}

                  {/* Selling Price */}
                  <td className="border px-4 py-1 text-center">
                    <input
                      type="number"
                      min="0"
                      className="w-full border rounded px-2 text-center py-2"
                      value={variant.selling_price || 0}
                      onChange={(e) =>
                        setFieldValue(
                          `variations[${vIndex}].details[${index}].selling_price`,
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </td>

                  {/* SKU ID */}
                  <td className="border px-4 py-1 text-center">
                    <input
                      type="text"
                      className="l border rounded min-w-[150px] w-full px-2 text-center py-2"
                      value={variant.skuId || ""}
                      placeholder="Sku here"
                      onChange={(e) =>
                        setFieldValue(
                          `variations[${vIndex}].details[${index}].skuId`,
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Sample Checkbox */}
                  {index === 0 && (
                    <td
                      className="border px-4 py-1 text-center align-top"
                      rowSpan={variation.details?.length || 1}
                    >
                      <MySwitch
                        isOn={variation.sample}
                        id={`sample-${vIndex}`}
                        handleToggle={() => {
                          setFieldValue(
                            `variations[${vIndex}].sample`,
                            !variation.sample
                          );
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// ===============================   below code is only show if size selected  ==================================
// import { MySwitch } from "@/components/myUi/mySwitch";
// import { IProducts } from "@/types/productType";
// import React from "react";

// type Props = {
//   values: IProducts;
//   setFieldValue: (field: string, value: any) => void;
// };

// export default function AllNewProductsTable({ values, setFieldValue }: Props) {
//   return (
//     <div className="lg:w-[86%] overflow-x-auto">
//       <table className="table-auto w-full">
//         <thead>
//           <tr className="">
//             <th className="border rounded-tl-xl text-xs text-textGray px-4 py-4">Variant</th>
//             <th className="border text-xs text-textGray px-4 py-2">Size</th>
//             <th className="border text-xs text-textGray px-4 py-2">Stock</th>
//             <th className="border text-xs text-textGray px-4 py-2">Discount (%)</th>
//             <th className="border text-xs text-textGray px-4 py-2">Selling Price</th>
//             <th className="border text-xs text-textGray px-4 py-2">SKU ID</th>
//             <th className="border text-xs text-textGray px-4 py-2">Sample</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(values.variations || []).map((variation, vIndex) => (
//             <React.Fragment key={vIndex}>
//               {(variation.details || []).map((variant, index) => {
//                 // Skip rendering if the size is empty
//                 if (!variant.size) return null;

//                 return (
//                   <tr key={`${vIndex}-${index}`} className="border text-xs">
//                     {/* Display color and image for the first row only */}
//                     {index === 0 && (
//                       <td
//                         className="border py-4 px-4 w-[250px] align-top"
//                         rowSpan={variation.details?.length || 1}
//                       >
//                         <div className="flex items-center gap-2">
//                           {variation.image && (
//                             <img
//                               src={URL.createObjectURL(variation.image)}
//                               alt="Variant"
//                               className="w-7 h-7 object-cover rounded-sm"
//                             />
//                           )}
//                           <div
//                             className="w-5 h-5 rounded-full"
//                             style={{
//                               backgroundColor: `${variation.colorCode}`,
//                             }}
//                           ></div>
//                           <span className=" font-medium">
//                             {variation.colorName}
//                           </span>
//                         </div>
//                       </td>
//                     )}
//                     {/* Size */}
//                     <td className="border px-4 py-1 text-center">
//                       {variant.size || "N/A"}
//                     </td>

//                     {/* Stock */}
//                     <td className="border px-4 py-1 text-center">
//                       <input
//                         type="number"
//                         min="0"
//                         className="w-full border rounded px-2 text-center py-2"
//                         value={variant.stock || 0}
//                         onChange={(e) =>
//                           setFieldValue(
//                             `variations[${vIndex}].details[${index}].stock`,
//                             parseInt(e.target.value, 10) || 0
//                           )
//                         }
//                       />
//                     </td>

//                     {/* Discount */}
//                     <td className="border px-4 py-1 text-center">
//                       <input
//                         type="number"
//                         min="0"
//                         max="100"
//                         className="w-full border rounded px-2 text-center py-2"
//                         value={variant.discount || 0}
//                         onChange={(e) =>
//                           setFieldValue(
//                             `variations[${vIndex}].details[${index}].discount`,
//                             parseFloat(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </td>

//                     {/* Selling Price */}
//                     <td className="border px-4 py-1 text-center">
//                       <input
//                         type="number"
//                         min="0"
//                         className="w-full border rounded px-2 text-center py-2"
//                         value={variant.selling_price || 0}
//                         onChange={(e) =>
//                           setFieldValue(
//                             `variations[${vIndex}].details[${index}].selling_price`,
//                             parseFloat(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </td>

//                     {/* SKU ID */}
//                     <td className="border px-4 py-1 text-center">
//                       <input
//                         type="text"
//                         className="w-full border rounded px-2 text-center py-2"
//                         value={variant.skuId || ""}
//                         onChange={(e) =>
//                           setFieldValue(
//                             `variations[${vIndex}].details[${index}].skuId`,
//                             e.target.value
//                           )
//                         }
//                       />
//                     </td>

//                     {/* Sample Checkbox */}
//                     {index === 0 && (
//                       <td
//                         className="border px-4 py-1 text-center align-top"
//                         rowSpan={variation.details?.length || 1}
//                       >
//                         <MySwitch
//                           isOn={variation.sample}
//                           id={`sample-${vIndex}`}
//                           handleToggle={() => {
//                             setFieldValue(
//                               `variations[${vIndex}].sample`,
//                               !variation.sample
//                             );
//                           }}
//                         />
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
