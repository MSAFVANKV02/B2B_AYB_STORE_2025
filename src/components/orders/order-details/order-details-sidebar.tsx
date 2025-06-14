import { OrderSummarySvgIcon } from "@/components/icons/order-icons";
import { IOrders } from "@/types/orderTypes";

// import { motion } from "framer-motion";
// import { useEffect, useRef } from "react";
// import gsap from "gsap"

type Props = {
  orders: IOrders;
};

const OrderDetailsSideBar = ({ orders }: Props) => {
  const storeOrder = orders.store_orders?.[0];
  const {
    CouponDiscountOrderSummarySvgIcon,
    DeliveryOrderSummarySvgIcon,
    SubTotalOrderSummarySvgIcon,
    TaxOrderSummarySvgIcon,
    PaymentInfoOrderSummarySvgIcon,
    PaymentInfoRazorpayOrderSummarySvgIcon,
    PaymentInfoUpiOrderSummarySvgIcon,
  } = OrderSummarySvgIcon();


  // const boxRef = useRef(null);

  // useEffect(() => {
  //   gsap.to(boxRef.current, { rotation: 360, duration: 2 });
  // }, []);


  if (!storeOrder) return null;

  const { sub_total, coupon_discount, parcel_charge, gst, total_amount } =
    storeOrder.order_total;

  const formatAmount = (amount: number) =>
    amount < 0 ? (
      <span className="text-red-500">
        -₹{Math.abs(amount).toLocaleString()}
      </span>
    ) : (
      <span className="">₹{amount.toLocaleString()}</span>
    );

    

  return (
    <div className="flex flex-col gap-3 lg:w-[32%]">
      {/* <pre className="h-[400px] text-xs overflow-auto">
            {JSON.stringify(orders,null,4)}
        </pre> */}
        {/* <motion.div ref={boxRef} whileHover={{ scale: 1.1 }}>Hover me</motion.div> */}
      <div className="bg-white dark:bg-neutral-300/30  rounded-lg overflow-hidden shadow-sm">
        <div className=" p-4">
          <h3 className="font-medium text-sm border-b border-b-black dark:border-b-white  text-neutral-700 dark:text-white pb-2 mb-1">
            Order Summary
          </h3>
          <ul className="flex flex-col divide-y divide-gray-200  text-sm text-neutral-600 dark:text-neutral-300">
            <li className="flex justify-between items-center py-3">
              <p className="flex items-center gap-1">
                <SubTotalOrderSummarySvgIcon /> Sub Total :
              </p>
              <p>{formatAmount(sub_total)}</p>
            </li>
            <li className="flex justify-between items-center py-3">
              <p className="flex items-center gap-1">
                <CouponDiscountOrderSummarySvgIcon />{" "}
                <span>Coupon Discount :</span>
              </p>

              <p className="">{formatAmount(coupon_discount)}</p>
            </li>
            <li className="flex justify-between items-center py-3">
              <p className="flex items-center gap-1">
                <DeliveryOrderSummarySvgIcon /> <span>Delivery Charge :</span>
              </p>

              <p className="">{formatAmount(parcel_charge)}</p>
            </li>
            <li className="flex justify-between items-center py-3">
              <p className="flex items-center gap-1">
                <TaxOrderSummarySvgIcon /> <span>Estimated Tax :</span>
              </p>

              <p className="">{formatAmount(gst)}</p>
            </li>
          </ul>
        </div>

        <div className="mt-3 bg-blue-100 text-blue-900 font-medium text-sm px-4 py-3 rounded-b-md flex justify-between items-center">
          <span>Total Amount</span>
          <span>₹{total_amount.toLocaleString()}</span>
        </div>
      </div>

      {/* payment info */}
      <div className="bg-white dark:bg-neutral-300/30  rounded-lg overflow-hidden shadow-sm p-4">
        <span className="font-bold">Payment Info</span>
        <div className="flex gap-5 mt-2">
          {orders.payment_method === "offline_payment" ? (
            orders.payment_details.payment_type === "bank" ? (
              <PaymentInfoOrderSummarySvgIcon />
            ) : (
              <PaymentInfoUpiOrderSummarySvgIcon />
            )
          ) : orders.payment_method === "razorpay" ? (
            <PaymentInfoRazorpayOrderSummarySvgIcon />
          ):(
            <div className="w-[50px] h-[50px] bg-[#F0F0F0] rounded-[10px] flex items-center justify-center">
              <span className="text-[10px] text-textMain font-semibold ">
                COD
              </span>
            </div>
          )}

          <div className="flex flex-col gap-1 text-xs">
            <p className="">
              <span className="">Method: </span>
              <span className="capitalize">{orders.payment_method}</span>
            </p>
            <p className="capitalize">
              {orders.payment_method === "offline_payment" && (
                <span className="">{orders.payment_details.payment_type}</span>
              )}
            </p>
            <p className="">
              <span className="">Method: </span>
              <span className="capitalize text-blue-400">
                {orders.payment_status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-300/30 text-sm rounded-lg overflow-hidden shadow-sm p-4">
        <div className="border rounded-md p-4 space-y-4">
          <h4 className="font-bold">Delivery Address</h4>
          <div className="">
            <span className="break-words w-fit">
              {orders.shipping_address.street}
            </span>
            <p className="">
              <span className="font-bold">Email</span>:{" "}
              <span className="break-words w-fit">
                {orders.shipping_address.email}
              </span>
            </p>
            <p className="">
              <span className="font-bold">Phone</span>:{" "}
              <span className="break-words w-fit">
                {orders.shipping_address.mobile}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSideBar;
