
import {
  CREATE_NEW_NOTIFICATION_PREFERENCES,
  GET_NOTIFICATION_PREFERENCES,
} from "../api/notification-urlPath";
import { API } from "../auth/route";

export type NotificationPreferencesForm = {
  email: boolean;
  sms: boolean;
  push: boolean;
};

export type Notification = {
  role: string;
  preferences: {
    order_updates: NotificationPreferencesForm;
    payment_status: NotificationPreferencesForm;
    promotions: NotificationPreferencesForm;
    inventory_alerts: NotificationPreferencesForm;
    system_notifications: NotificationPreferencesForm;
  };
};

export const create_New_Notification_Preferences_Api = async (
  data: Notification
) =>
  await API.post(CREATE_NEW_NOTIFICATION_PREFERENCES, data, {
    withCredentials: true,
  });

//   2
export const get_Notification_Preferences_Api = async (id: string) =>
  await API.get(`${GET_NOTIFICATION_PREFERENCES}/${id}`, {
    withCredentials: true,
  });
