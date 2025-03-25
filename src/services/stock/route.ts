import { IStockStatusTypes } from "@/types/stock_types";
import {
  GET_REQUESTED_STOCK_PRODUCT_URL,
  RECEIVE_TRANSACTED_STOCK_URL,
  REQUEST_PRODUCT_STOCK_URL,
  STORE_PURCHASED_STOCK_URL,
} from "../api/stock-urlPath";
import { API } from "../auth/route";
import { IRequestProductType } from "../products/type";

export const send_Request_Product_Stock_Api = async (
  data: IRequestProductType
) =>
  await API.post(`${REQUEST_PRODUCT_STOCK_URL}`, data, {
    withCredentials: true,
  });

// ======== 2
export const get_Requested_Product_Api = async () =>
  await API.get(`${GET_REQUESTED_STOCK_PRODUCT_URL}`, {
    withCredentials: true,
  });

// 3
  export const receive_Transacted_Stock_Api = async (id:string,status:IStockStatusTypes) =>
    await API.put(`${RECEIVE_TRANSACTED_STOCK_URL}/${id}`,{status:status}, {
      withCredentials: true,
    });

    // 4 === store purchased product route
    // ======== 2
export const get_Store_Purchased_Product_Api = async () =>
  await API.get(`${STORE_PURCHASED_STOCK_URL}`, {
    withCredentials: true,
  });