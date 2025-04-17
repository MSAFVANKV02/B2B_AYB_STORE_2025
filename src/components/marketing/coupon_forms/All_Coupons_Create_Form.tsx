import { UseModal } from "@/providers/context/context";

import { ErrorMessage, Form, Formik } from "formik";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

import * as Yup from "yup";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MySwitch } from "@/components/myUi/mySwitch";
import AyButton from "@/components/myUi/AyButton";

import { ICouponType, IGetAllDataType } from "@/types/ICouponTypes";
import CouponSelections from "./coupon_selections/Coupon_Selections";
import { create_Coupons_Api, edit_Coupons_Api } from "@/services/coupons/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { dispatch } from "@/redux/hook";
import { getCouponsRedux } from "@/redux/actions/coupon_slice";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import {
  AddToSessionStorage,
  GetSessionStorage,
  SessionStorageAllPaths,
} from "@/hooks/use-sessioStorage";
import Loader from "@/components/global/loader";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Coupon code is required"),
  discountType: Yup.string().required("Discount type is required"),
  // discountValue: Yup.number().required("Discount amount is required"),
  // minimum_purchase_amount: Yup.number().required("Minimum purchase amount is required"),
  discountValue: Yup.number()
    .min(1)
    .typeError("Discount amount must be a number")
    .required("Discount amount is required"),

  startDate: Yup.date().required("Start date is required").nullable(),
  expiryDate: Yup.date()
    .required("Expiration date is required")
    .nullable()
    .test(
      "expired_at",
      "Expiration date cannot be earlier than start date",
      function (value) {
        const { start_date } = this.parent;
        if (start_date && value) {
          return new Date(value) >= new Date(start_date);
        }
        return true;
      }
    ),
  isActive: Yup.boolean(),
  // applicableProducts: Yup.array()
  //   .of(Yup.string().required())
  //   .min(1, "At least one product must be selected")
  //   .required("Applicable products are required"),
});

// const productOptions: SelectOption[] = [
//   { _id: "product_1", name: "Product 1" },
//   { _id: "product_2", name: "Product 2" },
//   { _id: "product_3", name: "Product 3" },
// ];

export default function AllCouponsCreateForm() {
  const { setIsOpen } = UseModal();
  const [searchParams] = useSearchParams();
  const { coupon } = SessionStorageAllPaths();

  const editId = useMemo(() => {
    return searchParams.get("editId");
  }, [searchParams]);

  const rawEditData = GetSessionStorage(coupon);
  const editData = rawEditData
    ? (JSON.parse(rawEditData) as ICouponType)
    : null;

  const selectItems: {
    id: number;
    title: string;
    name: keyof Partial<ICouponType>;
    placeholder?: string;
    type: keyof IGetAllDataType;
  }[] = [
    {
      id: 1,
      title: "Applicable Products",
      name: "applicableProducts",
      placeholder: "Select Products",
      type: "products",
    },
    {
      id: 2,
      title: "Applicable Categories",
      name: "applicableCategories",
      placeholder: "Select Categories",
      type: "categories",
    },
    {
      id: 3,
      title: "Applicable Stores",
      name: "applicableStores",
      placeholder: "Select Stores",
      type: "stores",
    },
    {
      id: 4,
      title: "Applicable Sellers",
      name: "applicableSellers",
      placeholder: "Select Sellers",
      type: "sellers",
    },
    {
      id: 5,
      title: "Applicable Brands",
      name: "applicableBrands",
      placeholder: "Select Brands",
      type: "brands",
    },
  ];

  return (
    <div className="border p-5 shadow-xl rounded-lg">
      <Formik<Partial<ICouponType>>
        validationSchema={validationSchema}
        initialValues={{
          code: editId && editData ? editData.code : "",
          discountType:
            editId && editData ? editData.discountType : "PERCENTAGE",
          discountValue: editId && editData ? editData.discountValue : 0,
          maxDiscountAmount:
            editId && editData ? editData.maxDiscountAmount : undefined,
          startDate:
            editId && editData ? new Date(editData.startDate) : new Date(),
          expiryDate:
            editId && editData ? new Date(editData.expiryDate) : new Date(),
          isActive: editId && editData ? editData.isActive : false,
          applicableProducts:
            editId && editData ? editData.applicableProducts : [],
          applicableCategories:
            editId && editData ? editData.applicableCategories : [],
          applicablePurchaseType:
            editId && editData ? editData.applicablePurchaseType : "ALL",
          applicableToAll:
            editId && editData ? editData.applicableToAll : false,
          applicableSellers:
            editId && editData ? editData.applicableSellers : [],
          applicableBrands: editId && editData ? editData.applicableBrands : [],
          maxUsagePerUser: editId && editData ? editData.maxUsagePerUser : 1,
          usageLimit: editId && editData ? editData.usageLimit : undefined,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          // console.log(values);
          const route = editId
            ? edit_Coupons_Api(values, editData?._id ?? "")
            : create_Coupons_Api(values);
          try {
            const { status, data } = await route;
            // console.log(data);

            if (status === 201 || status === 200) {
              dispatch(getCouponsRedux());
              AddToSessionStorage(coupon, JSON.stringify(data));

              makeToast(data.message || "Success");
              resetForm();
              setIsOpen(false);
            }
          } catch (error: any) {
            if (error) {
              makeToastError(error.response.data.message);
            }
            // console.error(error);
          }
        }}
      >
        {({ values, setFieldValue,resetForm, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex justify-between lg:flex-row flex-col gap-3">
              <Label
                htmlFor="applicablePurchaseType"
                className="text-sm text-textGray"
              >
                Coupon Type
              </Label>
              <div className="flex flex-col lg:w-3/4 w-full gap-2">
                <Select
                  onValueChange={(value) => {
                    setFieldValue("applicablePurchaseType", value);
                  }}
                  value={values.applicablePurchaseType}
                >
                  <SelectTrigger className="w-full p-6">
                    <SelectValue placeholder="Select Discount Type" />
                  </SelectTrigger>
                  <SelectContent className=" ">
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="FIRST_PURCHASE">
                      Welcome Coupon
                    </SelectItem>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name="applicablePurchaseType"
                  component="span"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            {/* 1. code name */}
            <FormField
              value={values.code}
              title="code"
              id="code"
              name="code"
              placeholder="Enter code"
              fieldAs={Input}
            />

            {/* 2. Discount Type */}
            <div className="flex justify-between lg:flex-row flex-col gap-3">
              <Label htmlFor="discountType" className="text-sm text-textGray">
                Discount Type
              </Label>
              <div className="flex flex-col lg:w-3/4 w-full gap-2">
                <Select
                  onValueChange={(value) => {
                    setFieldValue("discountType", value);
                  }}
                  value={values.discountType}
                >
                  <SelectTrigger className="w-full p-6">
                    <SelectValue placeholder="Select Discount Type" />
                  </SelectTrigger>
                  <SelectContent className=" ">
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="FIXED_AMOUNT">Fixed Price</SelectItem>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name="discountType"
                  component="span"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            {/* 3. discount amount */}
            <FormField
              value={values.discountValue}
              title="Discount Amount"
              id="discountValue"
              name="discountValue"
              type="number"
              placeholder="Enter discount amount"
              fieldAs={Input}
            />

            {/* 3. discount amount */}
            <FormField
              value={values.maxDiscountAmount}
              title="Enter Minimum Purchase Amount"
              id="maxDiscountAmount"
              name="maxDiscountAmount"
              type="number"
              placeholder="Enter Minimum Purchase Amount"
              fieldAs={Input}
            />

            {/* 4. purchase Limit per user */}

            <FormField
              value={values.maxUsagePerUser}
              title="User Limit"
              id="maxUsagePerUser"
              name="maxUsagePerUser"
              type="number"
              placeholder="Enter Purchase Limit"
              fieldAs={Input}
            />

            {/* 4. coupon Limit   */}

            <FormField
              value={values.usageLimit}
              title=" Coupon Usage Limit"
              id="usageLimit"
              name="usageLimit"
              type="number"
              placeholder="Enter Coupon Usage Limit"
              fieldAs={Input}
            />

            <div className="flex justify-between lg:flex-row flex-col">
              <Label
                htmlFor="applicableToAll"
                className="text-sm text-textGray"
              >
                Applicable All
              </Label>
              <div className="flex items-center gap-2 lg:w-3/4">
                <MySwitch
                  handleToggle={() => {
                    setFieldValue("applicableToAll", !values.applicableToAll);
                  }}
                  id="applicableToAll"
                  isOn={!!values.applicableToAll}
                />
              </div>
            </div>

            {/* applicable items */}
            {!values.applicableToAll &&
              selectItems.map((items, index) => (
                <CouponSelections
                  placeholder={items.placeholder}
                  index={index}
                  name={items.name}
                  setFieldValue={setFieldValue}
                  values={values}
                  title={items.title}
                  type={items.type}
                />
              ))}

            {/* === Dates Started ===== */}

            <div className="flex justify-between gap-10 lg:flex-row flex-col">
              <Label className="text-sm text-textGray">
                Started At / Expired At
              </Label>
              {/* 5. start date */}
              <div className="flex  md:w-3/4 w-full lg:flex-row flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Calendar
                    id="startDate"
                    mode="single"
                    selected={values.startDate}
                    onSelect={(value) => {
                      setFieldValue("startDate", value);
                    }}
                    className="rounded-md border w-fit"
                  />
                </div>
                <ErrorMessage
                  name="start_date"
                  component="span"
                  className="text-red-500 text-xs"
                />
                <div className="lex flex-col gap-3">
                  <Calendar
                    id="expiryDate"
                    selected={values.expiryDate}
                    mode="single"
                    onSelect={(value) => {
                      setFieldValue("expiryDate", value);
                    }}
                    className="rounded-md border w-fit"
                  />
                  <ErrorMessage
                    name="expiryDate"
                    component="span"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              {/* 6. expiration date */}
            </div>

            {/* ======= */}

            {/* 7. is active */}
            <div className="flex justify-between lg:flex-row flex-col">
              <Label htmlFor="isActive" className="text-sm text-textGray">
                Is Active
              </Label>
              <div className="flex items-center gap-2 lg:w-3/4">
                <MySwitch
                  handleToggle={() => {
                    setFieldValue("isActive", !values.isActive);
                  }}
                  id="isActive"
                  isOn={!!values.isActive}
                />
              </div>
            </div>

            <div className="flex justify-end gap-5">
              <AyButton
                title="Cancel"
                onClick={() => {
                  resetForm()
                }}
                type="button"
                sx={{
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.80)",
                  },
                }}
              />
              {/*  */}
              <AyButton type="submit">
                <Loader state={isSubmitting}>{editId ? "Edit" : "Save"}</Loader>
              </AyButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
