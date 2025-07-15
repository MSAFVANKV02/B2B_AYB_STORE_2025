import GlobalProductCard from "@/components/global/product-card";
import MyBackBtn from "@/components/myUi/myBackBtn";
import SellerProductProfileFilterBar from "@/components/seller-management/product-of-seller/filter-bar-product";
import SellerProductProfileNavbar from "@/components/seller-management/product-of-seller/nav-bar-seller-profile";
import { IProducts } from "@/types/productType";

type Props = {
  products: IProducts[];
};

const SellerProductsDetailingPage = ({ products }: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Top navbar */}

        <div className="">
            <MyBackBtn />
        </div>

      <SellerProductProfileNavbar products={products} />

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Filter */}
        <div className="lg:w-[280px] w-full bg-white dark:bg-neutral-300/30  p-4 rounded-md shadow-sm">
          <SellerProductProfileFilterBar products={products} />
        </div>

        {/* Product Grid */}
        <div className="flex-1 bg-white dark:bg-neutral-300/30 p-4 rounded-md shadow-sm">
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
            {products.map((product, i) => (
              <GlobalProductCard data={product} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductsDetailingPage;
