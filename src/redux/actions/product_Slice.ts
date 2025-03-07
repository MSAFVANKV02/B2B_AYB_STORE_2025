import { get_Products_Api, toggle_Product_Api } from "@/services/products/route";
import { IProducts } from "@/types/productType";
import { makeToast, makeToastError } from "@/utils/toaster";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductType {
  products: IProducts[];
  loading: boolean;
  error: string | null;
}

export const fetchProducts = createAsyncThunk("products/fetchProducts",
  async () => {
    try {
      const response = await get_Products_Api();
      if (response.status == 200 || response.data.success === true) {
        // console.log(response,'response');
        
        return response.data.products;
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error: any) {
      throw new Error(error.response? error.response.data : "Network error");
    }
  }
)

export const toggleProductButton = createAsyncThunk(
    "products/toggleProductButton",
    async (data: {
        productId: string;
        fieldName: string;
        storeIds?:string[]
      }, { rejectWithValue }) => {
      try {
        const response = await toggle_Product_Api(data);
        // console.log(response);
  
        if (response.status == 200 || response.data.success === true) {
          return { 
            products: response.data.products, 
            message: response.data.message || "Products fetched successfully" 
          };
        } else {
          return rejectWithValue("Failed to fetch media details");
        }
      } catch (error: any) {
        console.log(error);
        
        return rejectWithValue(
          error.response ? error.response.data : "Network error"
        );
      }
    }
  );

const initialState: ProductType = {
  products: [],
  loading: false,
  error: null,
};
// 
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductRedux: (state, action: PayloadAction<IProducts[]>) => {
      state.products = action.payload; // Assigning an array directly
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleProductButton.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleProductButton.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        makeToast(action.payload.message)
      })
      .addCase(toggleProductButton.rejected, (state, action) => {
        state.loading = false;
        let errorMessage = "Unknown error";
  
        if (typeof action.payload === "string") {
          errorMessage = action.payload;
        } else if (action.payload && typeof action.payload === "object") {
          const errorPayload = action.payload as any;
          errorMessage = errorPayload?.data?.message || "Unknown error";
        }
  
        state.error = errorMessage;
        makeToastError(errorMessage); // Show error as toast
      });
      // ==== fetch products
      builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        // Check if payload is a string or an object and handle accordingly
        if (typeof action.payload === "string") {
          state.error = action.payload; // String error message
        } else if (action.payload && typeof action.payload === "object") {
          // Cast payload to 'any' to safely access 'data'
          const errorPayload = action.payload as any;
          state.error = errorPayload?.data?.message || "Unknown error";
        } else {
          state.error = "Unknown error";
        }
      });
  },
});

export const { addProductRedux } = productSlice.actions;
export default productSlice.reducer;
