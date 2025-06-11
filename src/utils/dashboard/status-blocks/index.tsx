import {
  OrderCancelledIcon,
  OrderDeliveredIcon,
  OrderOutForDeliveryIcon,
  OrderPendingIcon,
  OrderProcessingIcon,
  OrderShippedIcon,
  RentExpireIcon,
  RentTotalSpaceIcon,
  RentTotalStoreIcon,
  TodaysEarningsIcon,
} from "@/components/icons/dashboard-icons";

export type StatusCardProps = {
  id: number;
  icon: any;
  count?: number;
  label: string;
  description?: string;
  className?: string;
  bgcolor: string;
  iColor: string;
  iconIsSvg?: boolean;
};
const StatusBlocksDashboard01 = () => {
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
      // icon: "material-symbols-light:pending-actions-rounded",
      icon: <OrderPendingIcon />,
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
      iconIsSvg: true,
    },
    {
      id: 2,
      label: "Processing",
      count: 0,
      // icon: "fluent-mdl2:processing",
      icon: <OrderProcessingIcon />,
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
      iconIsSvg: true,
    },
    {
      id: 3,
      label: "Cancelled",
      count: 0,
      // icon: "mdi:file-cancel",
      icon: <OrderCancelledIcon />,
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
      iconIsSvg: true,
    },
    {
      id: 4,
      label: "Shipped",
      count: 0,
      // icon: "carbon:delivery-add",
      icon: <OrderShippedIcon />,
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
      iconIsSvg: true,
    },
    {
      id: 5,
      label: "Out for delivery",
      count: 0,
      // icon: "carbon:delivery",
      icon: <OrderOutForDeliveryIcon />,
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
      iconIsSvg: true,
    },
    {
      id: 6,
      label: "Delivered",
      count: 0,
      // icon: "iconoir:delivery",
      icon: <OrderDeliveredIcon />,
      bgcolor: "#fff",
      iColor: "var(--mainColor)",
      iconIsSvg: true,
    },
  ];

  const earningsData = [
    {
      id: 1,
      label: "Total",
      subTitle: "Earnings",
      amount: "$1,99,99,99",
      icon: undefined,
      bgcolor: "#FFE2E5",
      textFootColor: "black",
    },
    {
      id: 2,
      label: "Last Week",
      subTitle: "Earnings",
      amount: "$300",
      icon: undefined,
      bgcolor: "#FFF4DE",
      textFootColor: "black",
    },
    {
      id: 3,
      label: "Todays",
      subTitle: "Earnings",
      amount: "$300",
      icon: <TodaysEarningsIcon />,
      bgcolor: "#DCFCE7",
      textFootColor: "#3CD856",
    },
  ];

  const rentData = [
    {
      id: 1,
      label: "Total Stores",
      subTitle: `Rented`,
      footerContent: "5 Store",
      icon: <RentTotalStoreIcon />,
      bgcolor: "",
      textFootColor: "black",
    },
    {
      id: 2,
      label: "Total Space",
      subTitle: `Rented`,
      footerContent: "10 m³",
      icon: <RentTotalSpaceIcon />,
      bgcolor: "",
      textFootColor: "black",
    },
    {
      id: 3,
      label: "Rent Expiring",
      subTitle: `Soon`,
      footerContent: "2 Entries",
      icon: <RentExpireIcon />,
      bgcolor: "",
      textFootColor: "#FF1B00",
    },
  ];

  const rentStatus = [
    {
      id: 1,
      label: "Active",
      amount: 3,
      color:"#10B981"
    },
    {
      id: 1,
      label: "Expiring",
      amount: 3,
      color:"#FBBF24"
    },
    {
      id: 1,
      label: "Expired",
      amount: 3,
      color:"#EF4444"
    },
    {
      id: 1,
      label: "Vacate Requested",
      amount: 3,
      color:"#3B82F6"
    },
  ];

  return {
    CardData,
    StatusCardData,
    earningsData,
    rentData,
    rentStatus,
  };
};

export default StatusBlocksDashboard01;
