import { UserManagementColumn } from '@/components/tasks/table_columns/user-management-table-column';
import { DataTable } from '@/components/tasks/task_components/data-table'
import { fetchAdminDetails } from '@/redux/actions/adminSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import  { useEffect, useState } from 'react'

export default function UserManagementTable() {
  const dispatch = useAppDispatch();
  const {admin} = useAppSelector((state)=>state.admin)
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

    // console.log(admin,'sdas');


  useEffect(() => {
    async function fetchTasks() {
      try {
     await dispatch(fetchAdminDetails())
    
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
    <div>
      <DataTable
      enableView
      columns={UserManagementColumn}
      data={admin}
      />
      {/* ===== */}
    </div>
  )
}