import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { Field, Form, Formik } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRegistrationTypes, StoreTypes } from "@/types/storeTypes";
import { useState } from "react";
import LLPForm from "./Registartion_Forms/LLP_Form";
import PvtLtdForm from "./Registartion_Forms/Pvt_Ltd_Form";
import SoleProprietorshipForm from "./Registartion_Forms/Sole_Proprietorship_Form";
import PartnershipForm from "./Registartion_Forms/Partnerships_Form";
import { Create_Store_Api } from "@/services/store/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import AyButton from "@/components/myUi/AyButton";
import { useModal } from "@/providers/context/context";
import GoogleMap from "@/components/google/GoogleMap";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getValidationSchema } from "./seller_Validation_Schema";
import {
  bankDetailsFields,
  initialValues,
  registrationTypes,
  userDetailsFields,
} from "./seller_input_filds";

export default function SellerCreationPage() {
  const [selectedRegistration, setSelectedRegistration] =
    useState<IRegistrationTypes>("Sole Proprietorship");

  const [googleAddress, setGoogleAddress] = useState<string>("");
  // const location = useLocation();

  const { setIsOpen } = useModal();

  const handleSetGoogleLocation = () => {
    setIsOpen(true);
  };

  // field inputs =================================================
  const inputFields: {
    id: keyof StoreTypes;
    label: string;
    fileType: string;
  }[] = [
    { id: "storeName", label: "Store Name", fileType: "text" },
    // Add conditionally visible fields:
    ...(selectedRegistration === "LLP"
      ? ([{ id: "llpNumber", label: "LLP Number", fileType: "text" }] as const)
      : []),
    ...(selectedRegistration === "PVT LTD"
      ? ([{ id: "cinNumber", label: "CIN Number", fileType: "text" }] as const)
      : []),
    { id: "gstNumber", label: "GST Number", fileType: "text" },
    { id: "storeAddress", label: "Store Address", fileType: "text" },
    {
      id: "storeCapacity",
      label: "Store Capacity in Cubic",
      fileType: "number",
    },
    { id: "state", label: "State", fileType: "text" },
    { id: "country", label: "Country", fileType: "text" },
    { id: "pinCode", label: "Pincode", fileType: "text" },
  ];

  const renderForms = (values: StoreTypes, setFieldValue: any) => {
    switch (selectedRegistration) {
      case "Sole Proprietorship":
        return (
          <SoleProprietorshipForm
            values={values}
            setFieldValue={setFieldValue}
          />
        );
      case "Partnerships":
        return (
          <PartnershipForm values={values} setFieldValue={setFieldValue} />
        );
      case "LLP":
        return <LLPForm values={values} setFieldValue={setFieldValue} />;
      case "PVT LTD":
        return <PvtLtdForm values={values} setFieldValue={setFieldValue} />;
      default:
        return (
          <SoleProprietorshipForm
            values={values}
            setFieldValue={setFieldValue}
          />
        );
    }
  };

  return (
    <PagesLayout className="">
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(selectedRegistration)}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          try {
            const response = await Create_Store_Api(values);
            if (response.status === 201) {
              makeToast("Store created successfully!");
              resetForm();
              // handleClick("/store/all");
            }
          } catch (error: any) {
            console.error(error);
            if (error.response.data) {
              makeToastError(error.response.data.message);
            }
            // handle form error
          }
        }}
      >
        {({ values, setFieldValue, resetForm, isSubmitting }) => (
          <Form>
            {/* <PageLayoutHeader className="fixed top-14  right-0  shadow-[0px_2px_9px_0px_#00000024] left-0 bg-white z-50"> */}
            <PageLayoutHeader className="f">
              <div className="flex justify-between w-full px-16 items-center">
                <h1 className="sm:text-lg text-sm font-bold text-textGray select-none">
                  Seller Creation
                </h1>
              </div>
            </PageLayoutHeader>
            {/* ======================== */}
            <PagesLayoutContent className="space-y-4 max-w-screen-md mx-auto md:p-5 p-2 md:border shadow-2xl md:mt-14 mt-16">
              {/* store creation type ======== */}
              {/* store registration type */}
              <div className="flex justify-between items-center lg:flex-row flex-col">
                <Label
                  htmlFor="registrationType"
                  className="text-sm text-textGray"
                >
                  Registration Types
                </Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedRegistration(value as IRegistrationTypes);
                    setFieldValue("registrationType", value);
                    // console.log(value);
                  }}
                  value={values.registrationType}
                  name="registrationType"
                >
                  <SelectTrigger className="lg:w-3/4">
                    <SelectValue placeholder="Select Registration Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrationTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        disabled={values.registrationType === type.value}
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ===========  mapping of main details ======== */}
              {inputFields.map((field) => (
                <FormField
                  key={field.id}
                  id={field.id}
                  name={field.id}
                  title={field.label}
                  classnamewrapper=""
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  type={field.fileType}
                  value={`${values[field.id]}` || ""}
                  fieldAs={Input}
                />
              ))}

              {/* 8. Google Location */}
              <div className="flex gap-3 items-center justify-between">
                <Label>
                  <Icon icon="openmoji:location-indicator-red" fontSize={25} />
                </Label>
                <div className="lg:w-3/4 space-x-3">
                  <AyButton
                    title="Set google location"
                    iconSize={23}
                    onClick={() => {
                      handleSetGoogleLocation();
                    }}
                    icon="fluent:my-location-16-regular"
                    sx={{
                      width: "fit-content",
                      px: "15px",
                      bgcolor: "#cc975a",
                      border: "1px solid #C9C9C9",
                      borderRadius: "10px",
                      color: "black",
                      cursor: "pointer",
                      "&:hover": {
                        bg: "blue.600",
                      },
                    }}
                  />
                  {/* {values.googleLocation} */}
                  {values.googleLocation && values.googleLocation.longitude ? (
                    <span className="text-xs">
                      {`Lat: ${values.googleLocation.latitude}, Lng: ${values.googleLocation.longitude}`}
                    </span>
                  ) : (
                    <span className="text-xs">No location set</span>
                  )}
                </div>
              </div>
              <GoogleMap
                setGoogleAddress={setGoogleAddress}
                googleAddress={googleAddress}
                setFieldValue={setFieldValue}
              />
              {/* Upload documents ========= */}
              <div className="">
                <span className="text-sm font-bold">Upload Documents :</span>
              </div>
              {renderForms(values, setFieldValue)}

              {/* User & Store Manager Details =================== */}
              <div className="">
                <span className="text-sm font-bold">User Details :</span>
              </div>
              <div className="grid md:grid-cols-3 gap-2 w-full">
                {userDetailsFields.slice(0, 3).map((field) => (
                  <FormField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    type={field.fileType || "text"}
                    classnamewrapper="w-full lg:w-full"
                    placeholder={field.placeholder}
                    value={`${values[field.name]}` || ""}
                    fieldAs={Input}
                  />
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-2 w-full">
                {userDetailsFields.slice(3).map((field) => (
                  <FormField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    type={field.fileType || "text"}
                    classnamewrapper="w-full lg:w-full"
                    placeholder={field.placeholder}
                    value={`${values[field.name]}` || ""}
                    fieldAs={Input}
                  />
                ))}
              </div>

              {/* 14 . In-House Product ----- */}
              <div className="flex items-center gap-2">
                <label htmlFor="inHouseProduct" className="text-xs">
                  In-House Product
                </label>
                <Field
                  type="checkbox"
                  id="inHouseProduct"
                  name="inHouseProduct"
                  classnamewrapper=""
                  checked={values.inHouseProduct}
                />
              </div>
              {/* Bank Details starts here
               -----------------------------*/}
              <div>
                <div className="">
                  <span className="text-sm font-bold">Bank Details :</span>
                </div>
                <div className="grid md:grid-cols-1 gap-2 w-full">
                  {bankDetailsFields.map((field) => (
                    <FormField
                      key={field.id}
                      title={`${field.name}`}
                      id={`bankDetails.${field.id}`}
                      name={`bankDetails.${field.name}`}
                      type={field.fileType || "text"}
                      classnamewrapper=""
                      placeholder={field.placeholder}
                      value={values.bankDetails[field.name] || ""}
                      fieldAs={Input}
                    />
                  ))}
                </div>
              </div>
              {/* <FormField
                id="bankDetails.upiId"
                name="bankDetails.upiId"
                classnamewrapper=""
                title="UPI ID"
                placeholder="Enter UPI ID"
                value={values.bankDetails.upiId || ""}
                fieldAs={Input}
              /> */}
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-2">
                <AyButton
                  title="Cancel"
                  variant="cancel"
                  sx={{
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    resetForm();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
                <AyButton
                  title={`${isSubmitting ? "Loading..." : "Save"}`}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  type="submit"
                  sx={{
                    borderRadius: "8px",
                  }}
                />
              </div>
            </PagesLayoutContent>
          </Form>
        )}
      </Formik>
    </PagesLayout>
  );
}
