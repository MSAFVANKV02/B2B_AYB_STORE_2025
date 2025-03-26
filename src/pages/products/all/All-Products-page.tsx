
import { useQueryData } from "@/hooks/useQueryData";
import { useEffect } from "react";
import InventoryTable from "./Inventory/InventoryTable";

import { useSearchParams } from "react-router-dom";
import { getStorePurchasedProducts } from "@/actions/stocks/stockAction";
import { IFinalProductTypes } from "@/types/final-product-types";

export default function AllProductsPage() {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get("type");
  const {
    data: fetchedProducts,
    isFetching,
    refetch,
  } = useQueryData(
    ["all-products", urlTypes],
    () =>
      getStorePurchasedProducts()
  );
  // console.log(fetchedProducts,'fetchedProducts');

  // const { products } = useAppSelector((state) => state.products);

  const { data: product = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IFinalProductTypes[];
  };

  // console.log(product,'productproduct');



  useEffect(() => {
    // fetch()
    refetch();
  }, [urlTypes, refetch]);

  return (
    <div className="min-h-screen bg-white rounded-md p-3 overflow-x-hidden">
      {/* <MyPageTab
        // setTypeUrl={setSelectedTab}
        tabs={[
          {
            value: "all-product",
            title: "All Products",
            url: "/products/all?type=all-product",
            children: (
              <div className="overflow-x-auto w-full">
                <InventoryTable
                  refetch={refetch}
                  products={product}
                  loading={isFetching}
                />
              </div>
            ),
          },
          {
            value: "deleted-product",
            title: "Trash",
            url: "/products/all?type=deleted-product",
            children: (
              <div className="overflow-x-auto w-full">
                <InventoryTable
                  refetch={refetch}
                  products={product}
                  loading={isFetching}
                />
              </div>
            ),
          },
          // {
          //   value: "new-product",
          //   title: "New Product",
          //   url: "/products/all?type=new-product",
          //   children: (
          //     <div className="w-full">
          //       <SellerRequestTable />
          //     </div>
          //   ),
          // },
        ]}
      /> */}
         <div className="overflow-x-auto w-full">
                <InventoryTable
                  refetch={refetch}
                  products={product}
                  loading={isFetching}
                />
              </div>
    </div>
  );
}
