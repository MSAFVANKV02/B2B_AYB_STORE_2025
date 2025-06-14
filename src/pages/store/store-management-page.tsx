import DataTableStore from "@/components/tasks/task_components/store/data-table-store";
import usePageTitle from "@/hooks/usePageTitle";

import { ProductLocalType } from "../reports/product-sale/product-sale-page";
import MyTabs from "@/components/myUi/MyTabs";


const sampleData: ProductLocalType[] = [
  {
    name: "Product A",
    sku: "PA-001",
    price: 49.99,
    stock: 100,
    category: "Electronics",
    unitsSold: 1405,
    revenue: 142305,
    avgSalePerCustomer: 1232.3,
    returnRate: "7.5%",
    variants: [
      { name: "Grey", sku: "PA-001-GR", price: 50, stock: 20 },
      { name: "Red", sku: "PA-001-RD", price: 55, stock: 15 },
    ],
  },
  {
    name: "Product B",
    sku: "PB-001",
    price: 29.99,
    stock: 200,
    category: "Clothing",
    unitsSold: 1200,
    revenue: 119988,
    avgSalePerCustomer: 999.9,
    returnRate: "5.0%",
    variants: [
      { name: "Blue", sku: "PB-001-BL", price: 30, stock: 50 },
      { name: "Green", sku: "PB-001-GR", price: 35, stock: 30 },
    ],
  },
];

export default function StoreManagementPage() {
  // const [selectedTab, setSelectedTab] = useState("")
  usePageTitle("Ayaboo  | Seller-store-request ");
  // const [searchParams] = useSearchParams();
  // const urlType = searchParams.get("type");
  return (
    <div>
      <div className="p-4 select-none">
        <h1 className="font-bold text-textGray text-sm">Store Management</h1>
      </div>
      {/*  */}
      <div className="page-outer">
        <MyTabs
        // setTypeUrl={setSelectedTab}
          tabs={[
            {
              value: "seller-request",
              title: "Request",
              url: "/seller/stock-request?type=seller-request",
              children: <div className="w-full">
                <DataTableStore data={sampleData} />
              </div>,
            },
            {
              value: "send-request",
              title: "Sent requests",
              url: "/seller/stock-request?type=send-request",
            },
            
          ]}
        />
        {/* <DataTableStore data={storeData} /> */}
       
      </div>
    </div>
  );
}
