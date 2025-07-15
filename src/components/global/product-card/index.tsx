import { IProducts } from "@/types/productType";
import Image from "../image";
import { useNavigate } from "react-router-dom";
import { encodeId } from "@/utils/encorder";

type Props = {
  data: IProducts;
};

const GlobalProductCard = ({ data }: Props) => {
  const navigate = useNavigate();

  const minPrice = Math.min(
    ...data.price_per_pieces.map((p) => p.purchase_Amount)
  );
  const maxPrice = Math.max(
    ...data.price_per_pieces.map((p) => p.purchase_Amount)
  );

  const handleClickProduct = () => {


    // Navigate to a route — replace `/product-detail` with your actual path
    navigate(`?sellerId=${encodeId(data.createdBy?._id??"")}`);
  };

  return (
    <div
      className="rounded-lg bg-white dark:bg-neutral-300/30 shadow-sm border overflow-hidden cursor-pointer"
      onClick={handleClickProduct}
    >
      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
        <Image
          src={data.thumbnails[0]}
          className="object-cover w-full h-full"
          disableLink
        />
      </div>

      <div className="p-2 flex flex-col gap-1 ">
        <p className="text-sm leading-tight text-gray-800 line-clamp-2">
          {data.product_name}
        </p>

        <p className="text-sm font-semibold text-gray-800">
          ₹{minPrice.toFixed(2)} – ₹{maxPrice.toFixed(2)}
          <span className="text-xs font-normal text-gray-500"> / piece</span>
        </p>

        <p className="text-xs text-gray-500">
          {data.minimum_quantity} pieces (MOQ)
        </p>
      </div>
    </div>
  );
};

export default GlobalProductCard;
