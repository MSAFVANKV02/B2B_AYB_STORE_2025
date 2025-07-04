import { CREATE_CATEGORY_URL, GET_CATEGORY_URL, GET_CATEGORY_WITH_SUB_URL, HARD_DELETE_ALL_CATEGORY_URL, HARD_DELETE_SINGLE_CATEGORY_URL, SOFT_DELETE_CATEGORY_URL, TOGGLE_CATEGORY_URL, UPDATE_CATEGORY_URL } from "@/services/api/urlPath";
import { API } from "../auth/route";
import { GET_STORE_CATEGORY_URL } from "../api/category_urlPath";

export const create_Category_Api = async (data: {
  name: string | null;
  parentId: string | null;
  coverImage: string | null;
  iconImage: string | null;
}) => await API.post(CREATE_CATEGORY_URL, data, { withCredentials: true });

export const get_Category_Api = async () =>
  await API.get(GET_CATEGORY_URL, { withCredentials: true });

// GET_STORE_CATEGORY_URL

export const get_Store_Category_Api = async (storeId:string) =>
  await API.get(`${GET_STORE_CATEGORY_URL}/${storeId}/categories`, { withCredentials: true });

// GET_STORE_CATEGORY_URL ends

export const get_Category_With_Sub_Api = async () =>
  await API.get(GET_CATEGORY_WITH_SUB_URL, { withCredentials: true });


export const toggle_Category_Api = async (field:"featured"|"published",id:string) =>
    await API.patch(`${TOGGLE_CATEGORY_URL}/${id}`,{ field }, { withCredentials: true });


// 3.  soft delete category


export const soft_Delete_Category_Api = async (id:string) =>
  await API.put(`${SOFT_DELETE_CATEGORY_URL}/${id}`, { withCredentials: true });


// 4.  hard delete all category


export const hard_Delete_All_Category_Api = async () =>
  await API.put(`${HARD_DELETE_ALL_CATEGORY_URL}`, { withCredentials: true });


// 5.  soft delete single category


export const hard_Delete_Single_Category_Api = async (id:string) =>
  await API.delete(`${HARD_DELETE_SINGLE_CATEGORY_URL}/${id}`, { withCredentials: true });


// 5.  update category


export const update_Category_Api = async (data: {
  name: string | null;
  parentId: string | null;
  coverImage: string | null;
  iconImage: string | null;
},id:string) =>
  await API.put(`${UPDATE_CATEGORY_URL}/${id}`, data , { withCredentials: true });