// 1. get all products ===

import { fetchProducts } from "@/redux/actions/product_Slice";
import { dispatch } from "@/redux/hook";
import {
  change_Product_Status_Api,
  delete_Product_Api,
  get_Products_Api,
  get_Requested_Product_Api,
  restore_Deleted_Product_Api,
  toggle_Product_Api,
} from "@/services/products/route";
import { IProductStatus } from "@/types/productType";
import { makeToast } from "@/utils/toaster";

export const getAllProductsInAdmin = async (
  filter?: { key: string; value: string }[]
) => {
  try {
    // console.log(url,'url');
    

    // const route = url === "requested" ? await get_Requested_Product_Api() : await get_Products_Api(filter);


    const { data, status } = await get_Products_Api(filter);
    console.log(data,'das');
    if (status === 200 || status === 201) {
      // return { status: 200, data: data.file };
     
      
      return {
        status: status,
        data: data.products,
        message: data.message,
      };
    }
    // console.log( ");
  } catch (error) {
    console.log(error, "error getAllProductsInAdmin");
    return { status: 403, data: [], error: error };
  }
};

export const getAllRequestedProductsInStore = async (

) => {
  try {
    console.log('url');
  


    const { data, status } =  await get_Requested_Product_Api() ;
    if (status === 200 || status === 201) {
      // return { status: 200, data: data.file }; 
       console.log( data,'adadasda');
      return {
        status: status,
        data: data.data,
        message: data.message,
      };
    }
  
  } catch (error) {
    console.log(error, "error getAllProductsInAdmin");
    return { status: 403, data: [], error: error };
  }
};

// 2. change product status
export const changeProductStatus = async (
  productId: string,
  status: IProductStatus
) => {
  try {
    const response = await change_Product_Status_Api({ productId, status });
    if (response.status === 200) {
      // return { status: 200, data: response.data.file };
      return {
        status: response.status,
        data: response.data.product,
        message: response.data.message,
      };
    }
    // console.log(response, "response");
  } catch (error) {
    // console.log(error, "error changeProductStatus");
    return { status: 403, data: [], error: error };
  }
};

// 3. update product toggle
export const changeProductToggle = async (data: {
  productId: string;
  fieldName: string;
  storeIds: string[] ;
}) => {
  try {
    const response = await await toggle_Product_Api(data);
    if (response.status === 200) {
      // return { status: 200, data: response.data.file };
      return {
        status: response.status,
        data: response.data.product,
        message: response.data.message,
      };
    }
    // console.log(response, "response");
  } catch (error:any) {
    // console.log(error, "error changeProductStatus");
    return { status: 403, data: [], error: error, message:error.response.data.message };
  }
};


// 4. Delete product 
export const DeleteProductFn = () => {


  const softDeleteProductFn = async (data:{productId?: string}) => {
    try {
      const response = await delete_Product_Api(data);

      if (response.status === 200) {
        // dispatch(fetchProducts());
        // makeToast(response.data.message)

        return {
          status: response.status,
          data: response.data.data,
          message: response.data.message,
        };
      
      }
    } catch (error:any) {
      // console.log(error, "error soft delete line:108");

      return { status: 403, data: [], error: error, message: error.response.data.message, };
    }
  };

  // 2. hard delete all categories ======
  const hardDeleteAllProductsFn = async (data:{hardDelete?:boolean}) => {
    try {
      const response = await delete_Product_Api(data);

      if (response.status === 200) {
        dispatch(fetchProducts());
        makeToast(response.data.message)

        return {
          status: response.status,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error:any) {
      // console.log(error, "error toggle");

      return { status: 403, data: [], error: error,  message: error.response.data.message, };
    }
  };


  // 5. hard delete single categories ======
 // 2. hard delete all categories ======
 const hardDeleteSingleProductFn = async (data:{productId?: string, hardDelete?:boolean}) => {
  try {
    const response = await delete_Product_Api(data);

    if (response.status === 200) {
      dispatch(fetchProducts());
      makeToast(response.data.message)

      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error:any) {
    // console.log(error, "error toggle");

    return { status: 403, data: [], error: error,  message: error.response.data.message, };
  }
};

const restoreDeletedProductFn = async (id:string) => {
  try {
    const response = await restore_Deleted_Product_Api(id);

    if (response.status === 200) {
      // dispatch(fetchProducts());
      makeToast(response.data.message)

      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error:any) {
    // console.log(error, "error toggle");

    return { status: 403, data: [], error: error,  message: error.response.data.message, };
  }
};

  return {
    softDeleteProductFn,
    hardDeleteAllProductsFn,
    hardDeleteSingleProductFn,
    restoreDeletedProductFn
  };
};