
import { IFileDataMedia } from "@/pages/media/retrive/all_uploaded_files";
import { Get_Media_Api } from "@/services/media/route";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FormData = {
  media: IFileDataMedia[];
  isLoading: boolean;
  error: string | null;
};

// Initial state
const initialState: FormData = {
  media: [],
  isLoading: false,
  error: null,
};

// Async thunk for login
export const fetchMediaDetails = createAsyncThunk(
  "media/fetchMediaDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Get_Media_Api();
      // console.log(response);

      if (response.status == 200 || response.data.success === true) {
        // console.log(response.data,'media');
        return response.data.files
      } else {
        return rejectWithValue("Failed to fetch media details");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {

    setMediaData: (state, action) => {
      state.media = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMediaDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.media = action.payload;
      })
      .addCase(fetchMediaDetails.rejected, (state, action) => {
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

export const { setMediaData } = mediaSlice.actions;

export default mediaSlice.reducer;

// Selector to get the auth state
// export const selectAuth = (state) => state.auth;
