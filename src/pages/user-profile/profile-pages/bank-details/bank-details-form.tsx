import { Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AyButton from "@/components/myUi/AyButton";
import Loader from "@/components/global/loader";
import { dispatch, useAppSelector } from "@/redux/hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { makeToast, makeToastError, makeToastWarning } from "@/utils/toaster";
import { setCurrentAdminSlices } from "@/redux/actions/adminSlice";
import { update_profile_Api } from "@/services/profile/route";
import { useNavigate } from "react-router-dom";

type FormData = {
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    shiftCode: string;
    upiId: string;
  };
};

const BankDetailsProfileForm = () => {
  const { currentAdmin } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();


  return (
    <Formik<FormData>
      initialValues={{
        bankDetails: {
          accountName: currentAdmin?.bankDetails?.accountName ?? "",
          accountNumber: currentAdmin?.bankDetails?.accountNumber ?? "",
          ifscCode: currentAdmin?.bankDetails?.ifscCode ?? "",
          shiftCode: currentAdmin?.bankDetails?.shiftCode ?? "",
          upiId: currentAdmin?.bankDetails?.upiId ?? "",
        },
      }}
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
      {({ values, isSubmitting }) => (
        <Form className="h-full bg-white dark:bg-neutral-400/20 dark:text-neutral-300 px-5 py-5 rounded-md shadow-sm space-y-4">
          {/* <pre>{JSON.stringify(currentAdmin, null, 2)}</pre> */}

          <div className="sm:hidden block">
            <Icon icon="eva:arrow-back-fill" 
            onClick={()=>{
              navigate("/admin/profile")
            }}
            className="cursor-pointer"
            />
          </div>

          <h2 className="text-lg font-semibold">Billing</h2>
          <span className="text-textGray text-xs">
            Remember, account information must be valid and valuable.
          </span>

          {/* plan board  starting ==== */}
          <div className=" w-full rounded-lg bg-gray-50 dark:bg-neutral-400/20 dark:text-neutral-300 md:py-5 py-3 md:px-5 px-3 shadow-sm">
            <div className="flex justify-between gap-3 sm:flex-row flex-col">
              <div className="flex md:items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-400 flex">
                  <Icon
                    icon="material-symbols:electric-bolt-rounded"
                    className="m-auto text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex sm:flex-row flex-col gap-2 sm:items-center">
                    <h3 className="font-bold">Store Board Basic</h3>
                    <span className="p-1 text-xs sm:w-auto w-fit rounded-md shadow-sm bg-green-200 text-green-600">
                      Active
                    </span>
                  </div>
                  <div className="flex md:items-center md:flex-row flex-col gap-1 text-xs">
                    <span>Free</span>|<span>Unlimited products</span>|
                    <span>No monthly fee</span>
                  </div>
                </div>
              </div>
              {/* upgrade button */}
            <div className="flex justify-end ">
            <AyButton
                sx={{
                  width: "fit-content",
                  borderRadius: "30px",
                  p: "7px",
                }}
                disabled
                onClick={() => {
                  makeToastWarning("Cant upgrade now!");
                }}
              >
                Upgrade
              </AyButton>
            </div>
            </div>
          </div>
          {/* plan board  ended ==== */}

          {/* 1. current password */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500 dark:text-neutral-300">Acc Holder Name</Label>
            <Field
              value={values.bankDetails.accountName}
              name="bankDetails.accountName"
              placeholder="Your Account Name"
              type="text"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100 dark:bg-neutral-400/20 dark:text-neutral-300"
            />
          </div>

          {/* 2. new password */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500">Account Number</Label>
            <Field
              value={values.bankDetails.accountNumber}
              name="bankDetails.accountNumber"
              placeholder="Your new account number"
              type="number"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100 dark:bg-neutral-400/20 dark:text-neutral-300"
            />
          </div>

          {/* 3. confirm new password */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500">IFSC</Label>
            <Field
              value={values.bankDetails.ifscCode}
              name="bankDetails.ifscCode"
              placeholder="Ifsc Code"
              type="text"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100 dark:bg-neutral-400/20 dark:text-neutral-300"
            />
          </div>

          {/* 4. shiftCode */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500">Shift Code</Label>
            <Field
              value={values.bankDetails.shiftCode}
              name="bankDetails.shiftCode"
              placeholder="shift Code"
              type="text"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100 dark:bg-neutral-400/20 dark:text-neutral-300"
            />
          </div>

          {/* 4. shiftCode */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm text-gray-500">Upi</Label>
            <Field
              value={values.bankDetails.upiId}
              name="bankDetails.upiId"
              placeholder="upiId Code"
              type="text"
              as={Input}
              className="px-4 py-6 text-xs rounded-lg bg-gray-100 dark:bg-neutral-400/20 dark:text-neutral-300"
            />
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

export default BankDetailsProfileForm;
