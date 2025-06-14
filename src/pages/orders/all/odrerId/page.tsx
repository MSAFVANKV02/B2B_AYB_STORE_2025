import MyBackBtn from "@/components/myUi/myBackBtn";
import MyClock from "@/components/myUi/MyClock";
import {
  IFlatOrderItem,
  IOrderStatus,
  IOrdersType,
} from "@/types/orderTypes";
import OrderStatusChangerWidget from "@/components/tasks/table_actions/Orders/all-orders-action/order-status-changer";

import OrderDetailsTables from "@/components/orders/order-details/order-details-table";
import OrderDetailsSideBar from "@/components/orders/order-details/order-details-sidebar";
import { OrderStatusStepper } from "@/components/global/stepper";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getAllOrdersAction } from "@/actions/orders/ordersAction";
import {  useParams } from "react-router-dom";
import { OrderNotFoundSvgIcon } from "@/components/icons/order-icons";

// type Props = {
//   orders: IOrders;
// };

const OrderDetailsPage = () => {
  const { orderId } = useParams();


  const { data: fetchedAllOrders, isPending } = useQueryData(
    ["all-orders",orderId],
    () => getAllOrdersAction([{ key: "order_id", value: orderId ?? "" }]),
    { disableRefetch: true }
  );

  const { data: fetchedOrdersData } = (fetchedAllOrders ?? {}) as {
    status?: number;
    data?: IOrdersType;
  };
  const storeOrder = fetchedOrdersData?.orders[0].store_orders[0];
  const orders = fetchedOrdersData?.orders[0];

  const DeliveryType =
  storeOrder?.parcel_details.shipping_method
    .split("_")
    .join(" ");

  // const storeOrder = orders.store_orders?.[0];
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

  if(isPending){
    return (
      <div className="h-[85dvh] bg-white rounded-lg shadow-md dark:bg-neutral-400/20 flex items-center justify-center">
        <span className="text-xs dark:text-neutral-300">
          Loading ...
        </span>
      </div>
    )
  }

  if (!orders) {
    return (
      <div className="h-[85dvh] p-5 bg-white rounded-lg shadow-md dark:bg-inherit select-none  gap-7 items-center">
      <MyBackBtn
     
      />
      <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
        <div className="">
        <OrderNotFoundSvgIcon />
      </div>
      <div className="">
        <p className="text-center text-[#B3B3B3] font-medium">
          No Orders yet.
        </p>
      </div> 
      </div>
     
    </div>
    );
  }

  const filteredItems: IFlatOrderItem[] = orders.store_orders
    .filter((store) => store)
    .flatMap((store) =>
      store.items.map((item, index) => ({
        ...item,
        store,
        order: orders,
        showVerifiedLabel: index === 0,
      }))
    );

  return (
    <div className=" space-y-5 w-full dark:text-neutral-300">
      <MyBackBtn
   
      />
      <div className="flex lg:flex-row flex-col gap-7">
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

              <p className="text-xs">
                <span className="font-bold">Order Type :</span>{" "}
                <span className="">
                {DeliveryType === "parcel pickup" ? "Door Delivery" : DeliveryType}
                </span>
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

          <div className="bg-white space-y-4 dark:bg-inherit p-5 rounded-md">
            <span className="font-bold mb-3">Order Timeline</span>

            <Separator className="h-[2px] rounded-full" />

            <OrderStatusStepper orderDetails={filteredItems} />
          </div>
        </div>
        {/* 4. */}
        {/* side bar stats */}
        <OrderDetailsSideBar orders={orders} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
