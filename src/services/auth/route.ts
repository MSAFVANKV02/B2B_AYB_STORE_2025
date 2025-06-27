import {
  STORE_RESEND_OTP,
  STORE_VERIFY_OTP,
  CREATE_SUB_STORE_URL,
  DELETE_STORE_URL,
  GET_STORE_URL,
  GET_CURRENT_STORE_URL,
  LOGOUT_STORE_URL,
  UPDATE_SUB_STORE_URL,
  STORE_SEND_OTP,
} from "@/services/api/urlPath";
import axios from "axios";


export type IGetAllFilterKey =
  | "category"
  | "product"
  | "brand"
  | "color"
  | "sort"
  | "page"
  | "limit"
  | "is_todays_deal"
  | "is_cod"
  | "is_free_shipping"
  | "is_featured_product"
  | "is_featured_product"
  | "is_best_selling"
  | "";

export const API = axios.create({
  baseURL: `${
    import.meta.env.MODE == "development"
      ? "http://localhost:4000"
      : "https://gateway.ayaboo.com"
  }`,
});
// -------------------------Send Otp For Registration---------------------------------------
export const SendOtp_Login_Api = async (data: {
  emailId: string;
  password: string;
}) => await API.post(STORE_SEND_OTP, data, { withCredentials: true });



// -------------------------Verify Otp For Login---------------------------------------
export const Verify_Otp_Api = async (data: {
  phoneNumber: string | null;
  otp_Store: string;
}) => await API.post(STORE_VERIFY_OTP, data, { withCredentials: true });

// ------------------------- Resend Otp ---------------- ----------------
export const Resend_Otp_Api = async (email:string | null) =>
  await API.post(STORE_RESEND_OTP, { email }, { withCredentials: true });


// -------- create sub admins ----------------
export const Create_Sub_Admins_Api = async (data: {
  email: string;
  password: string;
  name: string;
  role: string;
  pages: string[];
  mobile: string;
}) => await API.post(CREATE_SUB_STORE_URL, data, { withCredentials: true });

// -------- update sub admins ----------------
export const Update_Sub_Admins_Api = async (data: {
  email: string;
  password: string;
  name: string;
  role: string;
  pages: string[];
  mobile: string;
},id:string) => await API.put(`${UPDATE_SUB_STORE_URL}/${id}`, data, { withCredentials: true });

// -------- get sub admins ----------------
export const Get_Admins_Api = async () =>
  await API.get(GET_STORE_URL, { withCredentials: true });


// ---------------- get current admin ---------------- ----------------
export const Get_Current_Admins_Api = async () =>
  await API.get(GET_CURRENT_STORE_URL, { withCredentials: true });

// ---------------- delete sub admins ---------------- ----------------
export const Delete_Admins_Api = async (id:string) =>
  await API.delete(`${DELETE_STORE_URL}/${id}`, { withCredentials: true });


// ------------------ logout ----------------------------------------------------
export const LogoutAdmins_Api = async () =>
  await API.post(`${LOGOUT_STORE_URL}`,{}, { withCredentials: true });

