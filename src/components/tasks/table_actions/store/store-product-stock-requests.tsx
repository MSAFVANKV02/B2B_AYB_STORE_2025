import StoreStockRequestModal from "@/components/modals/store/Store-Stock-Request-Modal";
import { useModal } from "@/providers/context/context";
import { IProducts } from "@/types/productType";
import { Icon } from "@iconify/react/dist/iconify.js";


type IProps ={
  data: IProducts
}

export default function StoreProductStockRequests({data}: IProps) {
  const { setIsOpen } = useModal();

  console.log(data,'data in StoreProductStockRequests');
  
  return (
    <div>
      <div className="">
        <button
          className="text-textMain flex items-center text-sm group"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          View
          <Icon
            icon="basil:arrow-right-outline"
            fontSize={23}
            className="group-hover:animate-pulse"
          />
        </button>
      </div>

      {/* ====== request modal ====== */}
      <StoreStockRequestModal data={data} />
    </div>
  );
}
