import { DataTable } from "@/components/tasks/task_components/data-table";
import { IOrders } from "@/types/orderTypes";

import { PageLayoutHeader } from "@/layouts/Pages_Layout";
import { RentHistoryColumn } from "@/components/tasks/table_columns/Accounts/rent-history-table-columns";

const Orders: IOrders[] = [
  {
    orderCode: "20240506–21040405",
    store: "Calicut",
    numOfProducts: 1,
    customer: "Sulfeekar",
    amount: "₨1,978.00",
    deliveryStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Un-paid",
    refund: "No Refund",
    createdAt: "12/12/2015",
    returnType: "refund",
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
    returnType: "refund",
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
    returnType: "replace",
  },
];

function RentHistoryPage() {
  return (
    <div>
      <PageLayoutHeader>
        <h1>Rent history</h1>
      </PageLayoutHeader>
      {/* -=====- */}

      <div className="mb-5">
        <div className="xl:w-[50%] md:w-[60%] text-white text-lg font-bold select-none w-[90%] h-20 rounded-2xl shadow-lg flex justify-between items-center p-5 bg-gradient-to-l from-orange-500 to-red-500">
          <span>Total rent paid</span>
          <span>1,0000</span>
        </div>
      </div>

      <div className="page-outer">
        <div className="flex md:flex-row flex-col gap-3">
          <div className={` w-full`}>
            <DataTable data={Orders} columns={RentHistoryColumn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentHistoryPage;
