import { getSellerRequestForRental } from "@/actions/rental/rentalActions";

import MyPageTab from "@/components/myUi/MyTabs";
import { RentExpandRequestTableColumnSDcn } from "@/components/tasks/table_columns/rent-management/rent-expand-request-column";
import { RentRequestTableColumnSDcn } from "@/components/tasks/table_columns/rent-management/rent-request-column";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { useQueryData } from "@/hooks/useQueryData";
import { IRentTypes } from "@/types/rent-types";

const RentRequestSellerPage = () => {
  const { data: fetchedData, isPending } = useQueryData(
    ["rental-requests"],
    () => getSellerRequestForRental(),
    { disableRefetch: true }
  );

  const { data: rental } = (fetchedData ?? {}) as {
    status?: number;
    data?: IRentTypes[];
  };

  const filterExtentReq = (): IRentTypes[] => {
    return (rental ?? []).filter(
      (item) =>
        // item.extension?.isExtend === true &&
        item.extension?.action === "increase"
    );
  };

  const filterReduceReq = () => {
    return (rental ?? []).filter(
      (item) =>
        // item.extension?.isExtend === true &&
        item?.extension?.action === "decrease"
    );
  };

  return (
    <div>
      <div className="page-outer !shadow-none !bg-inherit space-y-3">
        {/* <TestData data={rental || []} /> */}
        <MyPageTab
          triggerClassName="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:rounded-full"
          tabs={[
            {
              title: "Rent Requests",
              url: "/rent/rent-requests?type=rent-requests",
              value: "rent-requests",
              children: (
                <section className="bg-white sm:px-4 dark:bg-inherit h-fit rounded-md py-4 overflow-auto lg:min-w-[calc(100vw-28rem)] ">
                  <DataTable
                    // isLoading={isFetching}
                    classNameOne="space-y-3"
                    enableDatepicker
                    searchWith={"all"}
                    enableSearch
                    columns={RentRequestTableColumnSDcn}
                    data={rental ?? []}
                    tableRowClass="capitalize h-10 py-0 text-xs mb-0 border-none"
                    tableCellClass="py-2 align-middle border-none"
                    tableHeadClass=""
                    toolBarClassName="justify-end  space-x-0 text-xs"
                    tableClass="border-none "
                    className="border-none"
                    title="Sellers Rent Table"
                    titleDivClassName="sm:px-3 px-2 sm:flex-row flex-col gap-3"
                    isLoading={isPending}
                  />
                </section>
              ),
            },
            {
              title: "Expand Requested list",
              url: "/rent/rent-requests?type=rent-expand-requests",
              value: "rent-expand-requests",
              children: (
                <section className="bg-white sm:px-4 dark:bg-inherit h-fit rounded-md py-4 overflow-auto lg:min-w-[calc(100vw-28rem)] ">
                  <DataTable
                    // isLoading={isFetching}
                    classNameOne="space-y-3"
                    enableDatepicker
                    searchWith={"all"}
                    enableSearch
                    columns={RentExpandRequestTableColumnSDcn}
                    data={filterExtentReq()}
                    tableRowClass="capitalize h-10 py-0 text-xs mb-0 border-none"
                    tableCellClass="py-2 align-middle border-none"
                    tableHeadClass=""
                    toolBarClassName="justify-end  space-x-0 text-xs"
                    tableClass="border-none "
                    className="border-none"
                    title="Sellers Rent Table"
                    titleDivClassName="sm:px-3 px-2 sm:flex-row flex-col gap-3"
                    isLoading={isPending}
                  />
                </section>
              ),
            },
            {
              title: "Reduce Requested list",
              url: "/rent/rent-requests?type=rent-reduce-requests",
              value: "rent-reduce-requests",
              children: (
                <section className="bg-white sm:px-4 dark:bg-inherit h-fit rounded-md py-4 overflow-auto lg:min-w-[calc(100vw-28rem)] ">
                  <DataTable
                    // isLoading={isFetching}
                    classNameOne="space-y-3"
                    enableDatepicker
                    searchWith={"all"}
                    enableSearch
                    columns={RentExpandRequestTableColumnSDcn}
                    data={filterReduceReq()}
                    tableRowClass="capitalize h-10 py-0 text-xs mb-0 border-none"
                    tableCellClass="py-2 align-middle border-none"
                    tableHeadClass=""
                    toolBarClassName="justify-end  space-x-0 text-xs"
                    tableClass="border-none "
                    className="border-none"
                    title="Sellers Rent Table"
                    titleDivClassName="sm:px-3 px-2 sm:flex-row flex-col gap-3"
                    isLoading={isPending}
                  />
                </section>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default RentRequestSellerPage;
