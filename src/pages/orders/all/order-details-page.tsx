import MyBackBtn from "@/components/myUi/myBackBtn";
import MyClock from "@/components/myUi/MyClock";
import { UseUpdateModal } from "@/providers/context/modal-context";
import { IOrders, IOrderStatus } from "@/types/orderTypes";
import OrderStatusChangerWidget from "@/components/tasks/table_actions/Orders/all-orders-action/order-status-changer";
import React from "react";
import Image from "@/components/global/image";

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
      <div className="flex gap-3">
        <div className="lg:w-3/4 space-y-3 ">
        
          {/* 1. */}
          <div className="bg-white dark:bg-inherit p-4 rounded-md flex justify-between">
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
          <DetailsTable orders={orders} /> 
        </div>
        {/* 4. */}
        <div className="lg:flex-grow bg-white">d</div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;



const DetailsTable = ({ orders }: Props) => {
    const storeOrder = orders.store_orders?.[0];
  
    // Group items by product name
    const groupedItems = storeOrder?.items.reduce((acc, item) => {
      const key = item.product.product_name;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, typeof storeOrder.items>) ?? {};
  
    return (
      <div className="bg-white dark:bg-inherit rounded-md p-4">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
              <tr className="text-left text-xs uppercase text-gray-500 dark:text-neutral-400">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Color</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price (1PCS)</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedItems).map(([productName, items], i) => (
                <React.Fragment key={i}>
                  {items.map((item, j) => {
                    const { product, product_order_id } = item;
                    const variation = product.variations?.[0]?.details?.find(
                        (v) => v.size === item.stock_sku
                      );
                      
  
                    const size = item.stock_sku;
                    const color =
                      product.variations?.[0]?.colorName ?? "—";
                    const qty = variation?.quantity ?? 0;
                    const price = variation?.selling_price ?? 0;
                    const total = qty * price;
  
                    return (
                      <tr key={product_order_id} className="border-t">
                        {j === 0 && (
                          <td
                            rowSpan={items.length}
                            className="p-2 align-top"
                          >
                            <Image
                              src={product.gallery_image[0] ?? "/no-img.jpg"}
                              alt={productName}
                             
                              className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden"
                              classNameImg="w-full h-full object-contain"
                            />
                          </td>
                        )}
                        {j === 0 && (
                          <td
                            rowSpan={items.length}
                            className="p-2 align-top  font-medium"
                          >
                            {productName}
                          </td>
                        )}
                        <td className="p-2 align-top ">{color}</td>
                        <td className="p-2 align-top ">{size}</td>
                        <td className="p-2 align-top ">{qty}</td>
                        <td className="p-2 align-top ">₹{price}</td>
                        <td className="p-2 align-top  font-semibold">₹{total}</td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };