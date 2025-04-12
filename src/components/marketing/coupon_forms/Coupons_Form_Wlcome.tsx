import { useModal } from "@/providers/context/context";

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

const validationSchema = Yup.object().shape({
  coupon_code: Yup.string().required("Coupon code is required"),
  discount_type: Yup.string().required("Discount type is required"),
  // discount_amount: Yup.number().required("Discount amount is required"),
  // minimum_purchase_amount: Yup.number().required("Minimum purchase amount is required"),
  discount_amount: Yup.number()
    .typeError("Discount amount must be a number")
    .required("Discount amount is required"),

  start_date: Yup.date().required("Start date is required").nullable(),
  expired_at: Yup.date()
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
  is_active: Yup.boolean(),
});

export default function CouponsFormForWelcome() {
  const { setIsOpen } = useModal();

  return (
    <div className="border p-5 shadow-xl rounded-lg">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          id: "",
          coupon_code: "",
          discount_type: "percentage",
          discount_amount: 0,
          start_date: new Date(),
          expired_at: new Date(),
          is_active: false,
          applicable_product_id: [],
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
          setIsOpen(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            {/* 1. code name */}
            <FormField
              value={values.coupon_code}
              title="coupon_code"
              id="coupon_code"
              name="coupon_code"
              placeholder="Enter coupon_code"
              fieldAs={Input}
            />

            {/* 2. Discount Type */}
            <div className="flex justify-between lg:flex-row flex-col gap-3">
              <Label htmlFor="discount_type" className="text-sm text-textGray">
                Discount Type
              </Label>
              <div className="flex flex-col lg:w-3/4 w-full gap-2">
                <Select
                  onValueChange={(value) => {
                    setFieldValue("discount_type", value);
                  }}
                  value={values.discount_type}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select Discount Type" />
                  </SelectTrigger>
                  <SelectContent className=" ">
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name="discount_type"
                  component="span"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            {/* 3. discount amount */}
            <FormField
              value={values.discount_amount}
              title="Discount Amount"
              id="discount_amount"
              name="discount_amount"
              type="number"
              placeholder="Enter discount amount"
              fieldAs={Input}
            />

            {/* 4. minimum purchase amount */}

            {/* === Dates Started ===== */}

            <div className="flex justify-between gap-10 lg:flex-row flex-col">
              <Label className="text-sm text-textGray">
                Started At / Expired At
              </Label>
              {/* 5. start date */}
              <div className="flex  md:w-3/4 w-fullßß lg:flex-row flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Calendar
                    id="start_date"
                    mode="single"
                    selected={values.start_date}
                    onSelect={(value) => {
                      setFieldValue("start_date", value);
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
                    id="expired_at"
                    selected={values.expired_at}
                    mode="single"
                    onSelect={(value) => {
                      setFieldValue("expired_at", value);
                    }}
                    className="rounded-md border w-fit"
                  />
                  <ErrorMessage
                    name="expired_at"
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
              <Label htmlFor="is_active" className="text-sm text-textGray">
                Is Active
              </Label>
              <div className="flex items-center gap-2 lg:w-3/4">
                <MySwitch
                  handleToggle={() => {
                    setFieldValue("is_active", !values.is_active);
                  }}
                  id="is_active"
                  isOn={values.is_active}
                />
              </div>
            </div>

            <div className="flex justify-end gap-5">
              <AyButton title="Save" type="submit" />
              <AyButton
                title="Cancel"
                onClick={() => {}}
                type="button"
                sx={{
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.80)",
                  },
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
