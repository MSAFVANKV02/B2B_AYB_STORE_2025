import StoreStockRequestModal from "@/components/modals/store/Store-Stock-Request-Modal";
import { useModal } from "@/providers/context/context";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function StoreProductStockRequests() {
  const { setIsOpen } = useModal();
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
      <StoreStockRequestModal />
    </div>
  );
}
