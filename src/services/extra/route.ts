import {
  CREATE_NEW_COLOR,
  GET_ALL_COLOR,
  DELETE_SINGLE_COLOR,
  CREATE_NEW_SIZE,
  DELETE_SINGLE_SIZE,
  GET_ALL_SIZE,
  GET_ALL_BUNDLE_SIZE,
  CREATE_NEW_BUNDLE_SIZE,
  DELETE_SINGLE_BUNDLE_SIZE,

} from "../api/extra-urlPath";
import { API } from "../auth/route";
import { ICreateBundleType } from "./types";

export const create_New_Color_Api = async (data: {
  colorName: string;
  colorCode: string;
}) => await API.post(CREATE_NEW_COLOR, data, { withCredentials: true });

// 2. get all colors
export const get_Colors_Api = async () =>
  await API.get(GET_ALL_COLOR, { withCredentials: true });

export const delete_Colors_Api = async (id:string) =>
  await API.delete(`${DELETE_SINGLE_COLOR}/${id}`, { withCredentials: true });

// ----------------------------

// size section
// 3. size creation
export const create_New_Size_Api = async (data: { name: string }) =>
  await API.post(CREATE_NEW_SIZE, data, { withCredentials: true });

// 4. get all size
export const get_Size_Api = async () =>
  await API.get(GET_ALL_SIZE, { withCredentials: true });

// 4. get all size
export const delete_Size_Api = async (id: string) =>
  await API.delete(`${DELETE_SINGLE_SIZE}/${id}`, { withCredentials: true });

// --------------------------------------------------

// 5. CREATE bundle size
export const create_New__Bundle_Size_Api = async (data: ICreateBundleType) =>
  await API.post(CREATE_NEW_BUNDLE_SIZE, data, { withCredentials: true });

// 6. bundle size getting

export const get_Bundle_Size_Api = async () =>
  await API.get(`${GET_ALL_BUNDLE_SIZE}`, { withCredentials: true });

// 7. delete bundle
export const delete_Bundle_Size_Api = async (id: string) =>
  await API.delete(`${DELETE_SINGLE_BUNDLE_SIZE}/${id}`, {
    withCredentials: true,
  });
