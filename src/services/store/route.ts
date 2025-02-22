import { CREATE_STORE_URL } from "@/types/urlPath";
import { API } from "../auth/route";



export const Create_Store_Api = async (data:any) =>
    await API.post(`${CREATE_STORE_URL}`,data, { withCredentials: true });