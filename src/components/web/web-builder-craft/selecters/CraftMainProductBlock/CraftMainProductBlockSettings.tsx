import { useNode } from "@craftjs/core";
import { getStorePurchasedProducts } from "@/actions/stocks/stockAction";
import { useQueryData } from "@/hooks/useQueryData";
import { IFinalProductTypes } from "@/types/final-product-types";
import React from "react";

const CraftMainProductBlockSettings = () => {
  const { setProp, props } = useNode((node) => ({
    props: node.data.props,
  }));

  const { data: fetchedProducts } = useQueryData(
    ["all-products", "template-section-02"],
    () => getStorePurchasedProducts()
  );

  let products: IFinalProductTypes[] = fetchedProducts?.data || [];


  // ✅ TEMPORARY DUPLICATION FOR TESTING — REMOVE AFTERWARDS
  if (products.length === 2) {
    const duplicated: IFinalProductTypes[] = [];

    for (let i = 0; i < 8; i++) {
      products.forEach((p, idx) => {
        duplicated.push({
          ...p,
          _id: `${p._id}-${i}-${idx}`, // fake unique ID
          product: {
            ...p.product,
            product_name: `${p.product.product_name} ${i + 1}`,
          },
        });
      });
    }

    products = duplicated;
  }
  // ✅ END TEMPORARY BLOCK

  const toggleProduct = (product: IFinalProductTypes) => {
    setProp((prop: any) => {
      const exists = prop.selectedProducts?.some((p: any) => p._id === product._id);
      prop.selectedProducts = exists
        ? prop.selectedProducts.filter((p: any) => p._id !== product._id)
        : [...(prop.selectedProducts || []), product];
    }, 100);
  };

  return (
    <div className="space-y-2 p-2">
      <h3 className="font-semibold text-sm">Select Products</h3>
      <div className="space-y-1 max-h-[300px] overflow-auto">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={() => toggleProduct(p)}
          >
            <img
              src={p.product?.thumbnails?.[0] || "/placeholder.png"}
              alt="thumb"
              className="w-10 h-10 object-cover rounded"
            />
            <span className="text-xs line-clamp-1">
              {p.product?.product_name}
            </span>
            {props.selectedProducts?.some((x: any) => x._id === p._id) && (
              <span className="ml-auto text-green-500 text-xs">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CraftMainProductBlockSettings;
