// statusOptions.ts

import { IOrderStatus } from "@/types/orderTypes";

export const STATUS_MAP: Record<IOrderStatus, { id: number; label: string }> = {
  pending: { id: 1, label: "Pending" },
  processing: { id: 2, label: "Processing" },
  ready_to_pickup: { id: 3, label: "Ready to Pickup" },
  shipped: { id: 4, label: "Shipped" },
  out_for_delivery: { id: 5, label: "Out for Delivery" },
  delivered: { id: 6, label: "Delivered" },
  cancelled: { id: 7, label: "Cancelled" },
};

export const DOOR_DELIVERY_STATUSES: IOrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export const STORE_PICKUP_STATUSES: IOrderStatus[] = [
  "pending",
  "processing",
  "ready_to_pickup",
  "delivered",
  "cancelled",
];

export const getStatusOptions = (
  method: "parcel_pickup" | "store_pickup" | "custom" | ""
): { id: number; label: string; value: IOrderStatus }[] => {
  const selectedStatuses =
    method === "parcel_pickup"
      ? DOOR_DELIVERY_STATUSES
      : method === "store_pickup"
      ? STORE_PICKUP_STATUSES
      : [];

  return selectedStatuses.map((status) => ({
    id: STATUS_MAP[status].id,
    label: STATUS_MAP[status].label,
    value: status,
  }));
};
