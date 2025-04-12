import { Field, Form, Formik } from "formik";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { dispatch, useAppSelector } from "@/redux/hook";
import AyButton from "@/components/myUi/AyButton";
import Loader from "@/components/global/loader";
import { makeToast, makeToastError } from "@/utils/toaster";
import { setCurrentAdminSlices } from "@/redux/actions/adminSlice";
import { useModal } from "@/providers/context/context";
import Media_Files_Modal from "@/components/media/Media_Files_Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import {
  delete_Profile_Avatar_Api,
  update_profile_Api,
} from "@/services/profile/route";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  emailId: string;
  userName: string;
  manager: string;
  pinCode: string | null;
  state: string;
  country: string;
  Address: string;
  phoneNumber: string;
  avatar: string;
};

const ProfilePageForm = () => {
  const { currentAdmin } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();
  const [editAvatar, setEditAvatar] = useState(false);
  const { openMediaDrawer, mediaOpenDrawer } = useModal();

  const handleDeleteAvatar = async (setFieldValue: any) => {
    if (!currentAdmin?.avatar) {
      setFieldValue("avatar", "");
      return;
    }
    try {
      const response = await delete_Profile_Avatar_Api(currentAdmin?._id ?? "");

      if (response.status === 200) {
        makeToast(response.data.message);
        // console.log(response,'response');

        setFieldValue("avatar", "");
        dispatch(setCurrentAdminSlices(response.data.data));
      }
    } catch (error: any) {
      if (error) {
        makeToastError(
          error.response.data.message || "Failed to delete avatar"
        );
      }
    }
  };

  return (
    <Formik<FormData>
      initialValues={{
        name: currentAdmin?.name ?? "",
        emailId: currentAdmin?.emailId ?? "",
        userName: currentAdmin?.userName ?? "",
        manager: currentAdmin?.manager ?? "",
        pinCode: currentAdmin?.pinCode ?? "",
        state: currentAdmin?.state ?? "",
        country: currentAdmin?.country ?? "",
        Address: currentAdmin?.Address ?? "",
        phoneNumber: currentAdmin?.phoneNumber ?? "",
        avatar: currentAdmin?.avatar ?? "",
      }}
      enableReinitialize
      onSubmit={async (value) => {
        try {
          const response = await update_profile_Api(
            value,
            currentAdmin?._id ?? ""
          );

          if (response.status === 200) {
            makeToast(response.data.message);
            // console.log(response);

            dispatch(setCurrentAdminSlices(response.data.data));
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
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="space-y-3">
          <div className="sm:hidden block">
            <Icon
              icon="eva:arrow-back-fill"
              onClick={() => {
                navigate("/admin/profile");
              }}
              className="cursor-pointer"
            />
          </div>
          {/* <pre>{JSON.stringify(currentAdmin, null, 2)}</pre> */}
          {/* 1. user profile image starting ----------- */}
          <div className=" bg-white px-5 gap-3 py-5 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Avatar className="w-20 h-20 shadow-md">
                  <AvatarImage src={values.avatar} />
                  <AvatarFallback>
                    {currentAdmin?.userName?.charAt(0).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className="bg-blue-400 flex p-1 cursor-pointer text-white rounded-full absolute bottom-0 z-50 right-0"
                  onClick={() => {
                    setEditAvatar(!editAvatar);
                  }}
                >
                  <Icon icon="line-md:edit" className="" />
                </div>
              </div>

              <div className=" flex flex-col w-full flex-grow">
                <div className="flex flex-col w-full">
                  <h2 className="text-lg font-semibold">
                    Hey, {currentAdmin?.userName}
                  </h2>
                  <span className="text-textGray text-xs w-full block">
                    Remember, update your profile with valid credentials.
                  </span>
                </div>

                {/* new image add */}
                {editAvatar && (
                  <div className="text-xs  text-textMain flex items-center gap-2 ">
                    <span
                      className="text-textMain underline underline-offset-4 text-xs cursor-pointer"
                      onClick={openMediaDrawer}
                    >
                      Upload
                    </span>
                    {values.avatar && (
                      <button
                        type="button"
                        className="text-red-500 text-xs"
                        onClick={() => {
                          handleDeleteAvatar(setFieldValue);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>

              {mediaOpenDrawer && (
                <Media_Files_Modal
                  multiple={false}
                  fieldName={"avatar"}
                  mediaType={"image"}
                  handleFileUpload={(event, fieldName) => {
                    const img = event[0].imageurl;
                    setFieldValue?.(fieldName, img);
                  }}
                />
              )}

              {/* #profile image delete */}
            </div>
          </div>
          {/*  user profile image ending -------
          =========================================---- */}

          <div className=" bg-white px-5 py-5 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">User Information</h2>
            <div className="flex gap-5 md:flex-row flex-col w-full">
              {/* 2.  user store name -------
          =========================================---- */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">Store Name</Label>
                <Field
                  value={values.name}
                  name="name"
                  placeholder="Store Name"
                  type="text"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>

              {/* 3. use name */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">User Name</Label>
                <Field
                  value={values.userName}
                  name="userName"
                  placeholder="User Name"
                  type="text"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>
            </div>

            {/* 4. use email====== */}
            <div className="flex gap-5 md:flex-row flex-col w-full">
              {/* 5.  user Email -------
          =========================================---- */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">Email</Label>
                <Field
                  value={values.emailId}
                  name="emailId"
                  placeholder="Enter your email address "
                  type="email"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>

              {/* 6. Store Manger */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">Store Manger</Label>
                <Field
                  value={values.manager}
                  name="manager"
                  placeholder="User Name"
                  type="text"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Label className="text-sm text-gray-500">Mobile</Label>
              <Field
                value={values.phoneNumber}
                name="phoneNumber"
                placeholder="User Name"
                type="number"
                as={Input}
                // max={10}
                // min={10}
                className="px-4 py-6 text-xs rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Address Information section starting =============
          ============================================== */}
          <div className=" bg-white px-5 py-5 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Address Information</h2>
            <div className="flex gap-5 md:flex-row flex-col w-full">
              {/* 7.  pin code -------
          =========================================---- */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">Pin code</Label>
                <Field
                  value={values.pinCode}
                  name="pinCode"
                  placeholder="pinCode here"
                  type="text"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>

              {/* 8. state */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">State</Label>
                <Field
                  value={values.state}
                  name="state"
                  placeholder="state"
                  type="text"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <div className="flex gap-5 md:flex-row flex-col w-full">
              {/* 9.  Country -------
          =========================================---- */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">Country</Label>
                <Field
                  value={values.country}
                  name="country"
                  placeholder="pinCode here"
                  type="text"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>

              {/* 10. Address */}
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-sm text-gray-500">Address</Label>
                <Field
                  value={values.Address}
                  name="Address"
                  placeholder="state"
                  type="text"
                  as={Input}
                  className="px-4 py-6 text-xs rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-3">
            <AyButton type="submit">
              <Loader state={isSubmitting}>Update</Loader>
            </AyButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfilePageForm;
