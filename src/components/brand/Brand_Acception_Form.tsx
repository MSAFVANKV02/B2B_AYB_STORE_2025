import { Field, Form, Formik } from "formik";
import { Input } from "../ui/input";
import PdfFile from "../myUi/PdfFile";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useAppSelector } from "@/redux/hook";
import { IBrand } from "@/types/brandtypes";
import MyPdf from "../myUi/MyPdf";




export default function BrandAcceptionForm() {
  const {selectedBrand} = useAppSelector((state)=> state.brand)
  const InitialValues: Partial<IBrand> = {
    name: selectedBrand?.name ?? "",
    logo: selectedBrand?.logo ??"",
    trademarkNumber: selectedBrand?.trademarkNumber ??"",
    trademarkCertificate: selectedBrand?.trademarkCertificate ??"",
    certificateOwnerName: selectedBrand?.certificateOwnerName ??"",
    nonObjectiveDocument: selectedBrand?.nonObjectiveDocument ??"",
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
                htmlFor="trademarkNumber"
                className="text-xs font-bold text-textGray"
              >
                Brand Name
              </label>
              <Field
                as={Input}
                type="text"
                id="trademarkNumber"
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
              {
                  values.logo ? (
                    <img
                      src={values.logo}
                      alt={`${values.name} Logo`}
                      className="w-14 rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement; // Type casting
                        target.src = '/img/logo/Logo_black.svg';
                      }}
                    />
                  ):(
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon icon="material-symbols:error-outline" fontSize={20} />
                    </div>
                  )
                }
            </div>

            {/* #3 Trade mark Number starts here ====
            ================================= */}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="trademarkNumber"
                className="text-xs font-bold text-textGray"
              >
                Trade mark Number
              </label>
              <Field
                as={Input}
                type="text"
                id="trademarkNumber"
                name="trademarkNumber"
                value={values.trademarkNumber}
                placeholder="Trade mark Number"
                disabled
                className="p-6"
              />
            </div>

            {/* #4 Trade mark certificate starts here ====
            ================================= */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="trademarkCertificate"
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
                  fileURL={values.trademarkCertificate ??""}
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
                htmlFor="certificateOwnerName"
                className="text-xs font-bold text-textGray"
              >
                Brand certificate owner name
              </label>
              <Field
                as={Input}
                type="text"
                id="certificateOwnerName"
                name="certificateOwnerName"
                value={values.certificateOwnerName}
                placeholder="Brand certificate owner name"
                disabled
                className="p-6"
              />
            </div>

            {/* #6 Brand own by other people, pls upload Non objective later
             ======================= starts here ============================*/}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="nonObjectiveDocument"
                className="text-xs font-bold text-textGray"
              >
                Brand own by other people, pls upload Non objective later
              </label>
              <MyPdf value={values.nonObjectiveDocument ??""} isPdfShown/>
            </div>

            {/* <TaskModalFooter>
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
            </TaskModalFooter> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}
