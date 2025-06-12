import { getAllOrdersAction } from "@/actions/orders/ordersAction";
import Card from "@/components/cards/Card";
import { AllOrdersTableColumnSDcn } from "@/components/tasks/table_columns/ordes/all-orders-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { useQueryData } from "@/hooks/useQueryData";
import { IFlatOrderItem, IOrders, IOrdersType } from "@/types/orderTypes";
import AllOrdersCardBlocks from "@/utils/dashboard/all-order-blocks";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const AllOrderPage = () => {
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  const locale = i18n.language;

  const formatNumber = (value: number) => {
    const formatter = new Intl.NumberFormat(
      locale === "ar" || locale === "ar-EG" ? "ar-EG" : locale,
      {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );
    return formatter.format(value);
  };

  const pageQ = searchParams.get("page") ?? "1";
  const type = searchParams.get("type") ?? "";

  const { data: fetchedAllOrders, isFetching } = useQueryData(
    ["all-orders", pageQ, type],
    () =>
      getAllOrdersAction([
        { key: "page", value: pageQ },
        { key: "status", value: type },
        // {key:"limit", value: "1"},
      ]),
    { disableRefetch: true }
  );

  // const { data: fetchedAllOrders, isFetching } = useQueryData(
  //   ["all-orders"],
  //   async () => {
  //     const res = await getAllOrdersAction([
  //       { key: "page", value: pageQ },
  //       { key: "status", value: type },
  //       // {key:"limit", value: "1"},
  //     ]);
  //     if (res?.status === 200 && res.data) {
  //       const filteredItems: IFlatOrderItem[] = res.data.orders.flatMap(
  //         (order: IOrders) =>
  //           order.store_orders
  //             .filter((store) => store.store_order_id)
  //             .flatMap((store) =>
  //               store.items.map((item, index) => ({
  //                 ...item,
  //                 store,
  //                 order,
  //                 showVerifiedLabel: index === 0,
  //               }))
  //             )
  //       );
  //       return { status: res.status, data: filteredItems };
  //     }
  //     return { status: 500, data: [] };
  //   }
  //   // { disableRefetch: true }
  // );

  const { data: fetchedOrdersData } = (fetchedAllOrders ?? {}) as {
    status?: number;
    data?: IOrdersType;
  };

  const { CardData } = AllOrdersCardBlocks({ orders: fetchedOrdersData });

  // console.log(fetchedOrdersData);

  return (
    <div className="2xl:px-20 md:px-10 px-3 space-y-5">
      {/* <pre className="h-[400px] text-xs overflow-auto">
        {JSON.stringify(fetchedOrdersData, null, 4)}
      </pre> */}
      <div className="">
        <h1 className="font-bold text-xl uppercase">Order List</h1>
      </div>
      <section className="grid md:grid-cols-4  grid-cols-1 w-full sm:gap-6 gap-3">
        {/* Admin data count cards */}
        {CardData.map((d, i) => (
          <Card
            key={i}
            iconIsSvg={d.iconIsSvg}
            id={d.id}
            amount={formatNumber(d.amount ?? 0)}
            icon={d.icon}
            label={t(d.label)}
            className={`${
              i === 0 ? "col-span-" : ""
            } capitalize shadow-[0px_8px_64px_0px_rgba(15,34,67,0.04)] dark:bg-inherit border bg-white `}
            bgcolor={d.bgcolor}
          />
        ))}
      </section>

      <section className="bg-white dark:bg-inherit h-fit rounded-md py-3  ">
        <DataTable
          classNameOne="space-y-3"
          enableDatepicker
          searchWith={"all"}
          enableSearch
          columns={AllOrdersTableColumnSDcn}
          data={fetchedOrdersData?.orders ?? []}
          tableRowClass="capitalize h-10 py-0 text-xs mb-0 border-none"
          tableCellClass="py-2 align-middle border-none"
          tableHeadClass=""
          toolBarClassName="justify-end "
          tableClass="border-none "
          className="border-none"
          title="All Orders list"
          titleDivClassName="px-3"
        />
      </section>
    </div>
  );
};

export default AllOrderPage;
