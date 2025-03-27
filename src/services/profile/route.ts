import { DELETE_PROFILE_AVATAR_URL, RESET_PASSWORD_URL, UPDATE_PROFILE_URL } from "../api/urlPath";
import { API } from "../auth/route";


// user data updates --------------------------------
export const update_profile_Api = async (data:any,id:string) =>
    await API.put(`${UPDATE_PROFILE_URL}/${id}`,data, { withCredentials: true });

//2. user password updates --------------------------------
export const reset_store_password_Api = async (data:{
    oldPassword:string;
    newPassword:string;
}) =>
    await API.put(`${RESET_PASSWORD_URL}`,data, { withCredentials: true });

// DELETE ADMIN SELLER AVATAR --------------------------------
export const delete_Profile_Avatar_Api = async (id:string) =>
    await API.delete(`${DELETE_PROFILE_AVATAR_URL}/${id}`, { withCredentials: true });