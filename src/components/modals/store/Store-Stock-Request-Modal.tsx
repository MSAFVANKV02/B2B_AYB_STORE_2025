import MyCloseIcon from "@/components/icons/My_CloseIcon";
import TaskModal, { TaskModalContent, TaskModalHeader } from "../TaskModal";
import StoreStockLocalTable from "@/components/tasks/local-tables/store_stock_local_table";
import { useModal } from "@/providers/context/context";
import { ErrorMessage, Form, Formik } from "formik";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import { makeToast } from "@/utils/toaster";
import { Label } from "@/components/ui/label";
import AyButton from "@/components/myUi/AyButton";

import * as Yup from "yup";

interface FormValues {
  boxWeight?: number;
  boxQuantity?: number;
  dimension?: {
    height?: number;
    width?: number;
    length?: number;
  };
  shippingPartnerName?: string;
  date?: string;
  lrNumber?: string;
  transportationCost?: string;
  lrPhoto: File | null;
}

type FileInputFields = {
  lrPhoto?: File | string;
};

const validationSchema = Yup.object().shape({
  boxWeight: Yup.number().required("Box weight is required"),
  boxQuantity: Yup.number().required("Box quantity is required"),
  dimension: Yup.object({
    height: Yup.number().required("Height is required"),
    width: Yup.number().required("Width is required"),
    length: Yup.number().required("Length is required"),
  }),
  shippingPartnerName: Yup.string().required(
    "Shipping partner name is required"
  ),
  date: Yup.date().required("Date is required"),
  lrNumber: Yup.string().required("LR number is required"),
  // transportationCost: Yup.number().required('Transportation cost is required'),
  lrPhoto: Yup.mixed().required("LR photo is required"),
});

export default function StoreStockRequestModal() {
  const { setIsOpen } = useModal();
  // const [fileNames, setFileNames] = useState<
  //   Record<keyof FileInputFields, string | null>
  // >({
  //   lrPhoto: null,
  // });

  // Define the shape of form values

  const fieldInputs: {
    id: string;
    name: keyof FormValues; // Make sure these match the form's keys
    label?: string;
    fileType?: string;
    placeholder: string;
  }[] = [
    {
      id: "boxWeight",
      label: "Box weight",
      name: "boxWeight",
      fileType: "number",
      placeholder: "Weight",
    },
    {
      id: "boxQuantity",
      label: "Box Quantity",
      name: "boxQuantity",
      fileType: "number",
      placeholder: "Quantity",
    },
    {
      id: "shippingPartnerName",
      label: "Shipping  partner name",
      name: "shippingPartnerName",
      fileType: "text",
      placeholder: "Shipping partner name",
    },
    {
      id: "date",
      label: "Date",
      name: "date",
      fileType: "date",
      placeholder: "Date",
    },
    {
      id: "lrNumber",
      label: "Lr Number",
      name: "lrNumber",
      fileType: "text",
      placeholder: "Number",
    },
  ];

  const fileFields: {
    id: keyof FileInputFields;
    label: string;
    fileType: string;
  }[] = [
    {
      id: "lrPhoto",
      fileType: "file",
      label: "Lr Photo",
    },
  ];

  //   const handleNewImageUpload = (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //     fieldName: keyof FormValues,
  //     values: FormValues,
  //     setFieldValue: (field: keyof FormValues, value: any) => void
  //   ) => {
  //     const files = event.target.files;
  //     if (files && files.length > 0) {
  //       const file = files[0]; // Get the first file selected by the user
  //       setFieldValue(fieldName, file); // Update Formik's field value with the selected file

  //       // Optionally: handle UI display of file name or file preview (if needed)
  //       setFileNames((prev) => ({
  //         ...prev,
  //         [fieldName]: file.name,
  //       }));

  //       makeToast("File selected successfully"); // Show a toast message indicating success
  //     } else {
  //       makeToastError("No file selected"); // Show an error toast if no file is selected
  //     }
  //   };

  return (
    <div>
      <TaskModal className="md:w-[50%] sm:w-[90%] w-full md:h-[90%] h-full">
        <TaskModalHeader>
          <span></span>
          <MyCloseIcon
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </TaskModalHeader>
        <TaskModalContent className="space-y-4">
          <div className="flex justify-between ">
            <div className="flex gap-3">
              <div className="w-16 h-16">
                <img
                  src="/img/products/image 75.png"
                  className="object-cover h-full w-full"
                  alt=""
                />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm capitalize">Product Name</span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Brand:</b>
                  <small>Odio</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Weight in gm:</b>
                  <small></small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Min. order</b>
                  <small></small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Size:</b>
                  <small></small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Color:</b>
                  <small></small>
                </span>
              </div>
            </div>
            <div>
              <span>Store Name:</span>
            </div>
          </div>
          {/* ======================= */}
          <StoreStockLocalTable />
          {/* ======================= */}

          <Formik
            validationSchema={validationSchema}
            initialValues={{
              boxWeight: "",
              boxQuantity: "",
              dimension: {
                height: undefined,
                width: undefined,
                length: undefined,
              },
              shippingPartnerName: "",
              date: "",
              lrNumber: "",
              lrPhoto: null,

              transportationCost:
                "After receive product transportation cost appear here.",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="space-y-4 max-w-2xl">
                  {fieldInputs.map((field) => (
                    <FormField
                      key={field.id}
                      title={field.label}
                      id={field.id}
                      name={field.name as string} // Explicitly cast to string for Formik
                      type={field.fileType || "text"}
                      placeholder={field.placeholder}
                      value={values[field.name] as string} // Type-safe access
                      fieldAs={Input}
                      fieldClassName="bg-gray-100"
                    />
                  ))}

                  <div className="flex gap-2 justify-between items-center">
                    <Label className="text-sm text-textGray">Dimensions</Label>
                    <div className="lg:w-3/4 w-full flex gap-1 lg:flex-row flex-col">
                      {(
                        ["height", "width", "length"] as Array<
                          keyof FormValues["dimension"]
                        >
                      ).map((dim) => (
                        <div key={dim} className="flex flex-col">
                          <Input
                            id={`dimension.${dim}`}
                            name={`dimension.${dim}`}
                            placeholder={dim}
                            onChange={(e) => {
                              const value = Math.max(0, Number(e.target.value)); 
                              setFieldValue(`dimension.${dim}`, value);
                            }}
                            type="number"
                             min="0"
                            className="bg-gray-100 p-6"
                          />
                          <ErrorMessage
                            name={`dimension.${dim}`}
                            component="span"
                            className="text-red-500 text-xs mt-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {fileFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between lg:flex-row flex-col mb-4"
                    >
                      <Label
                        htmlFor={field.id}
                        className="text-sm text-textGray"
                      >
                        {field.label}
                      </Label>
                      {/* {field.id} */}
                      <Input
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        id={field.id}
                        type="file"
                         onWheel={(e) => e.currentTarget.blur()}
                        className="lg:w-3/4 w-full bg-gray-200 text-xs border border-black cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            // Update the Formik field with the file
                            setFieldValue(field.id, file);

                            // Update the fileNames state (for UI purposes)
                            // setFileNames((prev) => ({
                            //   ...prev,
                            //   [field.id]: file.name,
                            // }));

                            makeToast("File selected successfully");
                          }
                        }}
                      />
                    </div>
                  ))}

                  {/* ==== */}

                  <div className=" rounded-md text-sm flex justify-between">
                    <span>Transportation Cost:</span>
                    <span className="lg:w-3/4 w-full text-textGray">
                      {values.transportationCost}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-4 my-4">
                  <AyButton type="button" title="Cancel" variant="cancel" />
                  <AyButton type="submit" title="Save" />
                </div>
              </Form>
            )}
          </Formik>
        </TaskModalContent>
      </TaskModal>
    </div>
  );
}
