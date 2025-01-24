import { Formik, Form, Field, ErrorMessage } from "formik";


type Props = {
  onClose: () => void;
};

interface CustomerDetailsFormValues {
  name: string;
  email: string;
  phone: string;
  gstNumber: string;
  pincode: string;
  buildingNumber: string;
  street: string;
  post: string;
  state: string;
  country: string;
  uploadedDocument: File | null;
  status: string;
  comment: string;
}

const initialValues: CustomerDetailsFormValues = {
  name: "",
  email: "",
  phone: "",
  gstNumber: "",
  pincode: "",
  buildingNumber: "",
  street: "",
  post: "",
  state: "",
  country: "",
  uploadedDocument: null,
  status: "Pending",
  comment: "",
};

// const validationSchema = Yup.object({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   phone: Yup.string().required("Required"),
//   gstNumber: Yup.string().required("Required"),
//   pincode: Yup.string().required("Required"),
//   buildingNumber: Yup.string().required("Required"),
//   street: Yup.string().required("Required"),
//   post: Yup.string().required("Required"),
//   state: Yup.string().required("Required"),
//   country: Yup.string().required("Required"),
//   uploadedDocument: Yup.mixed().required("Document is required"),
//   comment: Yup.string(),
// });
import TaskModal, { TaskModalContent, TaskModalHeader } from "../TaskModal";
import MyCloseIcon from "@/components/icons/My_CloseIcon";

import { Input } from "@/components/ui/input";
import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import { Label } from "@/components/ui/label";

export default function CustomerDetailsModal({ onClose }: Props) {
  return (
    <div>
      <TaskModal>
        <TaskModalHeader>
          <div className="md:w-[70%] w-full"></div>
          <MyCloseIcon
            onClick={() => {
              onClose();
            }}
          />
        </TaskModalHeader>
        <TaskModalContent>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {() => (
              <Form>
              {/* Name */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Name</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="name" type="text" as={Input} placeholder="Full name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Email */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Email</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="email" type="email" as={Input} placeholder="Email address" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Phone */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Phone</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="phone" type="text" as={Input} placeholder="Phone number" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* GST Number */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>GST Number</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="gstNumber" type="text" as={Input} placeholder="GST number" />
                  <ErrorMessage
                    name="gstNumber"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Pincode */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Pincode</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="pincode" type="text" as={Input} placeholder="Postal code" />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Building Number */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Building Number</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="buildingNumber" type="text" as={Input} placeholder="Building number" />
                  <ErrorMessage
                    name="buildingNumber"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Street */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Street</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="street" type="text" as={Input} placeholder="Street name" />
                  <ErrorMessage
                    name="street"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Post */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Post</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="post" type="text" as={Input} placeholder="Post office" />
                  <ErrorMessage
                    name="post"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* State */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>State</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="state" type="text" as={Input} placeholder="State" />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Country */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Country</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="country" type="text" as={Input} placeholder="Country" />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Uploaded Document */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Uploaded Document</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <MyPdf value="/Invoice_INV1482989614215502 (16).pdf" className="w-10 h-10" />
                  <ErrorMessage
                    name="uploadedDocument"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Status */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Status</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field name="status" type="text" as={Input} disabled placeholder="Status" />
                </div>
              </div>
            
              {/* Comment */}
              <div className="flex justify-between md:flex-row flex-col gap-3 items-start mb-4">
                <Label>Comment</Label>
                <div className="flex flex-col md:w-[70%] w-full text-sm">
                  <Field
                    name="comment"
                    as="textarea"
                    placeholder="Add comments"
                    className="h-20 border p-2 rounded-md resize-none"
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
            
              {/* Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <AyButton title="Cancel" type="button" outLineColor="" variant="outlined" />
                <AyButton title="Save" type="submit" />
              </div>
            </Form>
            
            )}
          </Formik>
        </TaskModalContent>
      </TaskModal>
    </div>
  );
}
