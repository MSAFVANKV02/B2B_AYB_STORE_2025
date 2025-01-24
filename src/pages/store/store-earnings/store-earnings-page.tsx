import { DataTableStoreEarnings } from "@/components/tasks/task_components/store/data-table-store-earnings"
import { StoreTypes } from "@/types/storeTypes";
import StoreEarningRent from "./store-earnings-rent";



const storeData: StoreTypes[] = [
  {
    registrationType: "LLP",
    storeName: "Green Mart",
    gstNumber: "27AABCU9603R1ZV",
    storeAddress: "123 Main Street, Springfield",
    storeCapacity: 1500,
    state: "Maharashtra",
    country: "India",
    pinCode: "400001",
    googleLocation: { latitude: 21213, longitude: 1233.31 },
    storeManager: "John Doe",
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
    storeName: "Green Mart",
    gstNumber: "27AABCU9603R1ZV",
    storeAddress: "123 Main Street, Springfield",
    storeCapacity: 1500,
    state: "Maharashtra",
    country: "India",
    pinCode: "400001",
    googleLocation: { latitude: 21213, longitude: 1233.31 },
    storeManager: "John Doe",
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

export default function StoreEarningsPage() {

  return (
    <div>
        <div className="">
        <h1 className="font-bold text-textGray text-sm p-4">Store Earnings</h1>
        </div>
        <div className=" rounded-md shadow-sm scrollbar-none min-h-[80vh] w-full bg-transparent">
            <div className="flex lg:flex-row flex-col gap-3">
              <div className="lg:w-[60%] bg-white overflow-y-auto h-[80vh]  p-2 rounded-md">
              <DataTableStoreEarnings
                data={storeData}
                />
              </div>
              <div className="flex-grow bg-white overflow-y-auto h-[80vh]  p-2 rounded-md">
    <StoreEarningRent />
              </div>
            </div>
        </div>
    </div>
  )
}