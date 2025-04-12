import MyEyeIcon from "@/components/icons/My_EyeIcon";
import ProductReturnModel from "@/components/modals/store/Product_Return_Store_Model";
import { useModal } from "@/providers/context/context";

export default function StoreReturnProductAction() {
  const { setIsOpen } = useModal();
  return (
    <div>
      <MyEyeIcon
        onClick={() => {
          setIsOpen(true);
        }}
      />

      {/* ======= product transfer modal ========*/}
      <ProductReturnModel />
    
    </div>
  );
}
