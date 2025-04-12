import { get_Store_Purchased_Product_Api } from "@/services/stock/route";

export const getStorePurchasedProducts = async () => {
  try {
    const { data, status } = await get_Store_Purchased_Product_Api();

    // console.log(data,'data');
    

    if (status === 200) {
      return { status: status, data: data.data, message: data.message };
    }
  } catch (error: any) {
    console.error("error in get store stock purchased route",error);
    return { status: 500, message: error.response.message, data: [] };
  }
};
