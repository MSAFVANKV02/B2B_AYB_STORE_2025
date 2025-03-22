import { CREATE_MEDIA_URL, DELETE_MEDIA_URL, DELETE_MULTIPLE_MEDIA_URL, GET_MEDIA_BY_ID_URL, GET_MEDIA_URL } from "@/services/api/urlPath";
import { API } from "../auth/route";
import Cookies from "js-cookie";

export const Create_Media_Api = async (data:any) => {
    const token = Cookies.get("st_b2b_tkn"); // Get only 'st_b2b_tkn'
    // console.log(token,'token');
    
  
    return await API.post(`${CREATE_MEDIA_URL}`, data, {
      headers: {
        Authorization: `st_b2b_tkn=${token}`, // Send token in Authorization header
      },
    });
  };

// 2. Get media Route =================================
export const Get_Media_Api = async () =>
    await API.get(`${GET_MEDIA_URL}`, { withCredentials: true });

// 3. get all media by user id Route =================================

export const Get_Media_By_Id_Api = async (id:string) =>
  await API.get(`${GET_MEDIA_BY_ID_URL}/${id}`, { withCredentials: true });


export const Delete_Media_Api = async (id:string) =>
    await API.delete(`${DELETE_MEDIA_URL}/${id}`, { withCredentials: true });

// ---- delete with selected ids =================================
export const Delete_Media_Selected_Ids_Api = async (ids: string[]) =>
  await API.delete(`${DELETE_MULTIPLE_MEDIA_URL}`, {
    data: { ids }, // Correct way to send data in DELETE request
    withCredentials: true,
  });

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