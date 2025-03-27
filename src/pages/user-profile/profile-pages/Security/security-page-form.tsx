import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AyButton from "@/components/myUi/AyButton";
import Loader from "@/components/global/loader";
import { reset_store_password_Api } from "@/services/profile/route";
import { makeToast, makeToastError } from "@/utils/toaster";

import * as Yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  password: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormData = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const SecurityPageForm = () => {

  const navigate = useNavigate();


  return (
    <Formik<FormData>
      initialValues={{
        password: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (value,{resetForm}) => {
        try {
          const response = await reset_store_password_Api({
            newPassword: value.newPassword,
            oldPassword: value.password,
          });

          if (response.status === 200) {
            makeToast(response.data.message);
            resetForm()
            // console.log(response);

            // dispatch(setCurrentAdminSlices(response.data.store));
          }
        } catch (error: any) {
          if (error) {
            makeToastError(
              error.response.data.message || "Failed to update profile"
            );
          }
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="h-full bg-white px-5 py-5 rounded-md shadow-sm space-y-4">
          {/* <pre>{JSON.stringify(currentAdmin, null, 2)}</pre> */}

          <div className="sm:hidden block">
            <Icon icon="eva:arrow-back-fill" 
            onClick={()=>{
              navigate("/admin/profile")
            }}
            className="cursor-pointer"
            />
          </div>

          <h2 className="text-lg font-semibold">Password</h2>
          <span className="text-textGray text-xs">
            Remember, your password is your digital key to your account. Keep it
            safe, keep it secure!
          </span>

          {/* 1. current password */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500">Current Password</Label>
            <Field
              value={values.password}
              name="password"
              placeholder="Your current password"
              type="password"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100"
            />
            <ErrorMessage
              name="password"
              component={"span"}
              className="text-red-500 text-xs"
            />
          </div>

          {/* 2. new password */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500">New Password</Label>
            <Field
              value={values.newPassword}
              name="newPassword"
              placeholder="Your new password"
              type="password"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100"
            />
            <ErrorMessage
              name="newPassword"
              component={"span"}
              className="text-red-500 text-xs"
            />
          </div>

          {/* 3. confirm new password */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500">
              Confirm New Password
            </Label>
            <Field
              value={values.confirmPassword}
              name="confirmPassword"
              placeholder="Your new password"
              type="password"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100"
            />
            <ErrorMessage
              name="confirmPassword"
              component={"span"}
              className="text-red-500 text-xs"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-3">
            <AyButton
            type="submit"
            >
              <Loader state={isSubmitting}>Update</Loader>
            </AyButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SecurityPageForm;
