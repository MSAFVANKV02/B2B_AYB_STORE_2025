import { Get_Media_By_Id_Api } from "@/services/media/route";

// 1. get media by id action

export const getAllMediaById = async (userId: string) => {
  try {
    const response = await Get_Media_By_Id_Api(userId);
    if (response.status === 200) {
      // return { status: 200, data: response.data.file };
      return response.data.file || [];
    }
  } catch (error) {
    return { status: 403, data: [], error: error };
  }
};
