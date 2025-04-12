import { Orders } from "./all-oders-page";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrderStatusSelectionSection from "@/components/orders/Order_Status_Selection_Section";
import { Separator } from "@/components/ui/separator";
import AllOrdersBottom from "./all_orders_bottom";

type Props = {
  params: string | null;
};
export default function ViewOrder({ params }: Props) {
  const filterOrderByOrderId = Orders.filter((order) => {
    return order.orderCode === params;
  });

  return (
    <div className="px-3 py-5">
      {filterOrderByOrderId.map((order, index) => (
        <div className="space-y-10" key={`${order.orderCode}-${index}`}>
          {/* ==============================
                   ==============================
                   ================================== */}
          {/* order status change options ==== */}
          <div className="flex md:justify-end gap-6">
            <OrderStatusSelectionSection />
          </div>

          <Separator />

          <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-0 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-xs text-textGray">
                <b>Order ID:</b>
                <span className=" font-bold ">{order.orderCode}</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <b>Order Date:</b>
                <span className=" font-bold text-sm">{order.createdAt}</span>
              </div>
              {/* ================== */}
            </div>
            {/* ======== col 2========== */}

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-textGray select-none">
                <Icon
                  icon="ix:user-profile-filled"
                  fontSize={20}
                  className="text-textGray"
                />
                <small>Customer</small>
              </div>
              {/* details starts --- */}
              <div className="pl-7 flex flex-col gap-1">
                <small>{order.customer}</small>
                <small>Panakkad, Ayikode south, Kerala-676542, India</small>
              </div>
            </div>
            {/* ======== col 3========== */}

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-textGray select-none">
                <Icon
                  icon="material-symbols-light:info-rounded"
                  fontSize={20}
                  className="text-textGray"
                />
                <small>Order Info</small>
              </div>
              {/* details`========` */}
              <div className="flex gap-3 items-center text-xs pl-6">
                <b className="text-textGray">Status: </b>{" "}
                <span> {order.deliveryStatus}</span>
              </div>
            </div>
            {/* ======== col 4========== */}

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-textGray select-none">
                <Icon
                  icon="ic:sharp-payments"
                  fontSize={20}
                  className="text-textGray"
                />
                <small>Payment Status</small>
              </div>
              {/* ==== details ==== */}
              <div className="flex flex-col pl-6">
                <small>{order.paymentStatus}</small>
                <small>{order.paymentMethod}</small>
              </div>
            </div>
          </div>

          <Separator />

          {/* table starts here ======= */}

          <div className="flex lg:flex-row flex-col gap-3">
            <AllOrdersBottom />

            {/* price section starts */}
            <div className="lg:ml-auto lg:w-[20%] mt-auto w-full  rounded-md  flex flex-col gap-2">
              <div className="flex justify-between">
                <b>Sub Total:</b>
                <span>₹978</span>
              </div>
              <div className="flex justify-between">
                <b>Tax:</b>
                <span>₹978</span>
              </div>
              <div className="flex justify-between">
                <b>Shipping:</b>
                <span>₹978</span>
              </div>
              <div className="flex justify-between">
                <b>Coupon:</b>
                <span>₹978</span>
              </div>
              <hr className="my-2 border-t border-gray-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span>₹1978</span>
              </div>
            </div>
          </div>

          {/* ==============================
                   ==============================
                   ================================== */}
        </div>
      ))}
    </div>
  );
}
