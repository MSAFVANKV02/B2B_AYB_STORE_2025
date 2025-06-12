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

type Props = {
  orders: IOrders;
};

// UI label ↔️ backend value mapping
const statusOptions: { label: string; value: IOrderStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Ready to Pickup", value: "ready_to_pickup" },
  { label: "Shipped", value: "shipped" },
  { label: "Out for Delivery", value: "out_for_delivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const OrderStatusChangerWidget = ({ orders }: Props) => {
  const currentStatus = orders.store_orders?.[0]?.order_status ?? "pending";
  const [status, setStatus] = useState<IOrderStatus>(currentStatus);

  const { dispatchModal, modalState } = UseUpdateModal();

  const handleChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as IOrderStatus;
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
          {statusOptions.map(({ label, value }) => (
            <MenuItem
              key={value}
              value={value}
              disabled={value === currentStatus}
              sx={{ fontSize: "13px" }}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Modal
        open={
          modalState.isOpen &&
          modalState.type === "order-status-update" &&
          modalState.selectedModalData?.order?.order_id === orders.order_id
        }
        setOpen={(value) => {
          if (!value) {
            dispatchModal({ type: "CLOSE_MODAL" });
          }
        }}
        title="Update Order Status"
        description={`You're updating ${modalState.selectedModalData?.order?.order_id} to 
        ${modalState.selectedModalData?.status}`}
        classnameDescription="text-center"
        classnameTitle="text-center"
        footer={
            <div className="flex w-full gap-3">
          <div className="flex-1">
            <DialogClose className="w-full">
              <AyButton
              type="button"
              variant="gray"
                sx={{
                  width: "100%",
                }}
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
            >
              Yes, Submit
            </AyButton>
          </div>
        </div> 
        }
      />
    </>
  );
};

export default memo(OrderStatusChangerWidget);
