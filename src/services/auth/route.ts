import {
  SELLER_RESEND_OTP,
  SELLER_SEND_OTP,
  SELLER_VERIFY_OTP,
  CREATE_SUB_SELLER_URL,
  DELETE_SELLER_URL,
  GET_SELLER_URL,
  GET_CURRENT_SELLER_URL,
  LOGOUT_SELLER_URL,
  UPDATE_SUB_SELLER_URL,
} from "@/types/urlPath";
import axios from "axios";

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
}) => await API.post(SELLER_SEND_OTP, data, { withCredentials: true });



// -------------------------Verify Otp For Login---------------------------------------
export const Verify_Otp_Api = async (data: {
  phoneNumber: string | null;
  otp_Seller: string;
}) => await API.post(SELLER_VERIFY_OTP, data, { withCredentials: true });

// ------------------------- Resend Otp ---------------- ----------------
export const Resend_Otp_Api = async (email:string | null) =>
  await API.post(SELLER_RESEND_OTP, { email }, { withCredentials: true });


// -------- create sub admins ----------------
export const Create_Sub_Admins_Api = async (data: {
  email: string;
  password: string;
  name: string;
  role: string;
  pages: string[];
  mobile: string;
}) => await API.post(CREATE_SUB_SELLER_URL, data, { withCredentials: true });

// -------- update sub admins ----------------
export const Update_Sub_Admins_Api = async (data: {
  email: string;
  password: string;
  name: string;
  role: string;
  pages: string[];
  mobile: string;
},id:string) => await API.put(`${UPDATE_SUB_SELLER_URL}/${id}`, data, { withCredentials: true });

// -------- get sub admins ----------------
export const Get_Admins_Api = async () =>
  await API.get(GET_SELLER_URL, { withCredentials: true });


// ---------------- get current admin ---------------- ----------------
export const Get_Current_Admins_Api = async () =>
  await API.get(GET_CURRENT_SELLER_URL, { withCredentials: true });

// ---------------- delete sub admins ---------------- ----------------
export const Delete_Admins_Api = async (id:string) =>
  await API.delete(`${DELETE_SELLER_URL}/${id}`, { withCredentials: true });


// ------------------ logout ----------------------------------------------------
export const LogoutAdmins_Api = async () =>
  await API.post(`${LOGOUT_SELLER_URL}`,{}, { withCredentials: true });