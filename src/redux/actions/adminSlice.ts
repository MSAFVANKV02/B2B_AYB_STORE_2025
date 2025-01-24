import { Get_Admins_Api } from "@/services/auth/route";
import { IAdminTypes } from "@/types/adminUserTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



type FormData = {
    admin:IAdminTypes[];
    token: string | null;
    isLoading: boolean;
    isLogged: boolean;
    error: string | null;
    currentAdmin: IAdminTypes | null;
}

// Initial state
const initialState:FormData = {
  admin: [],
  currentAdmin:null,
  token: null,
  isLoading: false,
  isLogged:false,
  error: null,
};

// Async thunk for login
export const fetchAdminDetails = createAsyncThunk(
  "admin/fetchAdminDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Get_Admins_Api();
      // console.log(response);
      
      if (response.status == 200 || response.data.success === true) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch admin details");
      }
    } catch (error:any) {
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

// export const fetchCurrentAdminDetails = createAsyncThunk(
//   "admin/fetchAdminDetails",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await Get_Current_Admins_Api();
//       // console.log(response);
      
//       if (response.status == 200 || response.data.success === true) {
//         return response.data.admin;
//       } else {
//         return rejectWithValue("Failed to fetch admin details");
//       }
//     } catch (error:any) {
//       return rejectWithValue(
//         error.response ? error.response.data : "Network error"
//       );
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutState: (state) => {
      state.admin = [];
      state.token = null;
      state.isLogged = false;
      state.currentAdmin = null;
    },
    setUserData: (state, action) => {
      state.admin = action.payload;
      state.isLogged = true;
    },
    setCurrentAdminSlices: (state, action) =>{
      state.currentAdmin = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.data
      state.isLogged = true;
      })
      .addCase(fetchAdminDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogged = false;

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

export const { logoutState, setUserData, setCurrentAdminSlices } = authSlice.actions;

export default authSlice.reducer;

// Selector to get the auth state
// export const selectAuth = (state) => state.auth;
