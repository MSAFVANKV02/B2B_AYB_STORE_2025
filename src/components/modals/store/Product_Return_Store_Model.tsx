import MyCloseIcon from "@/components/icons/My_CloseIcon";
import TaskModal, { TaskModalContent, TaskModalHeader } from "../TaskModal";
import StoreStockLocalTable from "@/components/tasks/local-tables/store_stock_local_table";
import { UseModal } from "@/providers/context/context";
import { ErrorMessage, Form, Formik } from "formik";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";

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

export default function ProductReturnModel() {
  const { setIsOpen } = UseModal();

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
          <StoreStockLocalTable  />
          {/* ======================= */}

          <Formik
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
            {({ values }) => (
              <Form>
                <div className="space-y-4 max-w-2xl">
                  {fieldInputs.map((field) => (
                    <FormField
                      disabled
                      readonly
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
                            readOnly
                            disabled
                            name={`dimension.${dim}`}
                            placeholder={dim}
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

                      <div className="lg:w-3/4">
                        <MyPdf value="/Invoice_INV1482989614215502 (16).pdf" isPdfShown />
                      </div>
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
                  <AyButton type="submit" title="Received" />
                </div>
              </Form>
            )}
          </Formik>
        </TaskModalContent>
      </TaskModal>
    </div>
  );
}
