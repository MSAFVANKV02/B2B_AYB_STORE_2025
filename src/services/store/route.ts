import { CREATE_STORE_URL, GET_ALL_STORE_URL } from "@/types/urlPath";
import { API } from "../auth/route";

type DataGet = "seller" | "store" | "storeSeller";


export const Create_Store_Api = async (data:any) =>
    await API.post(`${CREATE_STORE_URL}`,data, { withCredentials: true });

// 2. Get Store Or Seller or Completed users information

export const Get_Store_Api = async (data: DataGet) => {
    // console.log('Data sent:', data); // Log data here
    return await API.post(
      `${GET_ALL_STORE_URL}`,
      { role: data },
      { withCredentials: true }
    );
  };