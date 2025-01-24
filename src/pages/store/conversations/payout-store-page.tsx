import { StoreTypes } from "@/types/storeTypes";
import { useSearchParams } from "react-router-dom";
import StorePaymentForm from "./store_payment_form";
import { DataTableStorePayout } from "@/components/tasks/task_components/store/data-table-store-payout";

import PayoutStoreDue from "./payout-store-due";

const storeData: StoreTypes[] = [
  {
    registrationType: "LLP",
    name: "Green Mart",
    gstNumber: "27AABCU9603R1ZV",
    Address: "123 Main Street, Springfield",
    storeCapacity: 1500,
    state: "Maharashtra",
    country: "India",
    pinCode: "400001",
    googleLocation: { latitude: 21213, longitude: 1233.31 },
    manager: "John Doe",
    emailId: "john.doe@greenmart.com",
    phoneNumber: "+91-9876543210",
    userName: "john_doe",
    password: "password123",
    inHouseProduct: true,
    bankDetails: {
      accountName: "Green Mart Pvt. Ltd.",
      accountNumber: "123456789012",
      ifscCode: "HDFC0000123",
      shiftCode: "HDFCINBBXXX",
      upiId: "greenmart@hdfc",
    },
    capacity: 1500,
  },
  {
    registrationType: "LLP",
    name: "Green Mart",
    gstNumber: "27AABCU9603R1ZV",
    Address: "123 Main Street, Springfield",
    storeCapacity: 1500,
    state: "Maharashtra",
    country: "India",
    pinCode: "400001",
    googleLocation: { latitude: 21213, longitude: 1233.31 },
    manager: "John Doe",
    emailId: "john.doe@greenmart.com",
    phoneNumber: "+91-9876543210",
    userName: "john_doe",
    password: "password123",
    inHouseProduct: true,
    bankDetails: {
      accountName: "Green Mart Pvt. Ltd.",
      accountNumber: "123456789012",
      ifscCode: "HDFC0000123",
      shiftCode: "HDFCINBBXXX",
      upiId: "greenmart@hdfc",
    },
    capacity: 1500,
  },
];

export default function PayoutStorePage() {
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get("type");
  return (
    <div>
      <div className="p-4 select-none">
        <h1 className="font-bold text-textGray text-sm">Store Payout</h1>
      </div>
      {/*  */}
      <div className="sm:p-5 rounded-md shadow-sm scrollbar-none min-h-[80vh] w-full bg-transparent">
        {urlType === "create" ? (
          <div className="">
            <StorePaymentForm />
          </div>
        ) : (
          <div className="flex xl:flex-row flex-col gap-4">
            <div className="xl:w-[60%] w-full  bg-white overflow-y-auto h-[80vh]  p-2 rounded-md">
              <DataTableStorePayout data={storeData} />
            </div>

            <div className="xl:flex-grow bg-white p-2 rounded-md overflow-y-auto h-[80vh]">
              <PayoutStoreDue />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
