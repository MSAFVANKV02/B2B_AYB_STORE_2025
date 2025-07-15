import { IProducts } from "@/types/productType";
import { decodeId, encodeId } from "@/utils/encorder";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  products: IProducts[];
};

const SellerProductProfileFilterBar = ({ products }: Props) => {
  const [searchParams] = useSearchParams();

  const encodedSellerId = searchParams.get("sellerId") ?? "";
  const cat = searchParams.get("cat") ?? "";


  const sellerId = decodeId(encodedSellerId);

  const navigate = useNavigate();

  // ✅ Make category unique based on categoryId._id
  const uniqueProducts = Array.from(
    new Map(
      products
        .filter((p) => p.categoryId?._id)
        .map((p) => [p.categoryId!._id, p])
    ).values()
  );

  return (
    <ul className="flex flex-col gap-2">
      <p className="flex justify-between">
       <span className="font-semibold mb-1 text-sm">Category</span>
       {cat && (
       <button className="font-semibold mb-1 text-sm"
       onClick={() => {
        const params = new URLSearchParams(searchParams);
        params.delete("cat");
        navigate(`/seller/enquire-products?${params.toString()}`);
      }}
       
       >Clear</button>

       )}
         
      </p>
     
      {uniqueProducts.map((p, index) => (
        <li
          className="text-xs cursor-pointer"
          key={index}
          onClick={() => {
            const catId = encodeId(p.categoryId?._id ?? "");

            const params = new URLSearchParams();
            if (sellerId) params.set("sellerId", sellerId);
            if (catId) params.set("cat", catId);

            navigate(
              `/seller/enquire-products?sellerId=${encodeId(
                p.createdBy?._id ?? ""
              )}&cat=${encodeId(p.categoryId?._id ?? "")}`
            );
          }}
        >
          {p.categoryId?.name}
        </li>
      ))}
    </ul>
  );
};

export default SellerProductProfileFilterBar;
