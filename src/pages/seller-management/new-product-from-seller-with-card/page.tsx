import { getAllProductsInAdmin } from "@/actions/products/productActions";
import GlobalProductCard from "@/components/global/product-card";
import { useQueryData } from "@/hooks/useQueryData";
import { IProducts } from "@/types/productType";
import SellerProductsDetailingPage from "./seller-product-profile/card-sec";
import Loader from "@/components/global/loader";
import { useSearchParams } from "react-router-dom";
import { decodeId } from "@/utils/encorder";


const NewUploadedSellerProductPage = () => {
  const [searchParams] = useSearchParams();

  const encodedSellerId = searchParams.get("sellerId") ?? "";
  const encodedCategoryId = searchParams.get("cat") ?? "";

  const sellerId = decodeId(encodedSellerId);
  const categoryId = decodeId(encodedCategoryId);

  const filters: { key: string; value: string }[] = [];

  if (categoryId) {
    filters.push({ key: "categoryId", value: categoryId });
  }
  
  const { data: fetchedProducts, isFetching } = useQueryData(
    ["all-new-products",categoryId],
    () => getAllProductsInAdmin(filters),
    { disableRefetch: false }
  );

  const { data: products = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IProducts[];
  };

  if (isFetching) {
    return (
      <div className="page-outer">
        <Loader state={isFetching} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="page-outer">
       <span className="">
        No data
       </span>
      </div>
    );
  }

  return (
    <div className="">
      {/* <pre className="text-xs">
    {JSON.stringify(products[0].categoryId, null, 4)}
    </pre> */}
      {sellerId ? (
        <div className="">
          <SellerProductsDetailingPage
            products={products.filter((p) => p.createdBy?._id === sellerId)}
          />
        </div>
      ) : (
        <div className="page-outer">
          <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 ">
            {products.map((product, i) => (
              <GlobalProductCard data={product} key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUploadedSellerProductPage;
