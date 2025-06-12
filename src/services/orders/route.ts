import { API } from "../auth/route";
import {
  GET_ALL_ORDERS_URL,
  GET_ALL_RETURN_ORDERS_URL,
  RETURN_ORDERS_ACTION_URL,
  UPDATE_STORE_ORDER_STATUS_URL,
} from "../api/orde-urlPath";
import { IFilterOrders } from "@/types/orderTypes";
import { ReturnActionFormData } from "@/pages/return-management/user-return/table-details";

export const get_All_Order_Api = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  const params: Record<string, string> = {};

  if (filter) {
    filter.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return await API.get(GET_ALL_ORDERS_URL, { params, withCredentials: true });
};

export const get_All_Return_Orders_Api = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  const params: Record<string, string> = {};

  if (filter) {
    filter.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return await API.get(GET_ALL_RETURN_ORDERS_URL, {
    params,
    withCredentials: true,
  });
};

export const patch_Return_Action_Api = async (data: ReturnActionFormData[]) =>
  await API.patch(RETURN_ORDERS_ACTION_URL, data, {
    withCredentials: true,
  });

export const patch_update_order_Status_Api = async ({
  status,
  store_order_id,
}: {
  store_order_id: string;
  status: string;
}) =>
  await API.patch(
    `${UPDATE_STORE_ORDER_STATUS_URL}/${store_order_id}/status/${status}`,
    {  },
    {
      withCredentials: true,
    }
  );
