import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "./TaskModal";
import AyButton from "../myUi/AyButton"; // Import shadcn UI components
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Field, Form, Formik } from "formik";
import { useModal } from "@/providers/context/context";
import MyPdf from "../myUi/MyPdf";
import MyCloseIcon from "../icons/My_CloseIcon";
import { Update_Customer_Kyc_Api } from "@/services/customer/route";
import { useAppDispatch } from "@/redux/hook";
import { fetchCustomerDetails } from "@/redux/actions/customerSlice";
import { makeToast, makeToastError } from "@/utils/toaster";

export default function KycDashModal() {
  const dispatch = useAppDispatch();
  const { selectedTask, closeModal } = useModal(); // Get the modal context

  console.log(selectedTask,'selectedTask');

  return (
    <TaskModal className="h-[85vh] lg:w-[40vw] sm:w-[70vw] w-full flex flex-col">
      <TaskModalHeader>
        <h2 className="text-lg font-semibold">KYC Details</h2>
        <MyCloseIcon
          onClick={() => {
            closeModal();
          }}
        />
      </TaskModalHeader>

      {/* KYC Form */}
      <Formik
        initialValues={{
          businessName: selectedTask ? selectedTask.kyc?.businessName : "",
          emailId: selectedTask ? selectedTask.kyc?.emailId : "",
          buildingName: selectedTask ? selectedTask.kyc.buildingName : "",
          street: selectedTask ? selectedTask.kyc.street : "",
          mobile: selectedTask ? selectedTask.user.mobile : "",
          pinCode: selectedTask ? selectedTask.kyc.pinCode : "",
          state: selectedTask ? selectedTask.kyc.state : "",
          country: selectedTask ? selectedTask.kyc.country : "",
          proof: selectedTask ? selectedTask.kyc.proof : "",
          kycStatus: selectedTask ? selectedTask.kyc?.status || "pending" : "pending",
          proofType: selectedTask ? selectedTask.kyc.proofType : "",
          gstNumber: selectedTask ? selectedTask.kyc?.gstNumber : "",
          feedback: selectedTask ? selectedTask.kyc?.kycFeedback : "",
        }}
        onSubmit={async (values) => {
          // console.log("Form submitted", values);

          const formData = new FormData();

          // Append all KYC details to FormData
          formData.append("businessName", values.businessName);
          formData.append("emailId", values.emailId);
          formData.append("buildingName", values.buildingName);
          formData.append("street", values.street);
          formData.append("pinCode", values.pinCode);
          formData.append("state", values.state);
          formData.append("country", values.country);
          formData.append("proofType", values.proofType || ""); // Ensure proofType is a string
          formData.append("action", values.kycStatus);
          formData.append("feedback", values.feedback || "");
          if (values.proof) {
            formData.append("proof", values.proof); // Append the uploaded file
          }
          formData.append("gstNumber", values.gstNumber);

          try {
            const response = await Update_Customer_Kyc_Api(
              formData,
              selectedTask?.kyc?._id ?? ""
            );
            if (response.status === 200) {
              dispatch(fetchCustomerDetails());
              makeToast(`${response.data.message}`);
            }
            // console.log(response);
          } catch (error: any) {
            // console.error(error);
            if (error.response.data) {
              makeToastError(error.response.data.message);
            }
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <TaskModalContent className="space-y-5">
              {/* Business Name */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Business Name
                </Label>
                <Field
                  name="businessName"
                  id="businessName"
                  value={values.businessName}
                  as={Input}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Business Name"
                />
              </div>

              {/* GST Number */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  GST Number
                </Label>
                <Field
                  as={Input}
                  name="gstNumber"
                  id="gstNumber"
                  value={values.gstNumber}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter GST Number"
                />
              </div>

              {/* Contact Number */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Contact Number
                </Label>
                <Field
                  as={Input}
                  name="mobile"
                  id="mobile"
                  value={values.mobile}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Contact Number"
                />
              </div>

              {/* Email ID */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Email ID
                </Label>
                <Field
                  as={Input}
                  className="md:w-[70%] w-full rounded-lg"
                  name="emailId"
                  id="emailId"
                  value={values.emailId}
                  type="email"
                  placeholder="Enter Email ID"
                />
              </div>

              {/* Building Name/Number */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Building Name/Number
                </Label>
                <Field
                  as={Input}
                  name="buildingName"
                  id="buildingName"
                  value={values.buildingName}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Building Name/Number"
                />
              </div>

              {/* Street */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Street
                </Label>
                <Field
                  as={Input}
                  name="street"
                  id="street"
                  value={values.street}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Street"
                />
              </div>

              {/* Post */}
              {/* <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Post
                </Label>
                <Field
                  as={Input}
                  name="post"
                  id="post"
                  value={values.post}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Post"
                />
              </div> */}

              {/* State */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  State
                </Label>
                <Field
                  as={Input}
                  name="state"
                  id="state"
                  value={values.state}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter State"
                />
              </div>

              {/* Pincode */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Pincode
                </Label>
                <Field
                  as={Input}
                  name="pinCode"
                  id="pinCode"
                  value={values.pinCode}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Pincode"
                />
              </div>

              {/* Country */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Country
                </Label>
                <Field
                  as={Input}
                  name="country"
                  id="country"
                  value={values.country}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Country"
                />
              </div>

              {/* proofType */}
              {/* <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  proofType
                </Label>
                <Field
                  as={Input}
                  name="proofType"
                  id="proofType"
                  value={values.proofType}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter proofType"
                />
              </div> */}

              {/* Status */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  proofType
                </Label>
                <Select
                  name="proofType"
                  value={values.proofType}
                  onValueChange={(value) => setFieldValue("proofType", value)}
                >
                  <SelectTrigger className="md:w-[70%] w-full rounded-lg">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="z-[10004]">
                  
                    <SelectItem
                      value="Udyam Aadhaar"
                      disabled={
                        selectedTask?.kyc?.proofType === "Udyam Aadhaar"
                      }
                    >
                      Udyam Aadhaar
                    </SelectItem>
                    <SelectItem
                      value="Current Account Cheque"
                      disabled={
                        selectedTask?.kyc?.proofType ===
                        "Current Account Cheque"
                      }
                    >
                      Current Account Cheque
                    </SelectItem>
                    <SelectItem
                      value="GST Certificate"
                      disabled={
                        selectedTask?.kyc?.proofType === "GST Certificate"
                      }
                    >
                      GST Certificate
                    </SelectItem>
                    <SelectItem
                      value="Shop & Establishment License"
                      disabled={
                        selectedTask?.kyc?.proofType ===
                        "Shop & Establishment License"
                      }
                    >
                      Shop & Establishment License
                    </SelectItem>
                    <SelectItem
                      value="Trade Certificate/License"
                      disabled={
                        selectedTask?.kyc?.proofType ===
                        "Trade Certificate/License"
                      }
                    >
                      Trade Certificate/License
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ======= */}

              {/* Uploaded Document */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Uploaded Document
                </Label>
                <div className="md:w-[70%] w-full flex items-start">
                  <MyPdf value={selectedTask?.kyc.proof ?? ""} />
                  {/* <a
                    href={"/Invoice_INV1482989614215502 (16).pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                  >
                    <PdfFile
                      fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                      className="h-16 w-12"
                    />
                    <div className="absolute h-16 w-12 bg-black/50 top-0 rounded-md flex items-center justify-center">
                      <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                    </div>
                  </a> */}
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Status
                </Label>
                <Select
                name="kycStatus"
                  value={values.kycStatus}
                  onValueChange={(value) => setFieldValue("kycStatus", value)}
                >
                  <SelectTrigger className="md:w-[70%] w-full rounded-lg">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="z-[10004]">
                    <SelectItem value="pending" disabled>
                      Pending
                    </SelectItem>
                    <SelectItem
                      value="approved"
                      disabled={selectedTask?.user?.kycStatus === "approved"}
                    >
                      Approved
                    </SelectItem>
                    <SelectItem
                      value="rejected"
                      disabled={selectedTask?.user?.kycStatus === "rejected"}
                    >
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comment */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Comment
                </Label>
                <Field
                  as={Textarea}
                  name="feedback"
                  id="feedback"
                  value={values.feedback}
                  placeholder="Enter Comment"
                  className="md:w-[70%] w-full rounded-lg resize-none"
                />
              </div>
            </TaskModalContent>

            <TaskModalFooter>
              <span className="mr-auto">[esc] for close</span>
              <AyButton
                type="button"
                title="Cancel"
                outLineColor="gray"
                variant="outlined"
              />
              <AyButton
                type="submit"
                disabled={isSubmitting}
                title={`${isSubmitting ? "Updating ..." : "submit"}`}
              />
            </TaskModalFooter>
          </Form>
        )}
      </Formik>
    </TaskModal>
  );
}
