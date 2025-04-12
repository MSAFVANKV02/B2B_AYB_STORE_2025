import {
  delete_Bundle_Size_Api,
  delete_Colors_Api,
  delete_Size_Api,
  get_Bundle_Size_Api,
  get_Colors_Api,
  get_Size_Api,
} from "@/services/extra/route";
import { IBundleSize } from "@/types/sizeType";
import { makeToastError } from "@/utils/toaster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductType {
  loading: boolean;
  error: string | null;
  colors: { _id: string; colorName: string; colorCode: string }[];
  sizes: { _id: string; name: string; createdAt: Date; updatedAt: Date }[];
  bundles: IBundleSize[];
}

// get colors
export const getColorsRedux = createAsyncThunk(
  "sizeColor/getColors",
  async () => {
    try {
      // const { data, status } = await getAllColorsAction();
      const { data, status } = await get_Colors_Api();

      if (status === 200) {
        return data.data; // This should be the array of colors
      } else {
        throw new Error("Failed to fetch colors");
      }
    } catch (error: any) {
      throw new Error(error.response ? error.response.data : "Network error");
    }
  }
);

// get colors
export const deleteColorsSizeRedux = createAsyncThunk(
  "sizeColor/deleteColors",
  async (
    { id, value }: { id: string; value: "size" | "color" | "bundle" },
    { rejectWithValue }
  ) => {
    try {
      let response;

      if (value === "color") {
        response = await delete_Colors_Api(id);
      } else if (value === "size") {
        response = await delete_Size_Api(id);
      } else {
        response = await delete_Bundle_Size_Api(id);
      }

      const { status } = response;

      if (status === 200 || status === 201) {
        return { id, value };
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error: any) {
      console.log(error,'error');
      
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

// get sizes
export const getSizesRedux = createAsyncThunk(
  "sizeColor/getSizes",
  async () => {
    try {
      // const { data, status } = await getAllColorsAction();
      const { data, status } = await get_Size_Api();

      if (status === 200) {
        return data.data; // This should be the array of colors
      } else {
        throw new Error("Failed to fetch colors");
      }
    } catch (error: any) {
      throw new Error(error.response ? error.response.data : "Network error");
    }
  }
);

// get sizes
export const getBundleSizesRedux = createAsyncThunk(
  "sizeColor/getBundleSizes",
  async () => {
    try {
      // const { data, status } = await getAllColorsAction();
      const { data, status } = await get_Bundle_Size_Api();

      // console.log(data,'data bundle');

      if (status === 200) {
        return data.data; // This should be the array of colors
      } else {
        throw new Error("Failed to fetch bundle sizes");
      }
    } catch (error: any) {
      throw new Error(error.response ? error.response.data : "Network error");
    }
  }
);

const initialState: ProductType = {
  loading: false,
  colors: [],
  sizes: [],
  error: null,
  bundles: [],
};
//
const sizeColorSlice = createSlice({
  name: "sizeColor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==== fetch sizeColor

    // color case
    builder
      .addCase(getColorsRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(getColorsRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload; // ✅ store colors
      })
      .addCase(getColorsRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch colors";
        makeToastError(state.error);
      })
      // delete color
      .addCase(deleteColorsSizeRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteColorsSizeRedux.fulfilled, (state, action) => {
        const { id, value } = action.payload;

        if (value === "color") {
          state.colors = state.colors.filter((color) => color._id !== id);
        } else if (value === "size") {
          state.sizes = state.sizes.filter((size) => size._id !== id);
        } else {
          state.bundles = state.bundles.filter((bundle) => bundle._id !== id);
        }

        state.loading = false;
      })
      .addCase(deleteColorsSizeRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch colors";
        makeToastError(state.error);
      })
      // sizes
      .addCase(getSizesRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSizesRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload; // ✅ store colors
      })
      .addCase(getSizesRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Sizes";
        makeToastError(state.error);
      })
      // bundle sizes
      .addCase(getBundleSizesRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBundleSizesRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.bundles = action.payload; // ✅ store colors
      })
      .addCase(getBundleSizesRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bundle Sizes";
        makeToastError(state.error);
      });
  },
});

// export const {  } = sizeColorSlice.actions;
export default sizeColorSlice.reducer;
