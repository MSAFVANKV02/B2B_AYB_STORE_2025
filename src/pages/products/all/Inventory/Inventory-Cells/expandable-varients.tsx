import { IProducts, IVariants } from "@/types/productType";

export const ExpandableRowComponent = ({ data }: { data: IProducts }) => {
  return (
    <div className="p-4 bg-gray-50 rounded">
      <h3 className="text-lg font-semibold">Variations</h3>
      {data.variations && data.variations.length > 0 ? (
        data.variations.map((variation, index) => (
          <div key={index} className="border-b border-gray- py-2 ">
            <div className="flex flex-col gap-3 my-6">
              <div className="space-x-2 flex ">
                <span className="font-[500]   text-[16px]">Color Name :</span>
                <div className="space-x-3">
                  {""}
                 <span> {variation.colorName}</span>
                  <div
                style={{
                  width:"12px",
                  backgroundColor: variation.colorCode,
                  borderRadius: "50%",
                  display: "inline-block",
                  height: "12px",
                }}
               />
                </div>
               
              </div>
              {/* ==== */}
              <div className="space-x-2  flex ">
                <span className="font-[500] text-[16px]">Color Code :</span>
                <span>
                  {""}
                  {variation.colorCode}
                </span>
              
              </div>
              {/* ======== */}
              <div className="space-x-2  flex ">
                <span className="font-[500] text-[16px]">Sample :</span>
                <span>
                  {""}
                  {variation.sample ? "Yes" : "No"}
                </span>
              </div>
              {/* =========================== */}
            </div>
            <h4 className="text-md font-semibold mt-2">Details:</h4>
            {variation.details && variation.details.length > 0 ? (
              <table className="w-full border border-gray- mt-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-1">Size</th>
                    <th className="border px-2 py-1">Stock</th>
                    <th className="border px-2 py-1">Bundle Qty</th>
                    <th className="border px-2 py-1">Selling Price</th>
                    <th className="border px-2 py-1">SKU ID</th>
                  </tr>
                </thead>
                <tbody>
                  {variation.details.map((detail: IVariants, i) => (
                    <tr key={i} className="border bg-[#ffff]">
                      <td className="border px-2 py-1">{detail.size}</td>
                      <td className="border px-2 py-1">{detail.stock}</td>
                      <td className="border px-2 py-1">
                        {detail.bundleQuantity}
                      </td>

                      <td className="border px-2 py-1">
                        ₹{detail.selling_price}
                      </td>
                      <td className="border px-2 py-1">{detail.skuId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-500">No details available</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No variations available</p>
      )}
    </div>
  );
};
