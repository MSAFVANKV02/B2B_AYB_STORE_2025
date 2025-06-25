import { CREATE_STORE_URL, GET_ALL_STORE_URL } from "@/services/api/urlPath";
import { API } from "../auth/route";
import {
  CREATE_STORE_TEMPLATES_URL,
  GET_STORE_TEMPLATES_URL,
} from "../api/store_temp_urlPath";

type DataGet = "seller" | "store" | "storeSeller";

export const Create_Store_Api = async (data: any) =>
  await API.post(`${CREATE_STORE_URL}`, data, { withCredentials: true });

// 2. Get Store Or Seller or Completed users information

export const Get_Store_Api = async (data: DataGet) => {
  // console.log('Data sent:', data); // Log data here
  return await API.post(
    `${GET_ALL_STORE_URL}`,
    { role: data },
    { withCredentials: true }
  );
};

// 2. ==== store templates
export const Create_Store_Templates_Api = async ({
  storeId,
  template,
  name,
  isActive,
}: {
  storeId: string;
  name?: string;
  template: any;
  isActive: boolean;
}) =>
  await API.post(
    `${CREATE_STORE_TEMPLATES_URL}/${storeId}/templates`,
    { name, template, isActive },
    { withCredentials: true }
  );

  // 2. ==== store templates
export const edit_Store_Templates_Api = async ({
  storeId,
  template,
  name,
  isActive,
  templateId,
}: {
  storeId: string;
  name?: string;
  template: any;
  isActive: boolean;
  templateId: string;
}) =>
  await API.put(
    `${CREATE_STORE_TEMPLATES_URL}/${storeId}/templates/${templateId}`,
    { name, template, isActive },
    { withCredentials: true }
  );



// Get all store templates
export const get_Store_Templates_Api = async (storeId: string) =>
  await API.get(`${GET_STORE_TEMPLATES_URL}/${storeId}/template`, {
    withCredentials: true,
  });


  export const get_Store_Templates_By_Id_Api = async (storeId: string) =>
    await API.get(`${GET_STORE_TEMPLATES_URL}/${storeId}/active-template`, {
      withCredentials: true,
    });

// Delete store template
export const delete_Store_Templates_Api = async ({
  storeId,
  templateId,
}: {
  storeId: string;
  templateId: string;
}) =>
  await API.delete(
    `${GET_STORE_TEMPLATES_URL}/${storeId}/templates/${templateId}`,
    { withCredentials: true }
  );
