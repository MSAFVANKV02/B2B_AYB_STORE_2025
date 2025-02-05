import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import OpenMediaDrawer from "@/components/myUi/OpenMediaDrawer";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const formatFileSize = (size: number) => {
//   if (size < 1024) return `${size} Bytes`;
//   if (size < 1024 * 1024) return `${Math.round((size / 1024) * 100) / 100} KB`;
//   return `${Math.round((size / (1024 * 1024)) * 100) / 100} MB`;
// };

interface FormValues {
  name: string;
  logo: string;
  tm_number: string;
  tm_cert: string;
  brand_cert_owner_name: string;
  brand_noc: string;
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
  tm_number: "",
  tm_cert: "",
  brand_cert_owner_name: "",
  brand_noc: "",
  tm_cert_field: null,
  brand_noc_field: null,
};

const brandSchema = Yup.object().shape({
  name: Yup.string().required("Brand name is required"),
  logo: Yup.mixed().required("Brand logo is required"),
  tm_number: Yup.string().required("TM Number is required"),
  tm_cert: Yup.mixed().required("TM Certificate is required"),
  brand_cert_owner_name: Yup.string().required(
    "Brand Certificate Owner Name is required"
  ),
  brand_noc: Yup.mixed().required("Brand NOC is required"),
});

export default function BrandCreateSection() {
  // const [brandLogo, setBrandLogo] = useState<File | null>(null);
  // const [tm_cert, setTmCert] = useState<string | null>(null);
  // const [brand_noc, setBrandNoc] = useState<string | null>(null);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={brandSchema}
        onSubmit={(values, { resetForm }) => {
          // Handle form submission
          console.log(values);
          resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
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
              title="Brand Logo(120*80)"
              className="gap-1 overflow-hidden"
              name={"logo"}
              mediaType="pdf"
              handleFileChange={(event, fieldName) => {
                const files = event;
                if (!files) return;
                const srcArray = files.map((file) => file.imageurl);
                setFieldValue(fieldName, srcArray[0]);
              }}
            />
            <div className="mt-3">
              {values.logo &&(<MyPdf value={values.logo as string} isPdfShown />)}
            </div>

            {/*#3 ====  Trade Mark number ====== 
                ===================================*/}
            <div className="flex flex-col gap-1 text-xs">
              <Label
                htmlFor="tm_number"
                className="text-xs font-bold text-textGray "
              >
                Trade mark Number
              </Label>
              <Field
                type="text"
                id="tm_number"
                name="tm_number"
                as={Input}
                placeholder="Trade mark Number"
                className="px-5 py-6 active:right-0 active:outline-none text-xs focus:outline-none outline-none"
              />
              <ErrorMessage
                component="span"
                name="tm_number"
                className="text-red-500 text-xs"
              />
            </div>

            {/*#4 ====  Trade mark certificate ====== 
                ===================================*/}
            <OpenMediaDrawer
              title="  Trade mark certificate"
              className="gap-1 overflow-hidden"
              name={"tm_cert"}
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
              {/* <span className="break-words">{values.tm_cert}</span> */}

              {values.tm_cert &&(<MyPdf value={values.tm_cert ?? ""} isPdfShown={true} />)}
            </div>

            {/*#5 ==== Brand certificate owner name ====== 
                ===================================*/}
            <div className="flex flex-col gap-1 text-xs">
              <Label
                htmlFor="brand_cert_owner_name"
                className="text-xs font-bold text-textGray "
              >
                Brand certificate owner name
              </Label>
              <Field
                type="text"
                id="brand_cert_owner_name"
                name="brand_cert_owner_name"
                as={Input}
                placeholder="Trade mark Number"
                className="px-5 py-6 active:right-0 active:outline-none text-xs focus:outline-none outline-none"
              />
              <ErrorMessage
                component="span"
                name="brand_cert_owner_name"
                className="text-red-500 text-xs"
              />
            </div>

            {/*#6 ====  Brand own by other people, pls upload Non objective later ====== 
                ===================================*/}
            <OpenMediaDrawer
              title="  Trade mark certificate"
              className="gap-1 overflow-hidden"
              name={"brand_noc"}
              mediaType="pdf"
              handleFileChange={(event, fieldName) => {
                const files = event;
                if (!files) return;
                const srcArray = files.map((file) => file.imageurl);
                setFieldValue(fieldName, srcArray[0]);
              }}
            />
            <div className="mt-3">
              {values.brand_noc &&(<MyPdf value={values.brand_noc as string} isPdfShown />)}
            </div>
             {/* <div className="flex flex-col gap-1 text-xs">
              <Label
                htmlFor="brand_noc"
                className="text-xs font-bold text-textGray "
              >
                Trade mark certificate
              </Label>
              <FileInput
                id="brand_noc"
                // accept=".pdf, application/pdf, .xls, application/vnd.ms-excel, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                accept=".pdf, application/pdf"
                name="brand_noc"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    // Create the file URL for displaying
                    const fileURL = URL.createObjectURL(file);
                    setFieldValue("brand_noc", event.target.files?.[0]);
                    setFieldValue("brand_noc_field", {
                      fileName: file.name,
                      file,
                    });
                    setBrandNoc(fileURL);
                  }
                }}
                className=""
                type="file"
                selectedData={values.brand_noc_field?.fileName || ""}
              />
              {brand_noc && (
                <div className="flex items-center gap-2">
                  {values.brand_noc_field?.fileName.endsWith(".pdf") ? (
                    <a
                      href={brand_noc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative"
                    >
                      <PdfFile fileURL={brand_noc} className="h-16 w-16" />
                      <div className="absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center ">
                        <Icon
                          icon="solar:eye-bold"
                          fontSize={25}
                          color="#fff"
                        />
                      </div>
                    </a>
                  ) : (
                    <div className="">
                      {values.brand_noc_field?.file && (
                        <div>
                          <p className="text-sm">
                            {values.brand_noc_field.fileName}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {values.brand_noc_field?.file && (
                    <div>
                      ({formatFileSize(values.brand_noc_field.file.size)})
                    </div>
                  )}
                </div>
              )}
              <ErrorMessage
                component="span"
                name="brand_noc"
                className="text-red-500 text-xs"
              />
            </div> */}

            {/* submit button */}
            <div className="flex justify-end  h-full">
              <AyButton
                title="Save"
                type="submit"
                sx={{
                  mt: "auto",
                  height: "50px",
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
