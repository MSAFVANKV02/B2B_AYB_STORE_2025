import { CREATE_MEDIA_URL, GET_MEDIA_URL } from "@/types/urlPath";
import { API } from "../auth/route";

export const Create_Media_Api = async (data:any) =>
    await API.post(`${CREATE_MEDIA_URL}`,data, { withCredentials: true });

// 2. Get media Route =================================
export const Get_Media_Api = async () =>
    await API.get(`${GET_MEDIA_URL}`, { withCredentials: true });



// export const Create_Media_Api = async (data: any) => {
//     try {
//       const response = await API.post(
//         "http://localhost:4000/product_api/media/addMedia",
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );
//       return response;
//     } catch (error) {
//       console.error(
//         "Axios error:",
//         JSON.stringify(error)
//       );
//       throw error; // Re-throw the error so it can be handled where it's called
//     }
//   };