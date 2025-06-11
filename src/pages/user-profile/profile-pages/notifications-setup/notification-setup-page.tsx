import Loader from "@/components/global/loader";
import AyButton from "@/components/myUi/AyButton";
import Checkbox from "@/components/myUi/checkBox";
import { Label } from "@/components/ui/label";
import { getNotificationsRedux } from "@/redux/actions/notification_Slice";
import { dispatch, useAppSelector } from "@/redux/hook";
import { create_New_Notification_Preferences_Api } from "@/services/notifications/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { Formik, Form } from "formik";
import { useEffect, useMemo } from "react";

type NotificationPreferences = {
  email: boolean;
  sms: boolean;
  push: boolean;
};

type NotificationFormValues = {
  role: string;
  preferences: {
    order_updates: NotificationPreferences;
    payment_status: NotificationPreferences;
    promotions: NotificationPreferences;
    inventory_alerts: NotificationPreferences;
    system_notifications: NotificationPreferences;
  };
};

const notificationTitles: Record<
  keyof NotificationFormValues["preferences"],
  string
> = {
  order_updates: "Order Updates",
  payment_status: "Payment Status",
  promotions: "Promotions",
  inventory_alerts: "Inventory Alerts",
  system_notifications: "System Notifications",
};

const methodLabels: Record<keyof NotificationPreferences, string> = {
  email: "Email",
  sms: "SMS",
  push: "Push",
};

function NotificationSetupPage() {
  const { currentAdmin, isLogged } = useAppSelector((state) => state.admin);
  const { preferences } = useAppSelector((state) => state.notification);

  // console.log(preferences, "preferences");

  const defaultPreferences: NotificationFormValues["preferences"] = {
    order_updates: { email: false, sms: false, push: false },
    payment_status: { email: false, sms: false, push: false },
    promotions: { email: false, sms: false, push: false },
    inventory_alerts: { email: false, sms: false, push: false },
    system_notifications: { email: false, sms: false, push: false },
  };

  // const initialValues: NotificationFormValues = {
  //   role: "admin",
  //   preferences: {
  //     order_updates: { email: true, sms: true, push: true },
  //     payment_status: { email: true, sms: true, push: true },
  //     promotions: { email: true, sms: true, push: true },
  //     inventory_alerts: { email: true, sms: true, push: true },
  //     system_notifications: { email: true, sms: true, push: true },
  //   },
  // };
  const initialValues: NotificationFormValues = useMemo(() => {
    if (preferences) {
      // makeToast("have");
      return {
        role: "Store",
        preferences: {
          order_updates: preferences.order_updates,
          payment_status: preferences.payment_updates, // remap
          promotions: preferences.promotions,
          inventory_alerts: preferences.inventory_alerts,
          system_notifications: preferences.system_notifications,
        },
      };
    }

    return {
      role: "Store",
      preferences: defaultPreferences,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences]);

  useEffect(() => {
    if (isLogged) {
      dispatch(getNotificationsRedux(currentAdmin?._id ?? ""));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const renderPreferenceOptions = (
    values: NotificationFormValues,
    setFieldValue: (field: string, value: any) => void,
    getFieldMeta: (field: string) => any
  ) => {
    return Object.entries(values.preferences).map(([prefKey, prefValue]) => {
      return (
        <div key={prefKey} className="flex flex-col gap-4 dark:bg-neutral-400/20 dark:text-neutral-300 dark:rounded-md p-1">
          <Label className="text-textGray font-bold">
            Enable Notifications for{" "}
            {notificationTitles[prefKey as keyof typeof notificationTitles]}
          </Label>

          <div className="flex flex-col gap-3 pl-2">
            {Object.keys(prefValue).map((method) => {
              const fieldPath = `preferences.${prefKey}.${method}`;
              const label =
                methodLabels[method as keyof NotificationPreferences];

              return (
                <div className="flex gap-10 items-start" key={fieldPath}>
                  <Checkbox
                    checked={getFieldMeta(fieldPath).value}
                    onChange={(checked: boolean) =>
                      setFieldValue(fieldPath, checked)
                    }
                  />
                  <div className="flex flex-col gap-1">
                    <h4>Enable {label} Notification</h4>
                    <span className="text-xs">
                      {label} notifications will be sent for{" "}
                      {
                        notificationTitles[
                          prefKey as keyof typeof notificationTitles
                        ]
                      }
                      .
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
  <div className="h-[80dvh] overflow-hidden">
      <Formik<NotificationFormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values) => {
        // console.log("Form values submitted:", values);
        const payload = {
          ...values,
          preferences: {
            ...values.preferences,
            payment_updates: values.preferences.payment_status, // remap
          },
        };

        delete (payload.preferences as any).payment_status;
        try {
          const { status, data } =
            await create_New_Notification_Preferences_Api(payload);

          if (status === 200 || status === 201) {
            makeToast(data.message || "Preference Updated Successfully");
          }
        } catch (error: any) {
          if (error) {
            makeToastError(
              error.response.data.message || "failed to update notification"
            );
          }
        }
      }}
       
    >
      {({ values, setFieldValue, getFieldMeta, isSubmitting }) => (
        <Form className="h-full bg-white dark:bg-neutral-400/20  dark:text-neutral-300 px-5 py-5 rounded-md shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Notification Preferences</h2>
          <span className="text-textGray text-xs">
            Remember, your preferences affect how and when you receive updates.
          </span>

          {/* <pre>
            {
                JSON.stringify(currentAdmin,null,4)
            }
          </pre> */}

          <div className="grid 2xl:sm:grid-cols-3 sm:grid-cols-2 gap-10 dark:gap-6">
            {renderPreferenceOptions(values, setFieldValue, getFieldMeta)}
          </div>

          <div className="flex justify-end pt-3">
            <AyButton type="submit">
              <Loader state={isSubmitting}>Update</Loader>
            </AyButton>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  );
}

export default NotificationSetupPage;
