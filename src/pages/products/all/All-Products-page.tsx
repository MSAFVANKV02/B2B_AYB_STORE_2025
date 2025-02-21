

import SellerRequestTable from "./products_tables/Seller_Request_Table";
import { useEffect, useState } from "react";
import { ProductTableColumns } from "@/components/tasks/table_columns/products-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { CircleOff, ShieldCheck } from "lucide-react";
import MyPageTab from "@/components/myUi/MyTabs";

const statuses = [
  {
    value: "active",
    label: "Active",
    icon: ShieldCheck,
  },
  {
    value: "hold",
    label: "Hold",
    icon: CircleOff,
  },
];

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //   console.log(products);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          "/src/components/tasks/data/productData.json"
        ); // Replace with the appropriate API route
        const data = await response.json();
        // const validTasks = z.array(taskSchema).parse(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white rounded-md p-3">
     
       
        <MyPageTab
          // setTypeUrl={setSelectedTab}
          tabs={[
            {
              value: "all-product",
              title: "All Product",
              url: "/products/all?type=all-product",
              children: (
                <div className="w-full">
                  <DataTable
                    enableSearch
                    columns={ProductTableColumns}
                    data={products}
                    searchWith="product_name"
                    statuses={statuses}
                    enableStatus={true}
                    enableView
                  />
                </div>
              ),
            },
            {
              value: "requested-product",
              title: "Store product request",
              url: "/products/all?type=requested-product",
              children: (
                <div className="w-full">
                  <SellerRequestTable />
                </div>
              ),
            },
           
            {
              value: "new-product",
              title: "New Product",
              url: "/products/all?type=new-product",
              children: (
                <div className="w-full">
                  <SellerRequestTable />
                </div>
              ),
            },
          ]}
        />

      
    </div>
  );
}
