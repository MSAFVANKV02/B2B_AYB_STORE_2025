import { Field, Form, Formik } from "formik";
import { Input } from "../ui/input";
import PdfFile from "../myUi/PdfFile";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TaskModalFooter } from "../modals/TaskModal";
import AyButton from "../myUi/AyButton";

type Props = {};

interface FormValues {
  name: string;
  logo: File | null;
  tm_number: string;
  tm_cert: File | null;
  brand_cert_owner_name: string;
  brand_noc: File | null;
}

export default function BrandAcceptionForm({}: Props) {
  const InitialValues: FormValues = {
    name: "",
    logo: null,
    tm_number: "",
    tm_cert: null,
    brand_cert_owner_name: "",
    brand_noc: null,
  };
  return (
    <div>
      <Formik
        initialValues={InitialValues}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm(); // Reset the form values after submission
        }}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="tm_number"
                className="text-xs font-bold text-textGray"
              >
                Brand Name
              </label>
              <Field
                as={Input}
                type="text"
                id="tm_number"
                name="name"
                value={values.name}
                placeholder="Brand Name"
                disabled
                className="p-6"
              />
            </div>

            {/* #2 Brand Logo starts here ====
            ================================= */}
            <div className="flex flex-col gap-2">
              <label htmlFor="logo" className="text-xs font-bold text-textGray">
                Brand Logo(120*80)
              </label>
              <img src="/img/cert/cert1.png" alt="" className="w-20 h-14" />
            </div>

            {/* #3 Trade mark Number starts here ====
            ================================= */}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="tm_number"
                className="text-xs font-bold text-textGray"
              >
                Trade mark Number
              </label>
              <Field
                as={Input}
                type="text"
                id="tm_number"
                name="tm_number"
                value={values.tm_number}
                placeholder="Trade mark Number"
                disabled
                className="p-6"
              />
            </div>

            {/* #4 Trade mark certificate starts here ====
            ================================= */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="tm_cert"
                className="text-xs font-bold text-textGray"
              >
                Trade mark certificate
              </label>
              <a
                href={"/Invoice_INV1482989614215502 (16).pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <PdfFile
                  fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                  className="h-16 w-16"
                />
                <div className="absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center ">
                  <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                </div>
              </a>
            </div>

            {/* #5 Brand certificate owner name starts here ====
            ================================= */}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="brand_cert_owner_name"
                className="text-xs font-bold text-textGray"
              >
                Brand certificate owner name
              </label>
              <Field
                as={Input}
                type="text"
                id="brand_cert_owner_name"
                name="brand_cert_owner_name"
                value={values.brand_cert_owner_name}
                placeholder="Brand certificate owner name"
                disabled
                className="p-6"
              />
            </div>

            {/* #6 Brand own by other people, pls upload Non objective later
             ======================= starts here ============================*/}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="brand_noc"
                className="text-xs font-bold text-textGray"
              >
                Brand own by other people, pls upload Non objective later
              </label>
              <a
                href={"/Invoice_INV1482989614215502 (16).pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <PdfFile
                  fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                  className="h-16 w-16"
                />
                <div className="absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center ">
                  <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                </div>
              </a>
            </div>

            <TaskModalFooter>
              <div className="flex gap-3">
                <AyButton 
                title="Reject"
                sx={{
                    bgcolor:"#E46E61",
                    height:"50px",
                    borderRadius:"10px",
                    "&:hover": {
                        bgcolor: "#dd5242", // Optional hover color
                      },
                }}
                />
                  <AyButton 
                title="Approve"
                sx={{
                    bgcolor:"#138808",
                    height:"50px",
                    borderRadius:"10px",
                    "&:hover": {
                        bgcolor: "#117a08", // Optional hover color
                      },
                }}
                />
              </div>
            </TaskModalFooter>
          </Form>
        )}
      </Formik>
    </div>
  );
}
