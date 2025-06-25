import {
  Create_Store_Templates_Api,
  delete_Store_Templates_Api,
  edit_Store_Templates_Api,
  get_Store_Templates_Api,
  get_Store_Templates_By_Id_Api,
} from "@/services/store/route";

export const createStoreTemplatesAction = async ({
  storeId,
  template,
  name,
  isEdit = false,
  templateId,
}: {
  storeId: string;
  name?: string;
  template: any;
  isEdit?: boolean;
  templateId?: string;
}) => {
  try {
    const route = isEdit
      ? edit_Store_Templates_Api({
          storeId: storeId,
          template: template,
          name: name,
          isActive: true,
          templateId: templateId ?? "",
        })
      : Create_Store_Templates_Api({
          storeId: storeId,
          template: template,
          name: name,
          isActive: true,
        });

    const { data, status } = await route;

    // console.log(data, "data");

    if (status === 200 || status === 201) {
      return { status: status, data: data.data, message: data.message };
    }
  } catch (error: any) {
    // console.error("error in get store stock purchased route", error);
    return { status: 500, message: error.response.data.message, data: [] };
  }
};

// get all created templates

export const getStoreTemplatesAction = async (storeId: string) => {
  try {
    const { data, status } = await get_Store_Templates_Api(storeId);

    // console.log(data, "data");

    if (status === 200 || status === 201) {
      return { status: status, data: data.data, message: data.message };
    }
  } catch (error: any) {
    // console.error("error in get store stock purchased route", error);
    return { status: 500, message: error.response.data.message, data: [] };
  }
};

export const getStoreTemplatesByIdAction = async (storeId: string) => {
  try {
    const { data, status } = await get_Store_Templates_By_Id_Api(storeId);

    // console.log(data, "data");

    if (status === 200 || status === 201) {
      return { status: status, data: data.data, message: data.message };
    }
  } catch (error: any) {
    // console.error("error in get store stock purchased route", error);
    return { status: 500, message: error.response.data.message, data: [] };
  }
};

// export const deleteStoreTemplatesAction = async ({
export const deleteStoreTemplatesAction = async ({
  storeId,
  templateId,
}: {
  storeId: string;
  templateId: string;
}) => {
  try {
    const { data, status } = await delete_Store_Templates_Api({
      storeId: storeId,
      templateId: templateId,
    });

    // console.log(data, "data");

    if (status === 200 || status === 201) {
      return { status: status, data: data.data, message: data.message };
    }
  } catch (error: any) {
    // console.error("error in get store stock purchased route", error);
    return { status: 500, message: error.response.data.message, data: [] };
  }
};
