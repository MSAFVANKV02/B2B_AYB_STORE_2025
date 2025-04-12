import { get_All_Data_Api } from "@/services/coupons/route";

export const getAllDataList = async () => {
  try {

    const {status, data} = await get_All_Data_Api();

    if(status === 200){
        return {
            data:data,
            message:data.message,
            status:status
        }
    }

    // console.log(data,'getAllDataList');
    

  } catch (error: any) {
    if (error) {
      return {
        data: [],
        status: 500,
        message: error.response.data.message || "failed get all data",
      };
    }
  }
};
