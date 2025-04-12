import {
  CREATE_NEW_COUPONS,
  DELETE_COUPONS,
  GET_ALL_COUPONS,
  GET_ALL_DATA_FOR_COUPONS,
  UPDATE_COUPONS,
} from "../api/coupon-urlPath";
import { API } from "../auth/route";

import { ICouponType } from "@/types/ICouponTypes";

// 1. create
export const create_Coupons_Api = async (data: Partial<ICouponType>) =>
  await API.post(CREATE_NEW_COUPONS, data, { withCredentials: true });

// 2. update
export const edit_Coupons_Api = async (
  data: Partial<ICouponType>,
  id: string
) => await API.put(`${UPDATE_COUPONS}/${id}`, data, { withCredentials: true });

export const get_Coupons_Api = async () =>
  await API.get(GET_ALL_COUPONS, { withCredentials: true });

export const delete_Coupons_Api = async (id: string) =>
  await API.delete(`${DELETE_COUPONS}/${id}`, { withCredentials: true });

// 5.
export const get_All_Data_Api = async () =>
  await API.get(`${GET_ALL_DATA_FOR_COUPONS}`, { withCredentials: true });
