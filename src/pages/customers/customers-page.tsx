import { CustomersTableColumn } from "@/components/tasks/table_columns/customers/customers-table-column";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { useEffect, useState } from "react";


function CustomersPage() {
    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //   console.log(users);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          "/src/components/tasks/data/user-data.json"
        ); // Replace with the appropriate API route
        const data = await response.json();
        // const validTasks = z.array(taskSchema).parse(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if(loading) return <div className="">Loading...</div>
  return (
    <div>
        <div className="text-sm font-bold p-4">
            <h1>All Customers</h1>
        </div>
        <div className="page-outer">
        <DataTable
        enableSearch
        searchWith="name"
         data={users}
         columns={CustomersTableColumn}
        
        />


        </div>
    </div>
  )
}

export default CustomersPage