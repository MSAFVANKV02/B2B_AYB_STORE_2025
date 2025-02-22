import { useSearchParams } from "react-router-dom";
import OfflineTab from "./Offline_Tab";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { OfflinePaymentColumns } from "@/components/tasks/table_columns/payments/offline-payment-columns";

import { useEffect, useState } from "react";
import OfflineSetupForm from "./Offline_Setup_Form";

export default function OfflinePaymentPage() {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get("type") as
    | "offline"
    | "offline-setup"
    | null;
  // const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/src/components/tasks/data/tasks.json"); // Replace with the appropriate API route
        const data = await response.json();
        const validTasks = data
        setTasks(validTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const renderOfflineTabes = () => {
    switch (urlTypes) {
      case "offline":
        return <DataTable columns={OfflinePaymentColumns} data={tasks} />;
      case "offline-setup":
        return <OfflineSetupForm/>;
      default:
        return <DataTable columns={OfflinePaymentColumns} data={tasks} />;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className=""></div>
      {/*  */}
      <div className="page-outer">
        <OfflineTab activeTab={urlTypes || "offline"} />
        <div className="py-4">{renderOfflineTabes()}</div>
      </div>
    </div>
  );
}
