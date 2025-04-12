import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import AyButton from "../myUi/AyButton";
import { Form, Formik } from "formik";

export default function OrderStatusSelectionSection() {
  return (
    <div className="">
      <Formik
        initialValues={{
          deliveryPartner: "",
          paymentStatus: "",
          deliveryStatus: "",
        }}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          console.log(values);

          // Reset the form and select fields
          resetForm();
          setFieldValue("deliveryPartner", "");
          setFieldValue("paymentStatus", "");
          setFieldValue("deliveryStatus", "");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex gap-6">
            <div className="flex flex-col gap-3">
              <Label className="text-xs text-textGray font-bold">
                Assign delivery partner
              </Label>
              <Select
                value={values.deliveryPartner}
                onValueChange={(value) => {
                  setFieldValue("deliveryPartner", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Delivery Partner" />
                </SelectTrigger>
                <SelectContent className="text-xs">
                  <SelectItem className="text-xs" value="pending">SS logistics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Status */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs text-textGray font-bold">
                Payment Status
              </Label>
              <Select
                value={values.paymentStatus}
                onValueChange={(value) => {
                  setFieldValue("paymentStatus", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent className="text-xs">
                  <SelectItem className="text-xs" value="paid">Paid</SelectItem>
                  <SelectItem className="text-xs" value="un-paid">Un-Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Delivery Status */}
            <div className="flex flex-col gap-3">
              <Label className="text-xs text-textGray font-bold">
                Delivery Status
              </Label>
              <Select
                value={values.deliveryStatus}
                onValueChange={(value) => {
                  setFieldValue("deliveryStatus", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent className="text-xs">
                  <SelectItem className="text-xs" value="pending">Pending</SelectItem>
                  <SelectItem className="text-xs" value="confirmed">Confirm Order</SelectItem>
                  <SelectItem className="text-xs" value="pick-up">Pick Up</SelectItem>
                  <SelectItem className="text-xs" value="delivered">Deliver Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col justify-end">
              <AyButton title="Submit" type="submit" outLineColor="" variant="outlined"/>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
