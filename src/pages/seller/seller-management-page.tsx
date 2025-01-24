import { DataTableStore } from "@/components/tasks/task_components/store/data-table-store";
import usePageTitle from "@/hooks/usePageTitle";
import { StoreTypes } from "@/types/storeTypes";

const sellerData: StoreTypes[] = [
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

export default function SellerManagementPage() {
    usePageTitle("Ayaboo | Seller Management")
  // const [searchParams] = useSearchParams();
  // const urlType = searchParams.get("type");
  return (
    <div>
      <div className="p-4 select-none">
        <h1 className="font-bold text-textGray text-sm">Seller Management</h1>
      </div>
      {/*  */}
      <div className="page-outer">
        <DataTableStore data={sellerData} />
        {/* {urlType === "create" ? (
          <div className="">
            <StoreCreateForm />
          </div>
        ) : (
          <DataTableStore data={sellerData} />
        )} */}
      </div>
    </div>
  );
}
