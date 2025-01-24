import  { useState } from 'react'
import { pdfjs } from 'react-pdf';
import * as Yup from "yup";
import FileInput from "@/components/myUi/FileInput";
import PdfFile from "@/components/myUi/PdfFile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AyButton from '@/components/myUi/AyButton';



pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} Bytes`;
    if (size < 1024 * 1024) return `${Math.round((size / 1024) * 100) / 100} KB`;
    return `${Math.round((size / (1024 * 1024)) * 100) / 100} MB`;
  };
  
  interface FormValues {
    name: string;
    logo: File | null;
    tm_number: string;
    tm_cert: File | null;
    brand_cert_owner_name: string;
    brand_noc: File | null;
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
    logo: null,
    tm_number: "",
    tm_cert: null,
    brand_cert_owner_name: "",
    brand_noc: null,
    tm_cert_field: null,
    brand_noc_field: null,
  };
  
  const brandSchema = Yup.object().shape({
      name: Yup.string().required("Brand name is required"),
      logo: Yup.mixed().required("Brand logo is required"),
      tm_number: Yup.string().required("TM Number is required"),
      tm_cert: Yup.mixed().required("TM Certificate is required"),
      brand_cert_owner_name: Yup.string().required("Brand Certificate Owner Name is required"),
      brand_noc: Yup.mixed().required("Brand NOC is required"),
    });

export default function BrandCreateSection() {

    const [brandLogo, setBrandLogo] = useState<File | null>(null);
    const [tm_cert, setTmCert] = useState<string | null>(null);
    const [brand_noc, setBrandNoc] = useState<string | null>(null);
    return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={brandSchema}
            onSubmit={(values, { resetForm }) => {
              // Handle form submission
              console.log(values);
              resetForm();
              setBrandLogo(null);
              setTmCert(null);
              setBrandNoc(null);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col lg:gap-7 gap-4">
                <div className="flex flex-col gap-1 text-xs">
                  <Label
                    htmlFor="name"
                    className="text-xs font-bold text-textGray select-none"
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
                <div className="flex flex-col gap-1 text-xs">
                  <Label
                    htmlFor="logo"
                    className="text-xs font-bold text-textGray select-none"
                  >
                   Brand Logo(120*80)
                  </Label>
                  <FileInput
                    id="logo"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    name="logo"
                    onChange={(e) => {
                      // handleImageChange(e);
                      if (e.target.files && e.target.files.length > 0) {
                        setFieldValue("logo", e.target.files[0]);
                        setBrandLogo(e.target.files[0]);
                      }
                    }}
                    className=""
                    type="file"
                    selectedData={brandLogo?.name}
                  />
                  {brandLogo && (
                    <div className="flex items-center gap-2">
                      <img
                        src={URL.createObjectURL(brandLogo)}
                        alt="brand logo"
                        className="w-10 h-10"
                      />
                      <p>{formatFileSize(brandLogo.size)}</p>
                    </div>
                  )}
                  <ErrorMessage
                    component="span"
                    name="logo"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/*#3 ====  Trade Mark number ====== 
                ===================================*/}
                <div className="flex flex-col gap-1 text-xs">
                  <Label
                    htmlFor="tm_number"
                    className="text-xs font-bold text-textGray select-none"
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
                <div className="flex flex-col gap-1 text-xs">
                  <Label
                    htmlFor="tm_cert"
                    className="text-xs font-bold text-textGray select-none"
                  >
                    Trade mark certificate
                  </Label>
                  <FileInput
                    id="tm_cert"
                    // accept=".pdf, application/pdf, .xls, application/vnd.ms-excel, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    accept=".pdf, application/pdf"
                    name="tm_cert"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        // Create the file URL for displaying
                        const fileURL = URL.createObjectURL(file);
                        setFieldValue("tm_cert", event.target.files?.[0]);
                        setFieldValue("tm_cert_field", {
                          fileName: file.name,
                          file,
                        });
                        setTmCert(fileURL);
                      }
                    }}
                    className=""
                    type="file"
                    selectedData={values.tm_cert_field?.fileName || ""}
                  />
                  {tm_cert && (
                    <div className="flex items-center gap-2">
                      {values.tm_cert_field?.fileName.endsWith(".pdf") ? (
                        <a
                          href={tm_cert}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative"
                        >
                          <PdfFile fileURL={tm_cert} className="h-16 w-16" />
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
                          {values.tm_cert_field?.file && (
                            <div>
                              <p className="text-sm">
                                {values.tm_cert_field.fileName}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      {values.tm_cert_field?.file && (
                        <div>
                          ({formatFileSize(values.tm_cert_field.file.size)})
                        </div>
                      )}
                    </div>
                  )}
                  <ErrorMessage
                    component="span"
                    name="tm_cert"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/*#5 ==== Brand certificate owner name ====== 
                ===================================*/}
                <div className="flex flex-col gap-1 text-xs">
                  <Label
                    htmlFor="brand_cert_owner_name"
                    className="text-xs font-bold text-textGray select-none"
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
                <div className="flex flex-col gap-1 text-xs">
                  <Label
                    htmlFor="brand_noc"
                    className="text-xs font-bold text-textGray select-none"
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
                </div>

                {/* submit button */}
                <div className="flex justify-end  h-full">
                     <AyButton title="Save" type="submit" sx={{
                        mt: "auto",
                        height:"50px"
                     }} />
                </div>
               
              </Form>
            )}
          </Formik>
    </div>
  )
}