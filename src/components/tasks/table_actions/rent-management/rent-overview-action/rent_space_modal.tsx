import MyRadioGroup from "@/components/global/radio-group";
import MyEyeIcon from "@/components/icons/My_EyeIcon";
import Modal from "@/components/modals/main";
import AyButton from "@/components/myUi/AyButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, Formik } from "formik";

export const RentSpaceChangeModal = () => {
  const radioOptions = [
    { label: "Increase", value: "increase" },
    { label: "Decrease", value: "decrease" },
  ];
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
          icon="teenyicons:eye-outline"
        />
      }
    >
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form className="bg-white p-4 flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <Label htmlFor="current-space" className="text-xs">
                Current Store Space
              </Label>
              <p className="text-xs" id="current-space">
                120 m³
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="request-type" className="font-semibold">
                Request Type
              </Label>
              <div className="w-1/2 flex justify-end">
                <MyRadioGroup options={radioOptions} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-space" className="font-semibold">
                New Desired Space (in m³)
              </Label>
              <div className="w-1/2">
                <Input className="text-xs" id="new-space" />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="reason" className="font-semibold ">
                Reason / Note
              </Label>
              <Textarea
                id="reason"
                className=" resize-none h-[200px] text-xs"
                placeholder="give a note... "
              />
            </div>

            {/* form buttons starts =========== */}
            <div className="flex items-center gap-3">
              <div className="w-full">
                <AyButton
                  type="button"
                  variant="gray"
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
                  sx={{
                    width: "100%",
                  }}
                >
                  Submit Request
                </AyButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
