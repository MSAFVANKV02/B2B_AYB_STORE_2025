import { IProducts } from "@/types/productType";
import React from "react";



type IProps ={
  data?: IProducts
}



const StoreStockLocalTable = ({data}:IProps) => {
  // const [data] = useState(variants);

  console.log(data);
  



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
              Transfer Quantity
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
                    <div className="flex justify-center bg-gray-100 items-center gap-2 border w-1/2 float-end p-1 rounded-md ">
                     
                      {/* <span>{stock.transfer}</span> */}
                     
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreStockLocalTable;
