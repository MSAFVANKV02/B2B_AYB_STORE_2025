import MyBackBtn from "@/components/myUi/myBackBtn";
import MyClock from "@/components/myUi/MyClock";
import { UseUpdateModal } from "@/providers/context/modal-context";
import { IOrders, IOrderStatus } from "@/types/orderTypes";
import OrderStatusChangerWidget from "@/components/tasks/table_actions/Orders/all-orders-action/order-status-changer";

import OrderDetailsTables from "@/components/orders/order-details/order-details-table";

type Props = {
  orders: IOrders;
};

const OrderDetailsPage = ({ orders }: Props) => {
  const { dispatchModal } = UseUpdateModal();

  const storeOrder = orders.store_orders?.[0];
  const status = storeOrder?.order_status as IOrderStatus;
  const isReturned = storeOrder?.is_returned;
  const statusLabelMap: Record<IOrderStatus, string> = {
    pending: "Pending",
    processing: "In Progress",
    ready_to_pickup: "Ready for Pickup",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  const statusColorMap: Record<IOrderStatus, string> = {
    pending:
      "bg-yellow-50 text-yellow-600 border border-yellow-500 dark:bg-yellow-50/20 dark:border-yellow-500/30 dark:text-neutral-300",
    processing:
      "bg-blue-50 text-blue-600 border border-blue-500 dark:bg-blue-50/20 dark:border-blue-500/30 dark:text-neutral-300",
    ready_to_pickup:
      "bg-orange-50 text-orange-600 border border-orange-500 dark:bg-orange-50/20 dark:border-orange-500/30 dark:text-neutral-300",
    shipped:
      "bg-[#16A085]/10 text-[#16A085] border border-[#16A085] dark:bg-[#16A085]/20 dark:border-[#16A085]/30 dark:text-neutral-300",
    out_for_delivery:
      "bg-violet-50 text-violet-600 border border-violet-500 dark:bg-violet-50/20 dark:border-violet-500/30 dark:text-neutral-300",
    delivered:
      "bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60] dark:bg-[#27AE60]/20 dark:border-[#27AE60]/30 dark:text-neutral-300",
    cancelled:
      "bg-red-50 text-red-600 border border-red-500 dark:bg-red-50/20 dark:border-red-500/30 dark:text-neutral-300",
  };

  const label = statusLabelMap[status] ?? "Unknown";
  const color = statusColorMap[status] ?? "bg-gray-200";

  return (
    <div className="2xl:px-0 lg:px-10  space-y-5 w-full">
      <MyBackBtn
        clickEvent={() => {
          dispatchModal({ type: "CLOSE_MODAL" });
        }}
      />
      <div className="flex gap-7">
        <div className="lg:w-[68%] space-y-3 ">
          {/* 1. */}
          <div className="bg-white dark:bg-inherit p-5 rounded-md flex justify-between">
            {/* 2.==== */}
            <div className="space-y-4">
              <p className="text-xs">
                <span className="font-bold">Order Id :</span>{" "}
                <span className="">{orders.order_id}</span>
              </p>

              <p className="text-xs">
                <span className="font-bold">Order Created at :</span>{" "}
                <MyClock date={orders.createdAt} showSeconds={false} />
              </p>
            </div>
            <div className=" flex md:flex-row  gap-5 flex-col items-start">
              <div className="flex flex-col items-start gap-2">
                <span className="font-bold text-xs">Current Status</span>
                {isReturned ? (
                  <div className="px-2 py-1 rounded text-xs text-center w-full bg-pink-100 text-pink-600 border border-pink-400">
                    Returned
                  </div>
                ) : (
                  <div
                    className={`px-2 py-1 rounded text-xs text-center w-full ${color}`}
                  >
                    {label}
                  </div>
                )}
              </div>

              {/* status updater */}
              <div className="">
                <OrderStatusChangerWidget orders={orders} />
              </div>
            </div>
            {/* 3.=== */}
          </div>

          {/* table start here */}
          <OrderDetailsTables orders={orders} />
        </div>
        {/* 4. */}
        {/* side bar stats */}
        <div className="lg:flex-grow bg-white">d</div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
