import AyButton from "@/components/myUi/AyButton";
import { MySwitch } from "@/components/myUi/mySwitch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  StoreRentActivation: Yup.boolean(),
  StoreRentAmount: Yup.number()
    .nullable()
    .when("StoreRentActivation", {
      is: true, // Applies validation only if editId is falsy
      then: (schema) =>
        schema.required(
          "Rent Amount is required when Rent Activation is enabled"
        ),
      otherwise: (schema) => schema.nullable(), // Password is optional when editing
    }),
  StoreCommissionActivation: Yup.boolean(),
  StoreCommission: Yup.number()
    .nullable()
    .when("StoreCommissionActivation", {
      is: true, // Applies validation only if editId is falsy
      then: (schema) =>
        schema.required(
          "Commission Amount is required when Commission Activation is enabled"
        ),
      otherwise: (schema) => schema.nullable(), // Password is optional when editing
    }),
});

export default function StoreCommissionPage() {
  return (
    <PagesLayout title="Commission">
      <PageLayoutHeader>
        <h1>Commission</h1>
      </PageLayoutHeader>

      <PagesLayoutContent>
        <Formik
          initialValues={{
            StoreRentActivation: false,
            StoreRentAmount: null,
            StoreCommissionActivation: false,
            StoreCommission: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values, "values");
            const submittedValues: any = {};

            // Only add StoreRentActivation and StoreRentAmount if StoreRentActivation is true
            if (values.StoreRentActivation) {
              submittedValues.StoreRentActivation = values.StoreRentActivation;
              submittedValues.StoreRentAmount = values.StoreRentAmount;
            }

            // Only add StoreCommissionActivation and StoreCommission if StoreCommissionActivation is true
            if (values.StoreCommissionActivation) {
              submittedValues.StoreCommissionActivation =
                values.StoreCommissionActivation;
              submittedValues.StoreCommission = values.StoreCommission;
            }

            console.log(submittedValues, "submittedValues");
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="grid sm:grid-cols-2 grid-cols-1 gap-5">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Rent activation</CardTitle>
                </CardHeader>
                <CardContent className="justify-center flex">
                  <MySwitch
                    id="StoreRentActivation"
                    handleToggle={() => {
                      setFieldValue(
                        "StoreRentActivation",
                        !values.StoreRentActivation
                      );
                    }}
                    isOn={values.StoreRentActivation}
                  />
                </CardContent>
              </Card>

              {/* ============= */}
              <Card className="shadow-md ">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Rent Amount per cubic
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center md:gap-10 sm:gap-5 gap-3">
                  <Label htmlFor="StoreRentAmount">Amount</Label>
                  <Field
                    id="StoreRentAmount"
                    name="StoreRentAmount"
                    type="number"
                    value={values.StoreRentAmount}
                    as={Input}
                  />
                  <AyButton
                    title="save"
                    type="submit"
                    loading={isSubmitting}
                    sx={{
                      boxShadow:"2px 2px 5px 2px #00000024"
                    }}
                    disabled={!values.StoreRentActivation}
                  />
                </CardContent>
                <CardFooter>
                  <ErrorMessage
                    name="StoreRentAmount"
                    component={"span"}
                    className="text-xs text-red-500"
                  />
                </CardFooter>
              </Card>
              {/* shadow-[0px_0px_13px_2px_#00000024] */}
              {/* ========== commission sector starts here =========== 
              ------------------------------------------------------------*/}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Commission activation
                  </CardTitle>
                </CardHeader>
                <CardContent className="justify-center flex">
                  <MySwitch
                    id="StoreCommissionActivation"
                    handleToggle={() => {
                      setFieldValue(
                        "StoreCommissionActivation",
                        !values.StoreCommissionActivation
                      );
                    }}
                    isOn={values.StoreCommissionActivation}
                  />
                </CardContent>
              </Card>

              {/* ============= */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Commission</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center md:gap-10 sm:gap-5 gap-3">
                  <Label htmlFor="StoreCommission">Amount</Label>
                  <Field
                    id="StoreCommission"
                    name="StoreCommission"
                    value={values.StoreCommission}
                    as={Input}
                    type="number"
                    placeholder="%"
                  />
                  <AyButton
                    title="save"
                    sx={{
                      boxShadow:"2px 2px 5px 2px #00000024"
                    }}
                    type="submit"
                    loading={isSubmitting}
                    disabled={!values.StoreCommissionActivation}
                  />
                </CardContent>
                <CardFooter>
                  <ErrorMessage
                    name="StoreCommission"
                    component={"span"}
                    className="text-xs text-red-500"
                  />
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </PagesLayoutContent>
    </PagesLayout>
  );
}
