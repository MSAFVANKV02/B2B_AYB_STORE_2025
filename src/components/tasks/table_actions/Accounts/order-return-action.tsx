import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/providers/context/context";
import { IOrders } from "@/types/orderTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton } from "@mui/material";
import { useState } from "react";
import ReturnModalTypeAll from "@/components/modals/orders/Return_Modal_Type_All";
import { useSearchParams } from "react-router-dom";
import ReturnModalTypeRefund from "@/components/modals/orders/Return_Modal_Type_Refund";
import ReturnModalTypeReplace from "@/components/modals/orders/Return_Modal_Type_Replace";

type Props = {
  order: IOrders;
};

export default function OrderReturnAction({ order }: Props) {
  const { setIsOpen } = useModal(); // Ensure the modal state management works
  const [selectedOrder, setSelectedOrder] = useState<IOrders | null>(null); // To hold the selected order
  const [searchParams] = useSearchParams();
  //   const [returnPages, setReturnPages] = useState<"all" | "replace" | "refund">(
  //     "all"
  //   );
  const returnTypeFilter = searchParams.get("return") as
    | "all"
    | "replace"
    | "refund"
    | null;

  const showOrderDetails = (order: IOrders) => {
    setIsOpen(true);
    setSelectedOrder(order); // Set the selected order
  };

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="">
          <IconButton>
            <Icon icon="mi:options-vertical" />
          </IconButton>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10">
          <DropdownMenuItem
            className="text-xs px-3 cursor-pointer"
            onClick={() => showOrderDetails(order)} // Trigger the modal
          >
            View
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
            className="text-xs px-3 cursor-pointer"
            onClick={() => console.log("Delete action triggered")}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedOrder && (
        <>
          {returnTypeFilter === "replace" ? (
            <ReturnModalTypeReplace
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          ) : returnTypeFilter === "refund" ? (
            <ReturnModalTypeRefund
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          ) : (
            <ReturnModalTypeAll
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          )}
        </>
      )}
    </div>
  );
}
