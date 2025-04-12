import { delete_Coupons_Api, get_Coupons_Api } from "@/services/coupons/route";

import { ICouponType } from "@/types/ICouponTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface CouponState {
  coupons: ICouponType[]; // Make sure to type it as ICouponType[]
  loading: boolean;
  error: string | null;
}

export const getCouponsRedux = createAsyncThunk(
  "coupon/getCouponsRedux",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_Coupons_Api();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCouponsRedux = createAsyncThunk(
  "coupon/deleteCouponsRedux",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await delete_Coupons_Api(id);
      console.log(response, "delete coupon");

      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};

// Category slice
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    addCoupons: (state, action: PayloadAction<ICouponType>) => {
      state.coupons.push(action.payload); // This is fine, no need to return anything
    },
    removeCoupon: (state, action: PayloadAction<string>) => {
      state.coupons = state.coupons.filter(
        (coupon) => coupon._id !== action.payload
      );
    },
    setCategories: (state, action: PayloadAction<ICouponType[]>) => {
      state.coupons = action.payload; // This is useful for setting initial data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCouponsRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCouponsRedux.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.loading = false;
      })
      .addCase(getCouponsRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(deleteCouponsRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCouponsRedux.fulfilled, (state, action) => {
        

        state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCouponsRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    // starts getCategoriesWithSub route =====
  },
});

export const { addCoupons, removeCoupon, setCategories } = couponSlice.actions;

export default couponSlice.reducer;
