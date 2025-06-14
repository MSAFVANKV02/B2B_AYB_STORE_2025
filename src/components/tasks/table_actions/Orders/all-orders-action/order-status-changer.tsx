import { IOrders, IOrderStatus } from "@/types/orderTypes";
import { memo, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { UseUpdateModal } from "@/providers/context/modal-context";
import Modal from "@/components/modals/main";
import AyButton from "@/components/myUi/AyButton";
import { DialogClose } from "@/components/ui/dialog";
import { useMutationData } from "@/hooks/useMutationData";
import { updateStoreOrderStatusAction } from "@/actions/orders/ordersAction";
import Loader from "@/components/global/loader";
import { makeToastError } from "@/utils/toaster";
import StatusOptions from "../widgets/StatusOptions";
import { STATUS_MAP } from "@/utils/orderStatusOptions";


type Props = {
  orders: IOrders;
};

// UI label ↔️ backend value mapping

const OrderStatusChangerWidget = ({ orders }: Props) => {
  const currentStatus = orders.store_orders?.[0]?.order_status ?? "pending";
  const [status, setStatus] = useState<IOrderStatus>(currentStatus);
  // const client = useQueryClient();

  const { statusOptions } = StatusOptions({
    type: orders.store_orders[0].parcel_details.shipping_method,
  });

  // const statusOptions: { id: number; label: string; value: IOrderStatus }[] = [
  //   { id: 1, label: "Pending", value: "pending" },
  //   { id: 2, label: "Processing", value: "processing" },
  //   { id: 3, label: "Ready to Pickup", value: "ready_to_pickup" },
  //   { id: 4, label: "Shipped", value: "shipped" },
  //   { id: 5, label: "Out for Delivery", value: "out_for_delivery" },
  //   { id: 6, label: "Delivered", value: "delivered" },
  //   { id: 7, label: "Cancelled", value: "cancelled" },
  // ];

  const currentStatusObj = statusOptions.find(
    (option) => option.value === currentStatus
  );
  const currentStatusId = currentStatusObj?.id ?? 1;

  const { dispatchModal, modalState } = UseUpdateModal();

  const handleChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as IOrderStatus;

    if (
      modalState.isOpen &&
      modalState.type === "order-status-update" &&
      modalState.selectedModalData?.order?.order_id === orders.order_id
    ) {
      return;
    }

    setStatus(newStatus);
    dispatchModal({
      type: "OPEN_MODAL",
      modalType: "order-status-update",
      payload: {
        status: newStatus,
        order: orders,
      },
    });
  };

  const queryKey = ["all-orders"];

  const { mutate, isPending } = useMutationData(
    ["order-status-update"],
    ({ status, store_order_id }: { store_order_id: string; status: string }) =>
      updateStoreOrderStatusAction({
        status: status,
        store_order_id: store_order_id,
      }),
    queryKey
  );

  // const handleSubmitForm = () => {
  //   if (!orders.store_orders?.[0]?.store_order_id) return;

  //   const newStatus = modalState.selectedModalData?.status as IOrderStatus;
  //   const newStatusObj = statusOptions.find((s) => s.value === newStatus);
  //   const newStatusId = newStatusObj?.id ?? 0;

  //   const currentStatusObj = statusOptions.find(
  //     (s) => s.value === currentStatus
  //   );
  //   const currentStatusId = currentStatusObj?.id ?? 0;

  //   const isCancel = newStatus === "cancelled";

  //   // Enforce strict step-by-step transition or cancel
  //   const isValidStep =
  //     newStatusId === currentStatusId + 1 || // next step only
  //     (isCancel && currentStatusId < 6); // cancel only allowed before delivered

  //   if (!isValidStep) {
  //     const nextAllowedStatus = statusOptions.find(
  //       (s) => s.id === currentStatusId + 1
  //     );
  //     makeToastError(
  //       `Invalid update! You must update to '${nextAllowedStatus?.label}' before selecting '${newStatusObj?.label}'.`
  //     );
  //     return;
  //   }

  //   mutate(
  //     {
  //       store_order_id: orders.store_orders[0]?.store_order_id,
  //       status: modalState.selectedModalData?.status,
  //     },
  //     {
  //       onSuccess: async () => {
  //         // if (modalState.type === "order-status-update") {
  //         await dispatchModal({ type: "CLOSE_MODAL" });
  //         // client.invalidateQueries({
  //         //   queryKey: queryKey,
  //         //   refetchType: "active",
  //         // });

  //         //   setStatus(currentStatus);
  //       },
  //       onError: (error) => {
  //         console.error("Failed to update order status", error);
  //         // You can optionally show a toast/snackbar here
  //       },
  //     }
  //   );
  // };

  const handleSubmitForm = () => {
    if (!orders.store_orders?.[0]?.store_order_id) return;
  
    // const shippingMethod = orders.store_orders?.[0]?.parcel_details?.shipping_method;
  
    const allowedStatusList = statusOptions.map(s => s.value); // dynamic flow
  
    const newStatus = modalState.selectedModalData?.status as IOrderStatus;
    const currentIndex = allowedStatusList.indexOf(currentStatus);
    const newIndex = allowedStatusList.indexOf(newStatus);
  
    const isCancel = newStatus === "cancelled";
    const isValidStep =
      newIndex === currentIndex + 1 || 
      (isCancel && currentIndex < allowedStatusList.indexOf("delivered"));
  
    if (!isValidStep) {
      const nextAllowedStatus = allowedStatusList[currentIndex + 1];
      const nextLabel = STATUS_MAP[nextAllowedStatus]?.label || nextAllowedStatus;
      makeToastError(
        `Invalid update! You must update to '${nextLabel}' before selecting '${STATUS_MAP[newStatus]?.label}'.`
      );
      return;
    }
  
    mutate(
      {
        store_order_id: orders.store_orders[0]?.store_order_id,
        status: newStatus,
      },
      {
        onSuccess: async () => {
          await dispatchModal({ type: "CLOSE_MODAL" });
        },
        onError: (error) => {
          console.error("Failed to update order status", error);
        },
      }
    );
  };
  

  return (
    <>
      <FormControl
        sx={{
          m: 0,
          minWidth: 140,
          backgroundColor: "#f3f3f3",
          borderRadius: "4px",
          "& .MuiSelect-select": {
            padding: "3px 10px",
            fontSize: "13px",
            fontWeight: 400,
            color: "#000",
          },
          "& fieldset": {
            //   border: "1px solid #666", // darker border
          },
          "& svg": {
            color: "#666",
            fontSize: "1rem",
          },
        }}
        size="small"
      >
        <Select
          value={status}
          onChange={handleChange}
          displayEmpty
          inputProps={{
            "aria-label": "Order status",
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                fontSize: "13px",
                "& .MuiMenuItem-root": {
                  paddingY: "5px",
                  paddingX: "12px",
                },
              },
            },
          }}
        >
          {statusOptions.map(({ id, label, value }) => {
            const isBeforeCurrent = id < currentStatusId;
            const isDelivered = currentStatus === "delivered";
            const isCancel = value === "cancelled";

            const shouldDisable =
              value === currentStatus ||
              isBeforeCurrent ||
              (isDelivered && isCancel);

            return (
              <MenuItem
                key={value}
                value={value}
                disabled={shouldDisable}
                sx={{ fontSize: "13px" }}
              >
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Modal
        open={
          modalState.isOpen &&
          modalState.type === "order-status-update" &&
          modalState.selectedModalData?.order?.order_id === orders.order_id
        }
        setOpen={(value) => {
          if (isPending) {
            return;
          }
          if (!value) {
            dispatchModal({ type: "CLOSE_MODAL" });
            setStatus(currentStatus);
          }
        }}
        title="Update Order Status"
        description={`You're updating ${modalState.selectedModalData?.order?.order_id} to 
        ${modalState.selectedModalData?.status}`}
        classnameDescription="text-center"
        classnameTitle="text-center"
        footer={
          <div className="flex w-full gap-3 mt-3">
            <div className="flex-1">
              <DialogClose className="w-full">
                <AyButton
                  type="button"
                  variant="gray"
                  sx={{
                    width: "100%",
                  }}
                  disabled={isPending}
                >
                  Close
                </AyButton>
              </DialogClose>
            </div>
            <div className="flex-1">
              <AyButton
                type="submit"
                sx={{
                  width: "100%",
                }}
                onClick={handleSubmitForm}
                disabled={isPending}
              >
                <Loader state={isPending} spinnerClassName="h-6 w-6">
                  Yes, Submit
                </Loader>
              </AyButton>
            </div>
          </div>
        }
      />
    </>
  );
};

export default memo(OrderStatusChangerWidget);
