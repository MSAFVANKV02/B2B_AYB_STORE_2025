import { AllOrderBlockSvgIcon, CancelledOrderBlockSvgIcon, DeliveredOrderBlockSvgIcon, OutForDeliveryOrderBlockSvgIcon, PendingOrderBlockSvgIcon, ReadyPickupOrderBlockSvgIcon, ReturnedOrderBlockSvgIcon, ShippedOrderBlockSvgIcon } from "@/components/icons/order-icons";
import { IOrdersType } from "@/types/orderTypes";


type Props = {
    orders?:IOrdersType
}

const AllOrdersCardBlocks = ({orders}: Props) => {

    const CardData = [
        {
          id: 1,
          label: "All orders",
          amount: orders?.orderStatusSummary.all,
          icon: <AllOrderBlockSvgIcon/> ,
          bgcolor: "#D9EDFF",
          iconIsSvg:true
        },
        {
          id: 2,
          label: "pending orders",
          amount: orders?.orderStatusSummary.pending,
          icon: <PendingOrderBlockSvgIcon/> ,
          bgcolor: "#D9EDFF",
          iconIsSvg:true
        },
        {
          id: 3,
          label: "shipped orders",
          amount: orders?.orderStatusSummary.shipped,
          icon: <ShippedOrderBlockSvgIcon/> ,
          bgcolor: "#D9EDFF",
          iconIsSvg:true
        },
        {
          id: 4,
          label: "Ready for pickup orders",
          amount: orders?.orderStatusSummary.ready_to_pickup,
          icon: <ReadyPickupOrderBlockSvgIcon /> ,
          bgcolor: "#D9EDFF",
          iconIsSvg:true
        },
        {
          id: 5,
          label: "out of delivery orders",
          amount: orders?.orderStatusSummary.out_for_delivery,
          icon: <OutForDeliveryOrderBlockSvgIcon /> ,
          bgcolor: "#D9EDFF",
          iconIsSvg:true
        },
        {
          id: 6,
          label: "Delivered orders",
          amount: orders?.orderStatusSummary.delivered,
          icon: <DeliveredOrderBlockSvgIcon /> ,
          bgcolor: "#D9EDFF",
          iconIsSvg:true
        },
        {
          id: 7,
          label: "Cancelled orders",
          amount: orders?.orderStatusSummary.cancelled,
          icon: <CancelledOrderBlockSvgIcon /> ,
          bgcolor: "#D9EDFF",
          iconIsSvg:true
        },
        {
            id: 8,
            label: "Return orders",
            amount: orders?.orderStatusSummary.returnedCount,
            icon: <ReturnedOrderBlockSvgIcon /> ,
            bgcolor: "#D9EDFF",
            iconIsSvg:true
          },
      ];
  return {
    CardData
  }
}

export default AllOrdersCardBlocks