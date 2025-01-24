import { useEffect, useMemo } from "react";
import DashSec01 from "./Dash_Sec_01";
import DashSec02 from "./Dash_Sec_02";

import { kycColumn } from "@/components/tasks/table_columns/kyc_column";
import { columns } from "@/components/tasks/table_columns/dashboard-columns";
// import { TopStoresColumn } from "@/components/tasks/table_columns/top-stores-column";
// import { TopProductsColumn } from "@/components/tasks/table_columns/top-products-column";
// import { TopSellerColumn } from "@/components/tasks/table_columns/top-seller-column";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchCustomerDetails } from "@/redux/actions/customerSlice";
import ReChartBar from "@/components/recharts/reChart_Bar";
import ReChartPie from "@/components/recharts/reChart_Pie";
import { TopProductsColumn } from "@/components/tasks/table_columns/top-products-column";
import { TopStoresColumn } from "@/components/tasks/table_columns/top-stores-column";
import { TopSellerColumn } from "@/components/tasks/table_columns/top-seller-column";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customer);
  //  const [tasks, setTasks] = useState([]);

  // // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchTasks() {
  //     try {
  //       const response = await fetch("/src/components/tasks/data/tasks.json"); // Replace with the appropriate API route
  //       const data = await response.json();
  //       const validTasks = data
  //       setTasks(validTasks);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   }

  //   fetchTasks();
  // }, []);

  const filteredCustomer = useMemo(() => {
    return customer.filter((item) => item.user.kycsubmitted);
  }, [customer]);

  useEffect(() => {
    dispatch(fetchCustomerDetails());
  }, []);

  // if (loading) return <div>Loading...</div>;

  return (
    <div className=" flex flex-col gap-6">
      <DashSec01 />

      <div className="flex lg:flex-row flex-col gap-3">
        <ReChartPie />
        <ReChartBar />
      </div>

      {/* tables starts =====
        ============== */}
      <DashSec02
        titleOne="Offline Payment "
        titleTwo="KYC verification "
        data={filteredCustomer}
        columns={columns}
        columnsTwo={kycColumn}
      />
      <DashSec02
        titleOne="Top Products "
        titleTwo="Top Stores"
        data={customer}
        columns={TopProductsColumn}
        columnsTwo={TopStoresColumn}
      />

      <DashSec02
        titleOne="Top Seller"
        tableTwo={false}
        columns={TopSellerColumn}
        columnsTwo={TopSellerColumn}
        data={customer}
      />
    </div>
  );
}
