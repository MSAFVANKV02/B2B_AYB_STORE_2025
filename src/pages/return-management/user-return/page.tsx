import { getAllReturnedOrdersAction } from "@/actions/orders/ordersAction";
import CustomMainReturnTable from "@/components/tasks/table_columns/return-management/custom-main-return-table";
import { CustomerMainReturnColumn } from "@/components/tasks/table_columns/return-management/customer-main-return-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { useQueryData } from "@/hooks/useQueryData";
import useSearchFn from "@/hooks/useSeach-Fn";
import { UseUpdateModal } from "@/providers/context/modal-context";
import { useAppSelector } from "@/redux/hook";
import { IReturnOrders, IReturnOrderTypes } from "@/types/return_order_types";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import UserReturnTableDetails from "./table-details";

const UserReturnOrderPage = () => {
  const { currentAdmin } = useAppSelector((state) => state.admin);

  const { modalState } = UseUpdateModal();

  const [searchParams] = useSearchParams();
  const pageQ = searchParams.get("page") ?? "1";
  const status =
    (searchParams.get("status") as
      | "requested"
      | "refund_approved_by_store"
      | "return_approved_by_store"
      | "refund_approved_by_admin"
      | "refund_rejected_by_admin"
      | "rejected"
      | "customer_return_initiated"
      | "received"
      | "refunded"
      | "replaced"
      | "approved"
      | "all") ?? "";

  const upStatus = status === "all" ? "" : status;

  const { data: fetchedReturnOrders, isFetching } = useQueryData(
    ["return-orders", pageQ, status],
    () =>
      getAllReturnedOrdersAction([
        { key: "page", value: pageQ },
        { key: "status", value: upStatus },
        { key: "store_id", value: currentAdmin?._id ?? "" },
      ])
  );

  const { data: orders } = (fetchedReturnOrders ?? {}) as {
    status?: number;
    data?: IReturnOrderTypes;
  };

  const orderList = useMemo(() => {
    return orders?.return_orders ?? [];
  }, [orders]);

  const { filteredData: filteredReturnOrders } = useSearchFn<IReturnOrders>(
    orderList ?? []
  );

  return (
    <div className="">
      <div className="sm:p-4">
        <h1 className="font-bold text-textGray">CUSTOMER RETURNS</h1>
      </div>

      {/* <pre className="text-xs max-h-[500px] overflow-y-auto">
        {JSON.stringify(filteredReturnOrders,null,4)}
      </pre> */}

      <div className="page-outer">
        {modalState.isOpen && modalState.type === "return-product-details" ? (
          <UserReturnTableDetails />
        ) : (
          <DataTable
            enableSearch
            // enableStatusFlatStyle
            // statuses={[
            //   {
            //     label: "Approved",
            //     value: "Approved",
            //     icon: "article",
            //   },
            //   {
            //     label: "Pending",
            //     value: "requested",
            //     icon: "article",
            //   },
            // ]}
            // enableStatus
            searchWith="return_id"
            isCustomTableBody={(table, columns) => (
              <CustomMainReturnTable
                table={table}
                isLoading={isFetching}
                columns={columns}
              />
            )}
            isLoading={isFetching}
            tableCellClass="align-middle px-4 py-3"
            className="border-none"
            tableHeadClass="border-b-none text-center"
            tableRowClass="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            columns={CustomerMainReturnColumn}
            data={filteredReturnOrders}
          />
        )}
      </div>
    </div>
  );
};

export default UserReturnOrderPage;
