import { IOrders } from "@/types/orderTypes";
import OrderStatusChangerWidget from "./order-status-chager";
import { memo } from "react";

type Props = {
  orders: IOrders;
};

const AllOrderTableAction = ({ orders }: Props) => {
  return (
    <div>
      <OrderStatusChangerWidget orders={orders} />
    </div>
  );
};

export default memo(AllOrderTableAction);
