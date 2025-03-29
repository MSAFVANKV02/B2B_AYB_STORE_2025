import React, { useState } from "react";

const variants = [
  {
    name: "Grey",
    image: "https://via.placeholder.com/50x50?text=Grey", // Replace with actual image URLs
    stock: [
      { size: "S", available: 1, transfer: 0 },
      { size: "M", available: 1, transfer: 0 },
      { size: "L", available: 1, transfer: 0 },
      { size: "XL", available: 1, transfer: 0 },
    ],
  },
  {
    name: "White",
    image: "https://via.placeholder.com/50x50?text=White",
    stock: [
      { size: "S", available: 1, transfer: 0 },
      { size: "M", available: 1, transfer: 0 },
      { size: "L", available: 1, transfer: 0 },
      { size: "XL", available: 1, transfer: 0 },
    ],
  },
  {
    name: "Red",
    image: "https://via.placeholder.com/50x50?text=Red",
    stock: [
      { size: "S", available: 1, transfer: 0 },
      { size: "M", available: 1, transfer: 0 },
      { size: "L", available: 1, transfer: 0 },
      { size: "XL", available: 1, transfer: 0 },
    ],
  },
  {
    name: "Green",
    image: "https://via.placeholder.com/50x50?text=Green",
    stock: [
      { size: "S", available: 1, transfer: 0 },
      { size: "M", available: 1, transfer: 0 },
      { size: "L", available: 1, transfer: 0 },
      { size: "XL", available: 1, transfer: 0 },
    ],
  },
];

const ProductTransferTable = () => {
  const [data, setData] = useState(variants);

  const handleTransferChange = (variantIndex:number, stockIndex:number, amount:number) => {
    const newData = [...data];
    const currentStock = newData[variantIndex].stock[stockIndex];
    currentStock.transfer = Math.max(
      0,
      Math.min(currentStock.available, currentStock.transfer + amount)
    );
    setData(newData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="">
            <th className="border border-gray-300 text-xs text-textGray select-none px-4 py-4 text-left">Variant</th>
            <th className="border border-gray-300 text-xs text-textGray select-none px-4 py-4 text-left">Size</th>
            <th className="border border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
              Available Stock
            </th>
            <th className="border border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
              Transfer Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((variant, variantIndex) => (
            <React.Fragment key={variant.name}>
              {variant.stock.map((stock, stockIndex) => (
                <tr key={`${variant.name}-${stock.size}`}>
                  {stockIndex === 0 && (
                    <td
                      rowSpan={variant.stock.length}
                      className="border border-gray-300 px-4 py-1 text-center"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="w-8 h-8 rounded-md text-xs"
                        />
                        <span>{variant.name}</span>
                      </div>
                    </td>
                  )}
                  <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                    {stock.size}
                  </td>
                  <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                    {stock.available}
                  </td>
                  <td className="border border-gray-300 text-xs px-4 py-1 text-center ">
                    <div className="flex justify-between items-center gap-2 border w-1/2 float-end p-1 rounded-md border-textSoft">
                      <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        disabled={stock.transfer <= 0}
                        onClick={() =>
                          handleTransferChange(variantIndex, stockIndex, -1)
                        }
                      >
                        -
                      </button>
                      <span>{stock.transfer}</span>
                      <button
                        className="px-2 py-1 border text-textMain rounded disabled:opacity-50"
                        disabled={stock.transfer >= stock.available}
                        onClick={() =>
                          handleTransferChange(variantIndex, stockIndex, 1)
                        }
                      >
                        +
                      </button>
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

export default ProductTransferTable;
