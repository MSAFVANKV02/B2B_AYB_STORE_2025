import { get_Brand_Api } from "@/services/brand/route";
import { IBrand, IBrandGetStatus } from "@/types/brandtypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface CategoryState {
  brands: IBrand[]; // Make sure to type it as IBrand[]
  loading: boolean;
  selectedBrand: IBrand | null; //
  mode:"edit"|"view"
  error: string | null;
}


export const getAllBrands = createAsyncThunk(
  "brand/getAllBrands",
  
  async (status:IBrandGetStatus, { rejectWithValue }) => {
    try {
      const response = await get_Brand_Api(status);
      const BrandData = response.data.data;
      // console.log(BrandData, "BrandData ==== brand slice");

      return BrandData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: CategoryState = {
  brands: [],
  loading: false,
  selectedBrand: null,
  mode: "view", 
  error: null,
};

// Category slice
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    addBrand: (state, action: PayloadAction<IBrand>) => {
      state.brands.push(action.payload); // This is fine, no need to return anything
    },
    removeBrand: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.filter(
        (brand) => brand._id !== action.payload
      );
    },
    setBrand: (state, action: PayloadAction<IBrand[]>) => {
      state.brands = action.payload; // This is useful for setting initial data
    },
    // setSelectedBrand: (state, action: PayloadAction<IBrand>) => {
    //     state.selectedBrand = action.payload;
    //   },
    setSelectedBrand: (
      state,
      action: PayloadAction<{ brand: IBrand; mode: "edit" | "view" }>
    ) => {
      state.selectedBrand = action.payload.brand;
      state.mode = action.payload.mode;
    },
      resetSelectedBrand: (state) => {
        state.selectedBrand = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { addBrand, removeBrand, setBrand, setSelectedBrand, resetSelectedBrand } = brandSlice.actions;

export default brandSlice.reducer;
