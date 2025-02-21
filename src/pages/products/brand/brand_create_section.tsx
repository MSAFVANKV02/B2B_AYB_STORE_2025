import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import OpenMediaDrawer from "@/components/myUi/OpenMediaDrawer";
import { create_Brand_Api } from "@/services/brand/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { getAllBrands } from "@/redux/actions/brandsSlice";
import { dispatch } from "@/redux/hook";
import Loader from "@/components/global/loader";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const formatFileSize = (size: number) => {
//   if (size < 1024) return `${size} Bytes`;
//   if (size < 1024 * 1024) return `${Math.round((size / 1024) * 100) / 100} KB`;
//   return `${Math.round((size / (1024 * 1024)) * 100) / 100} MB`;
// };

interface FormValues {
  name: string;
  logo: string;
  trademarkNumber: string;
  trademarkCertificate: string;
  certificateOwnerName: string;
  nonObjectiveDocument: string;
  tm_cert_field: {
    fileName: string;
    file: File;
  } | null;
  brand_noc_field: {
    fileName: string;
    file: File;
  } | null;
}

const initialValues: FormValues = {
  name: "",
  logo: "",
  trademarkNumber: "",
  trademarkCertificate: "",
  certificateOwnerName: "",
  nonObjectiveDocument: "",
  tm_cert_field: null,
  brand_noc_field: null,
};

const brandSchema = Yup.object().shape({
  name: Yup.string().required("Brand name is required"),
  logo: Yup.mixed().required("Brand logo is required"),
  trademarkNumber: Yup.string().required("TM Number is required"),
  trademarkCertificate: Yup.mixed().required("TM Certificate is required"),
  certificateOwnerName: Yup.string().required(
    "Brand Certificate Owner Name is required"
  ),
  nonObjectiveDocument: Yup.mixed().required("Brand NOC is required"),
});

export default function BrandCreateSection() {
  // const [brandLogo, setBrandLogo] = useState<File | null>(null);
  // const [trademarkCertificate, setTmCert] = useState<string | null>(null);
  // const [nonObjectiveDocument, setBrandNoc] = useState<string | null>(null);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={brandSchema}
        onSubmit={async (values, { resetForm }) => {
          // Handle form submission
          try {
            const { data, status } = await create_Brand_Api({
              certificateOwnerName: values.certificateOwnerName,
              logo: values.logo,
              name: values.name,
              nonObjectiveDocument: values.nonObjectiveDocument,
              trademarkCertificate: values.trademarkCertificate,
              trademarkNumber: values.trademarkNumber,
            });
            if (status === 201 || status === 200) {
              makeToast(`${data.message}`);
              resetForm();
              dispatch(getAllBrands());
            }
          } catch (error) {
            console.error(error);
          }
          console.log(values);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col space-y-3">
            {/* <div className="break-words w-full flex flex-col">
           {
              JSON.stringify(values)
            }
           </div> */}
            <div className="flex flex-col gap-1 text-xs">
              <Label
                htmlFor="name"
                className="text-xs font-bold text-textGray "
              >
                Brand Name
              </Label>
              <Field
                type="text"
                id="name"
                name="name"
                as={Input}
                placeholder="Brand Name"
                className="px-5 py-6 active:right-0 active:outline-none text-xs focus:outline-none outline-none"
              />
              <ErrorMessage
                component="span"
                name="name"
                className="text-red-500 text-xs"
              />
            </div>
            {/* =====  brand logo starts ======
                    ====================================== */}
            <OpenMediaDrawer
              // onClick={()=>{
              //   setDrawerFieldName("logo");
              // }}
              onDelete={() => {
                setFieldValue("logo", null);
              }}
              values={values}
              title="Brand Logo(120*80)"
              className="gap-1 overflow-hidden"
              name={"logo"}
              mediaType="image"
              handleFileChange={(event, fieldName) => {
                const files = event;
                if (!files) return;
                const srcArray = files.map((file) => file.imageurl);
                const isInvalidSize = files.some(
                  (file) => file.width > 120 || file.height > 80
                );

                if (import.meta.env.MODE !== "development" && isInvalidSize) {
                  makeToastError(
                    "File size exceeds the allowed dimensions (120x80)"
                  );
                  return;
                }

                setFieldValue(fieldName, srcArray[0]);
              }}
            />
            {/* <div className="mt-3">
              {values.logo &&(<img src={values.logo as string}  />)}
            </div> */}
            {/*#3 ====  Trade Mark number ====== 
                ===================================*/}
            <div className="flex flex-col gap-1 text-xs">
              <Label
                htmlFor="trademarkNumber"
                className="text-xs font-bold text-textGray "
              >
                Trade mark Number
              </Label>
              <Field
                type="text"
                id="trademarkNumber"
                name="trademarkNumber"
                as={Input}
                placeholder="Trade mark Number"
                className="px-5 py-6 active:right-0 active:outline-none text-xs focus:outline-none outline-none"
              />
              <ErrorMessage
                component="span"
                name="trademarkNumber"
                className="text-red-500 text-xs"
              />
            </div>
            {/*#4 ====  Trade mark certificate ====== 
                ===================================*/}
            <OpenMediaDrawer
              title="  Trade mark certificate"
              className="gap-1 overflow-hidden"
              name={"trademarkCertificate"}
              mediaType="pdf"
              handleFileChange={(event, fieldName) => {
                const files = event;
                if (!files) return;
                const srcArray = files.map((file) => file.imageurl);
                // console.log(srcArray,'srcArray');

                setFieldValue(fieldName, srcArray[0]);
              }}
            />
            <div className="mt-3">
              {/* <span className="break-words">{values.trademarkCertificate}</span> */}

              {values.trademarkCertificate && (
                <MyPdf
                  value={values.trademarkCertificate ?? ""}
                  isPdfShown={true}
                />
              )}
            </div>
            {/*#5 ==== Brand certificate owner name ====== 
                ===================================*/}
            <div className="flex flex-col gap-1 text-xs">
              <Label
                htmlFor="certificateOwnerName"
                className="text-xs font-bold text-textGray "
              >
                Brand certificate owner name
              </Label>
              <Field
                type="text"
                id="certificateOwnerName"
                name="certificateOwnerName"
                as={Input}
                placeholder="Trade mark Number"
                className="px-5 py-6 active:right-0 active:outline-none text-xs focus:outline-none outline-none"
              />
              <ErrorMessage
                component="span"
                name="certificateOwnerName"
                className="text-red-500 text-xs"
              />
            </div>
            {/*#6 ====  Brand own by other people, pls upload Non objective later ====== 
                ===================================*/}
            <OpenMediaDrawer
              title="Brand own by other people, pls upload Non objective later"
              className="gap-1 overflow-hidden"
              name={"nonObjectiveDocument"}
              mediaType="pdf"
              handleFileChange={(event, fieldName) => {
                const files = event;
                if (!files) return;
                const srcArray = files.map((file) => file.imageurl);
                setFieldValue(fieldName, srcArray[0]);
              }}
            />
            <div className="mt-3">
              {values.nonObjectiveDocument && (
                <MyPdf
                  value={values.nonObjectiveDocument as string}
                  isPdfShown
                />
              )}
            </div>
            {/* submit button */}
            <div className="flex justify-end  h-full">
              <AyButton
                title=""
                type="submit"
                sx={{
                  mt: "auto",
                  height: "50px",
                }}
              >
                <Loader state={isSubmitting}>Save</Loader>
              </AyButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
