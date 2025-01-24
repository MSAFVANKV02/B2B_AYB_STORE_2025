import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerRequestTable from "./products_tables/Seller_Request_Table";
import { useEffect, useState } from "react";
import { ProductTableColumns } from "@/components/tasks/table_columns/products-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import {  CircleOff,  ShieldCheck } from "lucide-react";

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
    }
  ]

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
      <Tabs defaultValue="approved" className="w-full">
        <TabsList className="border bg-transparent rounded-full py-7 ">
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-black py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          >
            Approved Products
          </TabsTrigger>
          <TabsTrigger
            value="request"
            className="data-[state=active]:bg-black py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          >
            Seller product request
          </TabsTrigger>
        </TabsList>

        {/* tab .1 ===== */}
        <TabsContent value="approved" className="2xl:max-w-[100%]  xl:max-w-[95%] mx-auto  max-w-[90%]">
          {/* <ApprovedProductTable columns={ProductTableColumns} data={products} /> */}
          <DataTable
            enableSearch
            columns={ProductTableColumns}
            data={products}
            searchWith="product_name"
            statuses={statuses}
            enableStatus={true}
            enableView

          />
        </TabsContent>

        {/* tab .2 ===== */}

        <TabsContent value="request">
          <SellerRequestTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
