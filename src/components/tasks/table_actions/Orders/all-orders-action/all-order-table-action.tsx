import { IOrders } from "@/types/orderTypes";
import OrderStatusChangerWidget from "./order-status-changer";
import { memo } from "react";
import MyEyeIcon from "@/components/icons/My_EyeIcon";
import My_Icon from "@/components/icons/My_Icon";
import { UseUpdateModal } from "@/providers/context/modal-context";

type Props = {
  orders: IOrders;
};

const AllOrderTableAction = ({ orders }: Props) => {
  const { dispatchModal } = UseUpdateModal();
  return (
    <div className="flex gap-3 items-center justify-center h-0">
      <OrderStatusChangerWidget orders={orders} />

      <MyEyeIcon
        onClick={() => {
          dispatchModal({ type: "OPEN_MODAL", modalType: "order-details", payload:orders });
        }}
        className="bg-blue-100 text-blue-400 rounded-sm"
        color="#000000"
        icon="teenyicons:eye-outline"
      />

      <My_Icon
        onClick={() => {}}
        className="bg-blue-100 text-blue-400 rounded-sm"
        color="#000000"
        fontSize={20}
        icon="ph:printer"
        tooltipTitle="Print"
      />
    </div>
  );
};

export default memo(AllOrderTableAction);
