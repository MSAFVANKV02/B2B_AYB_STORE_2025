import { kycColumn } from "@/components/tasks/table_columns/kyc_column";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { fetchCustomerDetails } from "@/redux/actions/customerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useMemo } from "react";

export default function KycPage() {
  const dispatch = useAppDispatch();
  const { customer, isLoading, error } = useAppSelector((state) => state.customer);

  // Fetch customer details on mount
  useEffect(() => {
    dispatch(fetchCustomerDetails());
  }, [dispatch]);

  // Filter customers who have submitted KYC
  const filteredCustomer = useMemo(() => {
    return customer.filter((item) => item.user.kycsubmitted);
  }, [customer]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="">
        <h1 className="p-4 font-bold select-none">KYC Verification</h1>
      </div>
      <div className="page-outer">
        <DataTable
          data={filteredCustomer} // Use filtered data
          columns={kycColumn}
          enableSearch
          searchWith="businessName"
          enableView
        />
      </div>
    </div>
  );
}
