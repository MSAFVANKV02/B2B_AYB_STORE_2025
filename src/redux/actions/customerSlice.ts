import { Get_Customer_Api } from "@/services/customer/route";
import { IUserProps } from "@/types/adminUserTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FormData = {
  customer: IUserProps[];
  isLoading: boolean;
  error: string | null;
};

// Initial state
const initialState: FormData = {
  customer: [],
  isLoading: false,
  error: null,
};

// Async thunk for login
export const fetchCustomerDetails = createAsyncThunk(
  "customer/fetchCustomerDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Get_Customer_Api();
      // console.log(response);

      if (response.status == 200 || response.data.success === true) {
        // console.log(response.data,'customer');
        return response.data
      } else {
        return rejectWithValue("Failed to fetch customer details");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutState: (state) => {
      state.customer = [];
    },
    setUserData: (state, action) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customer = action.payload.data;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.isLoading = false;

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

export const { logoutState, setUserData } = customerSlice.actions;

export default customerSlice.reducer;

// Selector to get the auth state
// export const selectAuth = (state) => state.auth;
