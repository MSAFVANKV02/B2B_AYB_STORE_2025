import { getAllOrdersAction } from "@/actions/orders/ordersAction";
import Card from "@/components/cards/Card";
import { useQueryData } from "@/hooks/useQueryData";
import { IOrdersType } from "@/types/orderTypes";
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
  const type = searchParams.get("type") ?? "pending";

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

  const { data: fetchedOrdersData } = (fetchedAllOrders ?? {}) as {
    status?: number;
    data?: IOrdersType;
  };

  const { CardData } = AllOrdersCardBlocks({ orders: fetchedOrdersData });

  return (
    <div className="2xl:px-20 md:px-10 px-3 space-y-5">
      {/* <pre className="h-[400px] text-xs overflow-auto">
        {
            JSON.stringify(fetchedOrdersData,null,4)
        }
    </pre> */}
      <div className="">
        <h1 className="font-bold text-xl">Order LIST</h1>
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
    </div>
  );
};

export default AllOrderPage;
