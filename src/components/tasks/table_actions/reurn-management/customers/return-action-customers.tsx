import { UseUpdateModal } from "@/providers/context/modal-context";
import { IReturnOrders } from "@/types/return_order_types";

type Props = {
  orders: IReturnOrders;
};

const OrderUserReturnAction = ({ orders }: Props) => {
  const { dispatchModal } = UseUpdateModal();

  return (
    <div>
      <button
        className="text-blue-500 font-medium"
        onClick={() => {
          dispatchModal({
            type: "OPEN_MODAL",
            modalType: "return-product-details",
            payload: orders,
          });
        }}
      >
        View
      </button>
    </div>
  );
};

export default OrderUserReturnAction;
