import {
  CHANGE_PRODUCT_STATUS_URL,
  CREATE_PRODUCT_URL,
  DELETE_PRODUCT_URL,
  GET_DELETED_PRODUCT_URL,
  GET_PRODUCTS_URL,
  GET_REQUESTED_STOCK_PRODUCT_URL,
  REQUEST_PRODUCT_STOCK_URL,
  RESTORE_DELETED_PRODUCT_URL,
  TOGGLE_PRODUCTS_URL,
  UPDATE_PRODUCT_URL,
} from "@/types/urlPath";
import { API } from "../auth/route";
import { IProductStatus } from "@/types/productType";
import { IProdAddRoot } from "@/types/add_Prod_Types";
import { IRequestProductType } from "./type";

// * 1. Create a new Product ====
export const add_Product_Api = (data: Partial<IProdAddRoot>) =>
  API.post(CREATE_PRODUCT_URL, data, { withCredentials: true });

// 2. get all product in Dashboard ==========
export const get_Products_Api = (
  filters?: { key: string; value: string }[]
) => {
  const params: Record<string, string> = {};

  if (filters) {
    filters.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return API.get(GET_PRODUCTS_URL, {
    withCredentials: true,
    params, // ✅ Send dynamic query params
  });
};



  // 9
  export const get_Requested_Product_Api = async () =>
    await API.get(`${GET_REQUESTED_STOCK_PRODUCT_URL}`, {
      withCredentials: true,
    });

// 3. toggle product status (featured, todays deal) ====

export const toggle_Product_Api = (data: {
  productId: string;
  fieldName: string;
  storeIds?: string[] 
}) =>
  API.put(
    `${TOGGLE_PRODUCTS_URL}`,
    {
      storeIds: data.storeIds,
      productId: data.productId,
      fieldName: data.fieldName,
    },
    { withCredentials: true }
  );

// * 4. change product status ====

export const change_Product_Status_Api = (data: {
  productId: string;
  status: IProductStatus;
}) =>
  API.put(
    `${CHANGE_PRODUCT_STATUS_URL}/${data.productId}/${data.status}`,
    {},
    { withCredentials: true }
  );


  // 5. Delete product
  export const delete_Product_Api = async (data:{productId?: string, hardDelete?:boolean}) =>
    await API.delete(`${DELETE_PRODUCT_URL}`, {
      withCredentials: true,
      data:{
        productId: data.productId, 
        hardDelete: data.hardDelete, 
      }
    });

// 6. restore deleted item
export const restore_Deleted_Product_Api = async (id?: string) =>
  await API.put(`${RESTORE_DELETED_PRODUCT_URL}/${id}`,{}, {
    withCredentials: true,
  });

// 7. get deleted products 

export const get_Deleted_Product_Api = async () =>
  await API.get(`${GET_DELETED_PRODUCT_URL}`, {
    withCredentials: true,
  });


  // 8. update product item
export const update_Product_Api = async (data: Partial<IProdAddRoot>,id: string) =>
  await API.put(`${UPDATE_PRODUCT_URL}/${id}`,data, {
    withCredentials: true,
  });


// ===== stock request / get / related apis =====
// ==================================================== //



export const send_Request_Product_Stock_Api = async (data: IRequestProductType) =>
  await API.post(`${REQUEST_PRODUCT_STOCK_URL}`,data, {
    withCredentials: true,
  });
