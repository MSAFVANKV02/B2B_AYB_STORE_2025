import InventoryDataTable from "@/components/tables/inventory-table/Inventory-Data-Table";
import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { IProducts } from "@/types/productType";
import {
  getAllProductsInAdmin,
  getAllRequestedProductsInStore,
} from "@/actions/products/productActions";
import { useSearchParams } from "react-router-dom";
import { useQueryData } from "@/hooks/useQueryData";
import { SELLER_NEW_PRODUCT_INVENTORY_COLUMNS } from "./table-cells/seller-new-product-inventory-columns";
import MyPageTab from "@/components/myUi/MyTabs";
import { SELLER_STOCK_INVENTORY_COLUMNS } from "./table-cells/seller-stock-inventory-columns";

const SellerNewAddedProductsPage = () => {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get("type");
  const {
    data: fetchedProducts,
    isFetching,
    refetch,
  } = useQueryData(["all-products", urlTypes], async () => {
    if (urlTypes === "requested-product") {
      return await getAllRequestedProductsInStore();
    } else {
      return await getAllProductsInAdmin([{ key: "", value: "" }]);
    }
  });

  //

  // console.log(fetchedProducts, "fetchedProducts");

  // const { products } = useAppSelector((state) => state.products);

  const { data: product = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IProducts[] 
  };

  
  console.log(product, "product");

  // let product: IProducts[] | IStockType[] = [];

  // // Conditionally set the product based on urlTypes
  // if (fetchedProducts?.data) {
  //   if (urlTypes === "requested-product") {
  //     product = fetchedProducts.data as IStockType[];  // Cast to IStockType[]
  //   } else {
  //     product = fetchedProducts.data as IProducts[];   // Cast to IProducts[]
  //   }
  // }

  // console.log(product,'productproduct');

  return (
    <div>
      <PagesLayout>
        <PageLayoutHeader>
          <h1 className="text-[20px] font-bold"> New Product From Seller</h1>
        </PageLayoutHeader>
        <PagesLayoutContent>
          <MyPageTab
            // setTypeUrl={setSelectedTab}
            tabs={[
              {
                value: "product-list",
                title: "Product List",
                url: "/seller/new-products?type=product-list",
                children: (
                  <div className="overflow-x-auto w-full">
                    <InventoryDataTable
                      // expandableRowsComponent={ExpandableRowComponent}
                      expandableRows={false}
                      products={product}
                      loading={isFetching}
                      columns={SELLER_NEW_PRODUCT_INVENTORY_COLUMNS(refetch)}
                    />
                  </div>
                ),
              },
              {
                value: "requested-product",
                title: "Requested list",
                url: "/seller/new-products?type=requested-product",
                children: (
                  <div className="overflow-x-auto w-full">
                    <InventoryDataTable
                      // expandableRowsComponent={ExpandableRowComponent}
                      expandableRows={false}

                      products={product}
                      loading={isFetching}
                      columns={SELLER_STOCK_INVENTORY_COLUMNS()}
                    />
                  </div>
                ),
              },
            ]}
          />
          {/* <code>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(fetchedProducts, null, 2)}
          </pre>
          </code> */}
        </PagesLayoutContent>
      </PagesLayout>
    </div>
  );
};

export default SellerNewAddedProductsPage;
