import AyButton from "@/components/myUi/AyButton";
import useNavigateClicks from "@/hooks/useClicks";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import FileInput from "@/components/myUi/FileInput";
import { Textarea } from "@/components/ui/textarea";
import MyPdf from "@/components/myUi/MyPdf";
import { useState } from "react";
const validationSchema = Yup.object({
  store: Yup.string().required("Store is required"),

  pay: Yup.number()
    .positive("Pay amount must be positive")
    .required("Pay is required"),
  transaction_id: Yup.string().required("Transaction ID is required"),

  message: Yup.string().required("Message is required"),
});

export default function StorePaymentForm() {
  const { handleClick } = useNavigateClicks();
  const [fileURL, setFileURL] = useState<string | null>(null);


  const initialValues = {
    store: "",
    bank_details: {
      account_name: "",
      account_number: "",
      ifsc: "",
      shift_code: "",
      upi_id: "",
      phone_number: "",
    },
    pay: "",
    transaction_id: "",
    upload_file: null, // To handle file upload
    message: "",
  };

  return (
    <div className="">
      <div className="flex justify-between py-4">
        {/* <h2>Create Store</h2> */}
        <AyButton
          title="Payout"
          onClick={() => {
            handleClick("/store/payout-store");
          }}
          sx={{
            ml: {
              md: "auto",
            },
            borderRadius: "100px",
            width: {
              md: "fit-content",
            },
            px: "14px",
            py: "10px",
          }}
        />
      </div>
      {/* =======  forms starts ========= */}
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form className="space-y-4 max-w-screen-md mx-auto md:p-5 p-2 md:border shadow bg-white">
              {/* Store */}
              <FormField
                title="Store Name"
                id="store"
                name="store"
                placeholder="Enter store name"
                value={values.store || ""}
                fieldAs={Input}
              />

              {/* Bank Details */}
              {/* <h3 className="font-bold">Bank Details</h3> */}
              <FormField
                id="bank_details.account_name"
                name="bank_details.account_name"
                placeholder="Enter account name"
                value={values.bank_details.account_name || ""}
                fieldAs={Input}
                className="lg:justify-end"
                readonly
              />
              <FormField
                id="bank_details.account_number"
                name="bank_details.account_number"
                placeholder="Enter account number"
                value={values.bank_details.account_number || ""}
                fieldAs={Input}
                className="lg:justify-end"
                readonly
              />
              <FormField
                id="bank_details.ifsc"
                name="bank_details.ifsc"
                placeholder="Enter IFSC code"
                value={values.bank_details.ifsc || ""}
                fieldAs={Input}
                className="lg:justify-end"
                readonly
              />
              <FormField
                id="bank_details.shift_code"
                name="bank_details.shift_code"
                placeholder="Enter shift code"
                value={values.bank_details.shift_code || ""}
                fieldAs={Input}
                className="lg:justify-end"
                readonly
              />
              <FormField
                id="bank_details.upi_id"
                name="bank_details.upi_id"
                placeholder="Enter UPI ID"
                value={values.bank_details.upi_id || ""}
                fieldAs={Input}
                className="lg:justify-end"
                readonly
              />
              <FormField
                id="bank_details.phone_number"
                name="bank_details.phone_number"
                placeholder="Enter phone number"
                value={values.bank_details.phone_number || ""}
                fieldAs={Input}
                className="lg:justify-end"
                readonly
              />

              {/* Payment Details */}
              {/* <h3 className="font-bold">Payment Details</h3> */}
              <FormField
                id="pay"
                name="pay"
                title="Pay"
                placeholder="Enter payment amount"
                value={values.pay || ""}
                fieldAs={Input}
                type="number"
              />
              <FormField
                title="Transaction ID"
                id="transaction_id"
                name="transaction_id"
                placeholder="Enter transaction ID"
                value={values.transaction_id || ""}
                fieldAs={Input}
              />

              {/* File Upload */}
              <div className="flex lg:flex-row flex-col gap-2 lg:items-center justify-between ">
                <Label htmlFor="upload_file" className="text-gray-500">Upload file</Label>
              <div className="flex flex-col lg:w-3/4 w-full gap-3">
              <FileInput
              img="catppuccin:pdf"
                  accept=".pdf"
                  id="upload_file"
                  name="upload_file"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      const file = event.target.files?.[0];
                      const fileURL = URL.createObjectURL(file);
                      setFileURL(fileURL);
                      setFieldValue("upload_file", file);
                      // const reader = new FileReader();

                      // reader.onload = () => {
                      //   // Set the Base64 string of the file as the value
                      //   setFieldValue("upload_file", reader.result);
                      // };

                      // reader.onerror = () => {
                      //   console.error("File reading failed");
                      //   setFieldValue("upload_file", null); // Reset if there's an error
                      // };

                      // reader.readAsDataURL(file); // Converts the file to a Base64 string
                    }
                  }}
                  className=" w-full"
                  type="file"
                  // selectedData={values.upload_file}
                />
                
                {values.upload_file && (
                  <MyPdf value={fileURL ?? ""} />
                )}
              </div>
              </div>

              {/* Message */}
              <FormField
                id="message"
                title="Message"
                name="message"
                fieldClassName="resize-none"
                placeholder="Enter your message"
                value={values.message || ""}
                fieldAs={Textarea}
              />

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-2">
                <AyButton
                  title="Cancel"
                  sx={{
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    resetForm();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
                <AyButton
                  title="Save"
                  type="submit"
                  sx={{
                    borderRadius: "8px",
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
