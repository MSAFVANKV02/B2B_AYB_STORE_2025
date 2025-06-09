import { get_All_Return_Orders_Api } from "@/services/orders/route";
import { IFilterOrders } from "@/types/orderTypes";
import { AxiosError } from "axios";

export const getAllReturnedOrdersAction = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  try {
    const { data, status } = await get_All_Return_Orders_Api(filter);
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
