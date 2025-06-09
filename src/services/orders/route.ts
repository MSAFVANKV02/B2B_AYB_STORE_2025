
import { API } from "../auth/route";
import { GET_ALL_RETURN_ORDERS_URL } from "../api/orde-urlPath";
import { IFilterOrders } from "@/types/orderTypes";

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