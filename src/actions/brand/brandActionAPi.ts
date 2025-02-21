import { getAllBrands } from "@/redux/actions/brandsSlice";
import { useAppDispatch } from "@/redux/hook";
import { hard_Delete_All_Brand_Api, hard_Delete_Single_Brand_Api, soft_Delete_Single_Brand_Api } from "@/services/brand/route";




export const DeleteBrands = () => {
    const dispatch = useAppDispatch();
  
    const softDeleteBrandFn = async (id: string) => {
      try {
        const response = await soft_Delete_Single_Brand_Api(id);
  
        if (response.status === 200) {
          dispatch(getAllBrands());
  
          return {
            status: response.status,
            data: response.data.data,
            message: response.data.message,
          };
        }
      } catch (error) {
        console.log(error, "error soft delete brand");
  
        return { status: 403, data: [], error: error };
      }
    };
  
    // 4. hard delete all categories ======
  
    const hardDeleteAllBrandsFn = async () => {
      try {
        const response = await hard_Delete_All_Brand_Api();
  
        if (response.status === 200) {
          dispatch(getAllBrands());
          // getAllCategories()
          // return { status: 200, data: response.data.file };
          return {
            status: response.status,
            data: response.data.data,
            message: response.data.message,
          };
        }
      } catch (error) {
        console.log(error, "error toggle");
  
        return { status: 403, data: [], error: error };
      }
    };
  
    // 5. hard delete single categories ======
  
    const hardDeleteSingleBrandFn = async (id: string) => {
      try {
        const response = await hard_Delete_Single_Brand_Api(id);
  
        if (response.status === 200) {
          dispatch(getAllBrands());
          // getAllCategories()
          // return { status: 200, data: response.data.file };
          return {
            status: response.status,
            data: response.data.categories,
            message: response.data.message,
          };
        }
      } catch (error) {
        console.log(error, "error toggle");
  
        return { status: 403, data: [], error: error };
      }
    };
  

    
    return {
      softDeleteBrandFn,
      hardDeleteAllBrandsFn,
      hardDeleteSingleBrandFn,
    };
  };
  