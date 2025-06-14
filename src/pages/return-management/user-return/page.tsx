import { getAllReturnedOrdersAction } from "@/actions/orders/ordersAction";
import CustomMainReturnTable from "@/components/tasks/table_columns/return-management/custom-main-return-table";
import { CustomerMainReturnColumn } from "@/components/tasks/table_columns/return-management/customer-main-return-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { useQueryData } from "@/hooks/useQueryData";
import { UseUpdateModal } from "@/providers/context/modal-context";
import { useAppSelector } from "@/redux/hook";
import {  IReturnOrderTypes } from "@/types/return_order_types";
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

  // const computedOrderList = useMemo(() => {
  //   return (orderList ?? []).map((order) => {
  //     const allDetails = order.items.flatMap((item) =>
  //       item.product.variations.flatMap((variation) => variation.details)
  //     );
  
  //     const returnedDetails = allDetails.filter(
  //       (detail) => detail.returned_quantity > 0
  //     );
  
  //     const approved = returnedDetails.filter(
  //       (d) =>
  //         d.return_status === "refund_approved_by_admin" ||
  //         d.return_status === "refund_approved_by_store" ||
  //         d.return_status === "return_approved_by_store" ||
  //         d.return_status === "refunded" ||
  //         d.return_status === "replaced"
  //     ).length;
  
  //     const rejected = returnedDetails.filter(
  //       (d) =>
  //         d.return_status === "refund_rejected_by_admin" ||
  //         d.return_status === "rejected"
  //     ).length;

  //     console.log(rejected,'rejected');
      
  
  //     const pending = returnedDetails.filter((d) =>
  //       ["requested"].includes(d.return_status)
  //     ).length;
  
  //     let computedStatus = "";
  //     if (approved > 0 && pending === 0 && rejected === 0) computedStatus = "approved";
  //     else if (rejected > 0 && approved === 0 && pending === 0) computedStatus = "rejected";
  //     else computedStatus = "requested";
  
  //     return {
  //       ...order,
  //       status: computedStatus, // 💡 Inject computed status
  //     };
  //   });
  // }, [orderList]);


  // corrected version one below
  // const computedOrderList = useMemo(() => {
  //   return (orderList ?? []).map((order) => {
  //     const allDetails = order.items.flatMap((item) =>
  //       item.product.variations.flatMap((variation) => variation.details)
  //     );
  
  //     const returnedDetails = allDetails.filter(
  //       (detail) => detail.returned_quantity > 0
  //     );
  
  //     const statusSet = new Set<string>();
  
  //     returnedDetails.forEach((detail) => {
  //       const s = detail.return_status;
  //       if (["requested", "customer_return_initiated"].includes(s)) {
  //         statusSet.add("Requested");
  //       } else if (
  //         [
  //           "refund_approved_by_store",
  //           "return_approved_by_store",
  //           "refund_approved_by_admin",
  //           "refunded",
  //           "replaced",
  //           "received",
  //         ].includes(s)
  //       ) {
  //         statusSet.add("Approved");
  //       } else if (["refund_rejected_by_admin", "rejected"].includes(s)) {
  //         statusSet.add("Rejected");
  //       }
  //     });
  
  //     return {
  //       ...order,
  //       status: Array.from(statusSet), // Final array like ["Requested", "Approved"]
  //     };
  //   });
  // }, [orderList]);
  const computedOrderList = useMemo(() => {
    return (orderList ?? []).map((order) => {
      const allDetails = order.items.flatMap((item) =>
        item.product.variations.flatMap((variation) => variation.details)
      );
  
      const returnedDetails = allDetails.filter(
        (detail) => detail.returned_quantity > 0
      );
  
      const statusSet = new Set<string>();
  
      returnedDetails.forEach((detail) => {
        const s = detail.return_status;
  
        // Main status categories
        if (["requested", "customer_return_initiated"].includes(s)) {
          statusSet.add("Requested");
        } else if (
          [
            "refund_approved_by_store",
            "return_approved_by_store",
            "refund_approved_by_admin",
            "refunded",
            "replaced",
            "received",
          ].includes(s)
        ) {
          statusSet.add("Approved");
        } else if (["refund_rejected_by_admin", "rejected"].includes(s)) {
          statusSet.add("Rejected");
        }
  
        // Add return mode directly
        if (detail.return_mode === "refund") {
          statusSet.add("Refund");
        }
        if (detail.return_mode === "replace") {
          statusSet.add("Replacement");
        }
      });
  
      return {
        ...order,
        status: Array.from(statusSet), // e.g. ["Approved", "refund"]
      };
    });
  }, [orderList]);
  
  return (
    <div className="">
      <div className="sm:p-4">
        <h1 className="font-bold text-textGray">CUSTOMER RETURNS</h1>
      </div>

      {/* <pre className="text-[10px] max-h-[500px] overflow-y-auto">
        {JSON.stringify(computedOrderList,null,4)}
      </pre> */}

      <div className="page-outer dark:bg-neutral-300/20 dark:text-neutral-300 dark:border">
        {modalState.isOpen && modalState.type === "return-product-details" ? (
          <UserReturnTableDetails />
        ) : (
          <DataTable
            enableSearch
            enableStatusFlatStyle
            statuses={[
              { label: "Requested", value: "Requested", icon: "article" },
              { label: "Approved", value: "Approved", icon: "article" },
              { label: "Rejected", value: "Rejected", icon: "article" },
            ]}
            
            
            enableStatus
            searchWith="all"
            isCustomTableBody={(table, columns) => (
              <CustomMainReturnTable
                table={table}
                isLoading={isFetching}
                columns={columns}
                tableHeadClass="dark:text-neutral-300 "
                tableHeadRowClass="dark:text-neutral-300"
                tableRowClass=" dark:bg-neutral-400/20 dark:hover:bg-neutral-400/30  
                bg-neutral-300/20 hover:bg-neutral-300/30
                 text-neutral-600 dark:text-neutral-300 backdrop-blur-[1px] border border-neutral-400/20 "
              />
            )}
            isLoading={isFetching}
            tableCellClass="align-middle px-4 py-3"
            className="border-none"
            tableHeadClass="border-b-none text-center"
            titleDivClassName="justify-normal"
            tableRowClass="bg-white dark:bg-inherit border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            columns={CustomerMainReturnColumn}
            data={computedOrderList}
          />
        )}
      </div>
    </div>
  );
};

export default UserReturnOrderPage;
