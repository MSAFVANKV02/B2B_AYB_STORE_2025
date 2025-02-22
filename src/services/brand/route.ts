import {
  CREATE_BRAND_URL,
  GET_BRAND_URL,
  HARD_DELETE_ALL_BRAND_URL,
  HARD_DELETE_SINGLE_BRAND_URL,
  SOFT_DELETE_SINGLE_BRAND_URL,
  UPDATE_BRAND_URL,
} from "@/types/urlPath";
import { API } from "../auth/route";
import { IBrandGetStatus } from "@/types/brandtypes";

export const create_Brand_Api = async (data: {
  name: string;
  logo: string;
  trademarkNumber: string;
  trademarkCertificate: string;
  certificateOwnerName: string;
  nonObjectiveDocument: string;
}) => await API.post(CREATE_BRAND_URL, data, { withCredentials: true });

//   2. Get all Brands =
export const get_Brand_Api = async (status:IBrandGetStatus) =>
  await API.post(GET_BRAND_URL, status , { withCredentials: true });

// 3. soft delete single brand
export const soft_Delete_Single_Brand_Api = async (id: string) =>
  await API.put(`${SOFT_DELETE_SINGLE_BRAND_URL}/${id}`, {
    withCredentials: true,
  });

// 4. hard delete all brands
export const hard_Delete_All_Brand_Api = async () =>
  await API.put(`${HARD_DELETE_ALL_BRAND_URL}`, { withCredentials: true });

// 5. hard delete single brand

export const hard_Delete_Single_Brand_Api = async (id: string) =>
  await API.delete(`${HARD_DELETE_SINGLE_BRAND_URL}/${id}`, {
    withCredentials: true,
  });


  // 6. update brands 
export const update_Brand_Api = async (data: {
  name: string;
  logo: string;
  trademarkNumber: string;
  trademarkCertificate: string;
  certificateOwnerName: string;
  nonObjectiveDocument: string;
},id:string) =>
  await API.put(`${UPDATE_BRAND_URL}/${id}`, data , { withCredentials: true });