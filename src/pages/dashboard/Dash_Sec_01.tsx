import Card from "@/components/cards/Card";
import OrderStatusCard from "@/components/cards/OrderStatusCard";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";



export type StatusCardProps = {
  id: number;
  icon: any;
  count?: number;
  label: string;
  discription?: string;
  className?: string;
  bgcolor: string;
  iColor: string;
};

export default function HomeSec01() {
  const { t, i18n } = useTranslation();

  const locale = i18n.language; 

  const CardData = [
    // {
    //   id: 1,
    //   label: "total revenue",
    //   amount: `0`,
    //   icon: "solar:wallet-outline",
    //   bgcolor: "var(--mainColor)",
    // },
    {
      id: 2,
      label: "Total Customers",
      amount: 0,
      icon: "fluent-mdl2:group",
      bgcolor: "var(--mainColor)",
    },
    {
      id: 4,
      label: "Total Stores",
      amount: 0,
      icon: "mynaui:store",
      bgcolor: "var(--mainColor)",
    },
    {
      id: 5,
      label: "Total Orders",
      amount: 0,
      icon: "material-symbols-light:order-approve-outline",
      bgcolor: "var(--mainColor)",
    },
    {
      id: 6,
      label: "Total Products",
      amount: 0,
      icon: "carbon:product",
      bgcolor: "var(--mainColor)",
    },
    {
      id: 7,
      label: "Total Brands",
      amount: 0,
      icon: "tdesign:root-list",
      bgcolor: "var(--mainColor)",
    },
    {
      id: 8,
      label: "Total Category",
      amount: 4,
      icon: "fluent:apps-20-regular",
      bgcolor: "var(--mainColor)",
    },
  ];

  const StatusCardData: StatusCardProps[] = [
    {
      id: 1,
      label: "Pending",
      count: 0,
      icon: "material-symbols-light:pending-actions-rounded",
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
    },
    {
      id: 2,
      label: "Processing",
      count: 0,
      icon: "fluent-mdl2:processing",
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
    },
    {
      id: 3,
      label: "Cancelled",
      count: 0,
      icon: "mdi:file-cancel",
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
    },
    {
      id: 4,
      label: "Shipped",
      count: 0,
      icon: "carbon:delivery-add",
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
    },
    {
      id: 5,
      label: "Out for delivery",
      count: 0,
      icon: "carbon:delivery",
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
    },
    {
      id: 6,
      label: "Delivered",
      count: 0,
      icon: "iconoir:delivery",
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
    },
  ];

  const formatNumber = (value:number) => {
    const formatter = new Intl.NumberFormat(locale === "ar" || locale === "ar-EG" ? "ar-EG" : locale, {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  };
  

  return (
    <div className="flex justify-between gap-6 lg:flex-row flex-col w-full">
      <section className="grid md:grid-cols-2  grid-cols-1 lg:w-[40%] w-full sm:gap-6 gap-3">
        {/* Admin data count cards */}
        {CardData.map((d, i) => (
          <Card
            key={i}
            id={d.id}
            amount={formatNumber(d.amount)}
            icon={d.icon}
            label={t(d.label)}
            className={i === 0 ? "col-span-" : ""}
            bgcolor={d.bgcolor}
          />
        ))}
      </section>

      {/* Order Status================================================= */}
      <div className="lg:w-[60%] w-full ">
        <div className="bg-white lg:p-5 sm:p-4 p-3  rounded-xl">
          <div className="flex justify-between items-center  pb-10">
            <p className="text-xl capitalize font-semibold">Order Status</p>
            <Button variant="secondary">All orders</Button>
          </div>
          {/* Order Status================================================= */}
          <section className="grid md:grid-cols-3 sm:grid-cols-2 w-full sm:gap-6 gap-3">
            {StatusCardData.map((d, i) => (
              <OrderStatusCard
                key={i}
                id={d.id}
                count={d.count}
                icon={d.icon}
                label={t(d.label)}
                bgcolor={d.bgcolor}
                iColor={d.iColor}
              />
            ))}
          </section>
        </div>
      </div>

      {/* Order Status */}
    </div>
  );
}
