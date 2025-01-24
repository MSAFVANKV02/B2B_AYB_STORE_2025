
import { DataTable } from "@/components/tasks/task_components/data-table";
import { IOrders } from "@/types/orderTypes";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ViewPaymentDetails from "./view_Payment_Details";
import AyButton from "@/components/myUi/AyButton";
import '@/assets/css/orders.css'
import { PaymentHistoryTableColumn } from "@/components/tasks/table_columns/Accounts/transaction-table-columns";

export const Orders: IOrders[] = [
  {
    orderCode: "20240506–21040405",
    store: "Sulfeekar",
    numOfProducts: 1,
    customer: "Sulfeekar",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Un-paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "replace",
  },
  {
    orderCode: "20240506–21040495",
    store: "Name",
    numOfProducts: 1,
    customer: "Name",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Un-paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "replace",
  },
  {
    orderCode: "20240506–21040477",
    store: "Name",
    numOfProducts: 1,
    customer: "Name",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Un-paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "refund",
  },
  {
    orderCode: "20240506–21040470",
    store: "Name",
    numOfProducts: 1,
    customer: "Name",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "replace",
  },
];

export default function TransactionHistoryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [view, setView] = useState(false);

  const params = searchParams.get("order");

  useEffect(() => {
    const orderExists = Orders.some((order) => order.orderCode === params);

    if (params && orderExists) {
      setView(true);
    } else {
      setView(false);
    }
  }, [searchParams, params]);

  const handleOrderPageClick = () => {
    navigate("/accounts/transaction-history",{replace:false}); // Navigate to the base route without query parameters
    setView(false);
  };

  return (
    <div>
      <div className=" p-4 flex justify-between">
        <h1 className="font-bold">{view ? "Payment Details" : "Payment History"}</h1>
        {view && <AyButton
        title="Order Page"
        onClick={()=>{
            setView(false);
            handleOrderPageClick();  // Navigate back to the orders page with query parameters
        }}
        />}
      </div>
      {/* ------------- */}
      <div className="page-outer">
        {!view ? (
          <DataTable
            enableSearch
            columns={PaymentHistoryTableColumn}
            data={Orders}
            searchWith="orderCode"
            // statuses={statuses}

            enableStatus={false}
            enableView={false}
          />
        ) : (
          <div className="">
            <ViewPaymentDetails params={params} />
          </div>
        )}
      </div>
    </div>
  );
}
