import { getCategories } from "@/redux/actions/category_Slice";
import { useAppDispatch } from "@/redux/hook";
import {
  get_Category_Api,
  hard_Delete_All_Category_Api,
  hard_Delete_Single_Category_Api,
  soft_Delete_Category_Api,
  toggle_Category_Api,
} from "@/services/category/route";

export const getAllCategories = async () => {
  try {
    const response = await get_Category_Api();
    if (response.status === 200) {
      // return { status: 200, data: response.data.file };
      return {
        status: response.status,
        data: response.data.category,
        message: response.data.message,
      };
    }
    // console.log(response);
  } catch (error) {
    return { status: 403, data: [], error: error };
  }
};

// 2.   ===== toggle change

export const CategoryToggle = () => {
  const dispatch = useAppDispatch();
  const toggleCategories = async (
    field: "featured" | "published",
    id: string
  ) => {
    try {
      // console.log(field, "field");
      const response = await toggle_Category_Api(field, id);

      if (response.status === 200) {
        dispatch(getCategories());
        // getAllCategories()
        // return { status: 200, data: response.data.file };
        return {
          status: response.status,
          data: response.data.category,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.log(error, "error toggle");

      return { status: 403, data: [], error: error };
    }
  };

  return {
    toggleCategories,
  };
};

// 3. soft delete categories
export const DeleteCategory = () => {
  const dispatch = useAppDispatch();

  const softDeleteCategoryFn = async (id: string) => {
    try {
      const response = await soft_Delete_Category_Api(id);

      if (response.status === 200) {
        dispatch(getCategories());

        return {
          status: response.status,
          data: response.data.category,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.log(error, "error toggle");

      return { status: 403, data: [], error: error };
    }
  };

  // 4. hard delete all categories ======

  const hardDeleteAllCategoryFn = async () => {
    try {
      const response = await hard_Delete_All_Category_Api();

      if (response.status === 200) {
        dispatch(getCategories());
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

  // 5. hard delete single categories ======

  const hardDeleteSingleCategoryFn = async (id: string) => {
    try {
      const response = await hard_Delete_Single_Category_Api(id);

      if (response.status === 200) {
        dispatch(getCategories());
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
    softDeleteCategoryFn,
    hardDeleteAllCategoryFn,
    hardDeleteSingleCategoryFn,
  };
};
