import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import AyButton from "@/components/myUi/AyButton";
import FileInput from "@/components/myUi/FileInput";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import * as Yup from "yup";

type FormData = {
  contact_number: string;
  whatsapp_number: string;
  upiId: string;
  upi_banners: File[];
  bank_details: {
    account_number: string;
    account_name: string;
    bank_name: string;
    ifsc_code: string;
    swift_code: string;
  };
};

const validationSchema = Yup.object().shape({
  contact_number: Yup.string()
    .matches(/^\d+$/, "Contact number must contain only digits")
    .min(10, "Contact number must be at least 10 digits")
    .required("Contact number is required"),
  whatsapp_number: Yup.string()
    .matches(/^\d+$/, "WhatsApp number must contain only digits")
    .min(10, "WhatsApp number must be at least 10 digits")
    .required("WhatsApp number is required"),
  upiId: Yup.string()
    .email("Invalid UPI ID format")
    .required("UPI ID is required"),
  // upi_banners: Yup.array()
  //   .of(Yup.mixed().required("At least one banner is required"))
  //   .min(1, "At least one UPI banner is required"),
  bank_details: Yup.object().shape({
    account_number: Yup.string()
      .matches(/^\d+$/, "Account number must contain only digits")
      .required("Account number is required"),
    account_name: Yup.string().required("Account name is required"),
    bank_name: Yup.string().required("Bank name is required"),
    ifsc_code: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
      .required("IFSC code is required"),
    swift_code: Yup.string().required("Swift code is required"),
  }),
});

export default function OfflineSetupForm() {
  const initialValues: FormData = {
    contact_number: "",
    whatsapp_number: "",
    upiId: "",
    upi_banners: [],
    bank_details: {
      account_number: "",
      account_name: "",
      bank_name: "",
      ifsc_code: "",
      swift_code: "",
    },
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6 max-w-screen-xl ">
            {/* Contact Number */}

            <strong>General</strong>

            <FormField
              value={values.contact_number}
              id="contact_number"
              name="contact_number"
              title="Contact Number"
              placeholder="Enter contact number"
              fieldAs={Input}
              fieldClassName="border border-gray-300 rounded-md"
            />

            {/* WhatsApp Number */}
            <FormField
              value={values.whatsapp_number}
              id="whatsapp_number"
              name="whatsapp_number"
              title="WhatsApp Number"
              placeholder="Enter WhatsApp number"
              fieldAs={Input}
              fieldClassName="border border-gray-300 rounded-md"
            />

            <strong>UPI details</strong>

            {/* UPI ID */}
            <FormField
              value={values.upiId}
              id="upiId"
              name="upiId"
              title="UPI ID"
              placeholder="Enter UPI ID"
              fieldAs={Input}
              fieldClassName="border border-gray-300 rounded-md"
            />

            {/* Upi Banners */}
            <div className="flex justify-between">
              <Label>Upi apps banner</Label>
              <div className="lg:w-3/4">
                <FileInput
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  id="upi_banners"
                  name="upi_banners"
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      // Convert FileList to an array
                      setFieldValue("upi_banners", Array.from(e.target.files));
                    }
                  }}
                  className=""
                />
                    <div className="flex flex-wrap gap-4 mt-2">
                    {values.upi_banners &&
                      values.upi_banners.map((file, index) => (
                        <div key={index} className="relative w-16 h-16">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`KYC Slider ${index + 1}`}
                            className="w-full h-full object-cover border rounded"
                          />
                          <div className="absolute -right-4 -top-8">
                            <MyDeleteIcon
                              color="#EC922B"
                              onClick={() => {
                                const updatedImages = values.upi_banners.filter(
                                  (_, i) => i !== index
                                );
                                setFieldValue("upi_banners", updatedImages);
                              }}
                              icon="zondicons:close-solid"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="font-bold mt-4">Bank Details</h3>
              <FormField
                value={values.bank_details.account_number}
                id="bank_details.account_number"
                name="bank_details.account_number"
                title="Account Number"
                placeholder="Enter account number"
                fieldAs={Input}
                fieldClassName="border border-gray-300 rounded-md"
              />
              <FormField
                value={values.bank_details.account_name}
                id="bank_details.account_name"
                name="bank_details.account_name"
                title="Account Name"
                placeholder="Enter account name"
                fieldAs={Input}
                fieldClassName="border border-gray-300 rounded-md"
              />
              <FormField
                value={values.bank_details.bank_name}
                id="bank_details.bank_name"
                name="bank_details.bank_name"
                title="Bank Name"
                placeholder="Enter bank name"
                fieldAs={Input}
                fieldClassName="border border-gray-300 rounded-md"
              />
              <FormField
                value={values.bank_details.ifsc_code}
                id="bank_details.ifsc_code"
                name="bank_details.ifsc_code"
                title="IFSC Code"
                placeholder="Enter IFSC code"
                fieldAs={Input}
                fieldClassName="border border-gray-300 rounded-md"
              />
              <FormField
                value={values.bank_details.swift_code}
                id="bank_details.swift_code"
                name="bank_details.swift_code"
                title="Swift Code"
                placeholder="Enter Swift code"
                fieldAs={Input}
                fieldClassName="border border-gray-300 rounded-md"
              />
            </div>

            {/* Submit Button */}
            <div className="mr-auto w-full flex justify-end">
              <AyButton 
              title="Submit"
              type="submit"
              />
             
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
