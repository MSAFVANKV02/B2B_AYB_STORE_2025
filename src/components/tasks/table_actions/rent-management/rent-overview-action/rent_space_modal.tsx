import { extentStoreCubicMeterRequestAction } from "@/actions/rental/rentalActions";
import Loader from "@/components/global/loader";
import MyRadioGroup from "@/components/global/radio-group";
import MyEyeIcon from "@/components/icons/My_EyeIcon";
import Modal from "@/components/modals/main";
import AyButton from "@/components/myUi/AyButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutationData } from "@/hooks/useMutationData";
import { useAppSelector } from "@/redux/hook";
// import { IRentTypes } from "@/types/rent-types";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";

// type Props = {
//   data?: IRentTypes;
// };

export const RentSpaceChangeModal = () => {
const {currentAdmin} = useAppSelector((state)=>state.admin)

  const radioOptions = [
    { label: "Increase", value: "increase" },
    { label: "Decrease", value: "decrease" },
  ];

  const { mutate, isPending } = useMutationData(
    ["request-update"],
    ({
      // rentalId,
      remarks,
      action,
      volume,
    }: {
      // rentalId: string;
      remarks: string;
      volume: number;
      action: string;
    }) =>
      extentStoreCubicMeterRequestAction({
        action,
        remarks,
        volume,
      }),
    [""]
  );

  return (
    <Modal
      title="Request Space Change"
      classnameTitle="text-center font-semibold "
      classname="bg-[#F3F4F6] min-h-[550px] "
      trigger={
        <MyEyeIcon
          onClick={() => {
            // dispatchModal({ type: "OPEN_MODAL", modalType: "order-details", payload:orders });
          }}
          className="bg-blue-100 text-blue-400 rounded-sm"
          color="#000000"
          icon="material-symbols:settings"
        />
      }
    >
      <Formik
        initialValues={{
          action: "increase",
          volume: 0,
          remarks: "",
        }}
        validationSchema={Yup.object({
          action: Yup.string()
            .oneOf(["increase", "decrease"])
            .required("Request type is required"),
          volume: Yup.number()
            .typeError("Volume must be a number")
            .required("Volume is required")
            .min(1, "Volume must be at least 1"),
          remarks: Yup.string()
            .required("Remarks are required")
            .min(5, "Remarks must be at least 5 characters"),
        })}
        onSubmit={(value, { resetForm }) => {
          // console.log(value, "value");
          mutate(
            {
              action: value.action,
              remarks: value.remarks,
              volume: value.volume,
            },
            {
              onSuccess: () => {
                resetForm(); // ✅ reset form after success
              },
            }
          );
        }}
      >
        {({ setFieldValue }) => (
          <Form className="bg-white p-4 flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <Label htmlFor="current-space" className="text-xs">
                Current Store Space
              </Label>
              <p className="text-xs" id="current-space">
               {currentAdmin?.storeCapacity} m<sup>3</sup>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="request-type" className="font-semibold">
                Request Type
              </Label>
              <div className="w-1/2 flex justify-end">
                <MyRadioGroup
                  options={radioOptions}
                  onChange={(value) => setFieldValue("action", value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-space" className="font-semibold">
                New Desired Space (in m³)
              </Label>
              <div className="w-1/2 flex flex-col gap-2">
                <Field
                  as={Input}
                  className="text-xs w-full"
                  id="volume"
                  type="number"
                  name="volume"
                />
                <ErrorMessage
                  name="volume"
                  component={"span"}
                  className="text-xs text-red-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="remarks" className="font-semibold ">
                Reason / Note
              </Label>
              <div className=" flex flex-col gap-2">
                <Field
                  as={Textarea}
                  className="text-xs w-full"
                  id="remarks"
                  type="number"
                  name="remarks"
                />
                <ErrorMessage
                  name="remarks"
                  component={"span"}
                  className="text-xs text-red-500"
                />
              </div>
            </div>

            {/* form buttons starts =========== */}
            <div className="flex items-center gap-3">
              <div className="w-full">
                <AyButton
                  type="button"
                  variant="gray"
                  disabled={isPending}
                  sx={{
                    width: "100%",
                  }}
                >
                  Cancel
                </AyButton>
              </div>
              <div className="w-full">
                <AyButton
                  type="submit"
                  disabled={isPending}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Loader state={isPending}>Submit Request</Loader>
                </AyButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
