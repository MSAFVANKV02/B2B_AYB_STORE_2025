import Image from "@/components/global/image";
import { IProducts } from "@/types/productType";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  products: IProducts[];
};

const SellerProductProfileNavbar = ({ products }: Props) => {
  return (
    <div className="w-full bg-white dark:bg-neutral-300/30 p-4 rounded-md shadow-sm">
      <div className="flex w-full items-center gap-3">
        <Image
          src={products[0].createdBy?.avatar ?? ""}
          className="w-16 h-16 rounded-full overflow-hidden border"
          classNameImg="w-full h-full object-cover"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm">{products[0].createdBy?.name}</p>
          {products[0].createdBy?.role === "admin" ? (
            <p className=" text-xs text-center rounded-full bg-[#F9E9FF] flex items-center gap-1">
              <span className="rounded-full p-1 bg-gradient-to-r from-[#AF61CC] to-[#5F08B1] text-white">
                <Icon icon="iconamoon:shield-yes-light" />
              </span>
              <span className="px-1">Ayaboo</span>
            </p>
          ) : (
            <p className=" text-xs text-center rounded-full bg-[#F9E9FF] flex items-center gap-1">
              <span className="rounded-full p-1 bg-gradient-to-r from-[#AF61CC] to-[#5F08B1] text-white">
                <Icon icon="iconamoon:shield-yes-light" />
              </span>
              <span className="px-1">Verified Seller</span>
            </p>
          )}

          {products[0].createdBy?.role === "admin" ? (
            <p className="flex text-xs capitalize text-textGra">
              Product By Ayaboo
            </p>
          ) : (
            <p className="flex text-xs capitalize text-textGray">
              <span className="">{products[0].createdBy?.state},</span>
              <span className="">{products[0].createdBy?.city},</span>
              <span className="">{products[0].createdBy?.country}</span>
            </p>
          )}
        </div>

        {/* {
            JSON.stringify(products[0].createdBy,null,4)
        } */}
      </div>
    </div>
  );
};

export default SellerProductProfileNavbar;
