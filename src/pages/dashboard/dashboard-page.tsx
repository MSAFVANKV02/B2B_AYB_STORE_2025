import DashSec01 from "./Dash_Sec_01";
// import DashSec02 from "./Dash_Sec_02";

// import { useAppSelector } from "@/redux/hook";

import ReChartBar from "@/components/recharts/reChart_Bar";
import ReChartPie from "@/components/recharts/reChart_Pie";
// import { TopProductsColumn } from "@/components/tasks/table_columns/top-products-column";
// import { TopStoresColumn } from "@/components/tasks/table_columns/top-stores-column";
// import { LowQtyStockColumn } from "@/components/tasks/table_columns/dashboard/low-qty-stock-column";

export default function DashboardPage() {
  // const dispatch = useAppDispatch();
  // const { customer } = useAppSelector((state) => state.customer);
  //  const [tasks, setTasks] = useState([]);

  // const filteredCustomer = useMemo(() => {
  //   return customer.filter((item) => item.user.kycsubmitted);
  // }, [customer]);

  // useEffect(() => {
  //   dispatch(fetchCustomerDetails());
  // }, []);

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

      {/* <DashSec02
        titleOne="Top Products "
        titleTwo="Top Stores"
        data={customer}
        columns={TopProductsColumn}
        columnsTwo={TopStoresColumn}
      />

      <DashSec02
        titleOne="Low Quantity Stock"
        tableTwo={false}
        columns={LowQtyStockColumn}
        columnsTwo={LowQtyStockColumn}
        data={customer}
      /> */}
    </div>
  );
}
