import { Input } from '@/components/ui/input';
import { IProducts } from '@/types/productType'
import { Field } from 'formik';
import React from 'react';
import { IRequestProductType } from '@/services/products/type';


type Props = {
    data: IProducts
    values: IRequestProductType;
    setFieldValue: any;
}

const StockVarianTable = ({data, values,setFieldValue}: Props) => {
  // console.log(data.variations[0]._id,'data');
  
  const handleQuantityChange = (
    quantity: number,
    variant: any,
    stock: any
  ) => {
    // console.log(variant,'variant');
    
    const updatedDetails = [...values.product_details];
  
    const productIndex = updatedDetails.findIndex(
      (item) => item.product === data._id
    );
  
    if (productIndex === -1) {
      updatedDetails.push({
        product: data._id ?? "", 
        variant_details: [
          {
            variant_name: variant.variant_name,
            variant_id: variant._id,
            image: variant.image,
            colorCode: variant.colorCode,
            colorName: variant.colorName,
            sample: variant.sample,
            size_details: [
              {
                size: stock.size,
                discount_type: data.discount_type || "flat",
                bundle_quantity: stock.bundleQuantity || 1,
                discount: stock.discount || 0,
                selling_price: stock.selling_price || 0,
                variant_sku: stock.skuId,
                stock: quantity,
              },
            ],
          },
        ],
      });
    } else {
      const variantIndex = updatedDetails[productIndex].variant_details.findIndex(
        (v) => v.colorCode === variant.colorCode
      );
  
      if (variantIndex === -1) {
        updatedDetails[productIndex].variant_details.push({
          variant_name: variant.variant_name,
          variant_id: variant._id,
          image: variant.image,
          colorCode: variant.colorCode,
          colorName: variant.colorName,
          sample: variant.sample,
          size_details: [
            {
              size: stock.size,
              discount_type: data.discount_type || "flat",
              bundle_quantity: stock.bundleQuantity || 1,
              discount: stock.discount || 0,
              selling_price: stock.selling_price || 0,
              variant_sku: stock.skuId,
              stock: quantity,
            },
          ],
        });
      } else {
        const sizeIndex = updatedDetails[productIndex].variant_details[
          variantIndex
        ].size_details.findIndex((s) => s.size === stock.size);
  
        if (sizeIndex === -1) {
          updatedDetails[productIndex].variant_details[variantIndex].size_details.push(
            {
              size: stock.size,
              discount_type: data.discount_type || "flat",
              bundle_quantity: stock.bundleQuantity || 1,
              discount: stock.discount || 0,
              selling_price: stock.selling_price || 0,
              variant_sku: stock.skuId,
              stock: quantity,
            }
          );
        } else {
          updatedDetails[productIndex].variant_details[variantIndex].size_details[
            sizeIndex
          ].stock = quantity;
  
          if (quantity === 0) {
            updatedDetails[productIndex].variant_details[
              variantIndex
            ].size_details.splice(sizeIndex, 1);
          }
        }
  
        if (updatedDetails[productIndex].variant_details[variantIndex].size_details.length === 0) {
          updatedDetails[productIndex].variant_details.splice(variantIndex, 1);
        }
      }
  
      if (updatedDetails[productIndex].variant_details.length === 0) {
        updatedDetails.splice(productIndex, 1);
      }
    }
  
    // ✅ Ensure the update is applied correctly
    setFieldValue("product_details", updatedDetails);
  };
  

  return (
    <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="">
          <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-left">Variant</th>
          <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-left">Size</th>
          <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
            Sku Id
          </th>
          <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
            Available Stock
          </th>
      
          <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
            Purchase Quantity*
          </th>
        </tr>
      </thead>
      <tbody>
        {data && data.variations.map((variant) => (
          <React.Fragment key={variant.colorCode}>
            {variant.details.map((stock, stockIndex) => (
              <tr key={`${data.product_name}-${stock.size}`}>
                {stockIndex === 0 && (
                  <td
                    rowSpan={variant.details.length}
                    className="border border-gray-300 px-4 py-1 text-center"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={variant.image}
                        alt={data.product_name}
                        className="w-8 h-8 rounded-md text-xs"
                      />
                      <span>{data.product_name}</span>
                    </div>
                  </td>
                )}
                <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                  {stock.size}
                </td>
                <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                  {stock.skuId}
                </td>
                <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                  {stock.stock}
                </td>
                <td className="border border-gray-300 text-xs px-4 py-1 text-center ">
                  <div className="flex justify-center ">
                   
                    {/* <span>{stock.transfer}</span> */}
                    <Field 
                    name="stock"
                    type="number"
                    placeholder="0"
                    className=" text-xs px-2 py-1 text-gray-900"
                    value={
                      values.product_details.find(p => p.product === data._id)?.variant_details
                        .find(v => v.colorCode === variant.colorCode)?.size_details
                        .find(s => s.size === stock.size)?.stock || 0 // Ensure it shows 0 if not set
                    }
                    // disabled={stock.transfer <= 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleQuantityChange(Number(e.target.value), variant, stock)
                    }
                    as={Input}
                    // value={`${values.product_details[index].variant_details[stockIndex].size_details}`}
                    />
                   
                  </div>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default StockVarianTable