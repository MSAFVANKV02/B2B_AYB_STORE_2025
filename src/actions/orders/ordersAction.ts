import { ReturnActionFormData } from "@/pages/return-management/user-return/table-details";
import {
  get_All_Order_Api,
  get_All_Return_Orders_Api,
  patch_Return_Action_Api,
  patch_update_order_Status_Api,
} from "@/services/orders/route";
import { IFilterOrders } from "@/types/orderTypes";
import { AxiosError } from "axios";

export const getAllOrdersAction = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  try {
    const { data, status } = await get_All_Order_Api(filter);
    //  console.log(data,'data');
    if (status === 200 || status === 201) {
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};

export const getAllReturnedOrdersAction = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  try {
    const { data, status } = await get_All_Return_Orders_Api(filter);
    // console.log(data, "data");

    if (status === 200 || status === 201) {
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};

// take action on return orders
export const takeActionReturnOrdersAction = async (
  actionData: ReturnActionFormData[]
) => {
  try {
    const { data, status } = await patch_Return_Action_Api(actionData);
    console.log(data, "data");

    if (status === 200 || status === 201) {
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};

// update order status of a user product =========

export const updateStoreOrderStatusAction = async ({
  status,
  store_order_id,
}: {
  store_order_id: string;
  status: string;
}) => {
  try {
    const { data, status: resStatus } = await patch_update_order_Status_Api({
      status: status,
      store_order_id: store_order_id,
    });
    //  console.log(data,'data');
    if (resStatus === 200 || resStatus === 201) {
      return {
        data: data,
        message: data.message,
        status: resStatus,
      };
    }
  } catch (error) {
    // console.log(error,'error');
    const err = error as AxiosError<{ message: string }>;
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};
