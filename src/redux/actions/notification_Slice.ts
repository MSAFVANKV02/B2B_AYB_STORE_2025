import { get_Notification_Preferences_Api } from "@/services/notifications/route";
import {
  INotificationPreferences,
  INotificationType,
} from "@/types/notificationTypes";

import { makeToastError } from "@/utils/toaster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface NotificationType {
  loading: boolean;
  notifications: INotificationType[];
  preferences: INotificationPreferences | null;
  error: string | null;
}

// get colors
export const getNotificationsRedux = createAsyncThunk(
  "notifications/getNotificationPreferences",
  async (id: string, { rejectWithValue }) => {
    try {
      // const { data, status } = await getAllColorsAction();
      const { data, status } = await get_Notification_Preferences_Api(id);
      // console.log(data, "data");

      if (status === 200) {
        return data; // This should be the array of colors
      } else {
        throw new Error("Failed to fetch colors");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

const initialState: NotificationType = {
  loading: false,
  notifications: [],
  preferences: null,
  error: null,
};
//
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==== fetch notifications

    // color case
    builder
      .addCase(getNotificationsRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotificationsRedux.fulfilled, (state, action) => {
        // console.log(action, "action");

        const { preferences } = action.payload;

        state.loading = false;
        state.notifications = action.payload; // ✅ store colors
        state.preferences = preferences; // ✅ store colors
      })
      .addCase(getNotificationsRedux.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch notification preferences";
          makeToastError(action.payload as string);

      });
  },
});

// export const {  } = notificationSlice.actions;
export default notificationSlice.reducer;
