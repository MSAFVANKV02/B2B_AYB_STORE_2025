import MyCloseIcon from "@/components/icons/My_CloseIcon";
import { UseModal } from "@/providers/context/context";
import { Form, Formik } from "formik";

import AyButton from "@/components/myUi/AyButton";

import { IProducts } from "@/types/productType";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import StockVarianTable from "./stock_varient_table";
import { useAppSelector } from "@/redux/hook";
import Loader from "@/components/global/loader";
import { makeToast, makeToastError, makeToastWarning } from "@/utils/toaster";
import { send_Request_Product_Stock_Api } from "@/services/stock/route";

// type IProps = {
//   data: IProducts;
// };

export default function RequestStockModal() {
  const { setIsOpen, dynamicCloseModal, dynamicSelectedTask } =
    UseModal<IProducts>();
  const { currentAdmin } = useAppSelector((state) => state.admin);
  // const [fileNames, setFileNames] = useState<
  //   Record<keyof FileInputFields, string | null>
  // >({
  //   lrPhoto: null,
  // });

  // Define the shape of form values
  // console.log(dynamicCloseModal, "admin");

  

  const allSizes = Array.from(
    new Set(
      (dynamicSelectedTask?.variations ?? []).flatMap((variant: any) =>
        (variant.details ?? []).map((detail: any) => detail.size)
      )
    )
  ).join(", ");
  

  //     const allSizes = isProduct(dynamicSelectedTask)
  // ? Array.from(
  //     new Set(
  //       dynamicSelectedTask.variations.flatMap((variant: any) =>
  //         (variant.details ?? []).map((detail: any) => detail.size)
  //       )
  //     )
  //   ).join(", ")
  // : "";

  const allColors = (dynamicSelectedTask?.variations ?? [])
    .map((variant: any) => variant.colorName)
    .join(", ");

  // console.log(dynamicSelectedTask, "dynamicSelectedTask");
  if (!dynamicSelectedTask) {
    return null; // or show a loading state
  }



// console.log(isProduct(dynamicSelectedTask), "isProduct(dynamicSelectedTask)");
// if (!isProduct(dynamicSelectedTask) && !isStock(dynamicSelectedTask)) {
//   return null; // or show a loading state
// }

  return (
    <div>
      <TaskModal className="2xl:w-[60%] dark:border dark:border-white sm:w-[90%] w-full md:h-[90vh]  h-full ">
        <TaskModalHeader className=" p-1">
          <span></span>
          <MyCloseIcon
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </TaskModalHeader>
        <TaskModalContent className="space-y-4  md:h-[90vh] overflow-scroll  sm:p-4">
          <div className="flex justify-between ">
            <div className="flex gap-3">
              <div className="w-16 h-16">
                <img
                  src={dynamicSelectedTask.thumbnails[0]}
                  className="object-cover h-full w-full"
                  alt=""
                />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm capitalize flex items- gap-1 max-w-[400px]">
                  <b>Name:</b>
                  <small className="overflow-hidden truncate">
                    {dynamicSelectedTask.product_name}
                  </small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Brand:</b>
                  <small>{dynamicSelectedTask.brand?.name}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Weight in gm:</b>
                  <small>{dynamicSelectedTask.product_weight}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Min. order</b>
                  <small>{dynamicSelectedTask.minimum_quantity}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Size:</b>
                  <small>{allSizes}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Color:</b>
                  <small>{allColors}</small>
                </span>
              </div>
            </div>

            {/* right side */}
            <div className="bg-bgSoft p-4 rounded-sm text-xs shadow-sm h-fit flex flex-col gap-1">
              <span>
                Product Own By :{" "}
                <span>{dynamicSelectedTask.createdBy?.name}</span>
              </span>
              <span>
                Email : <span>{dynamicSelectedTask.createdBy?.email}</span>
              </span>
              <span>
                Phone : <span>{dynamicSelectedTask.createdBy?.mobile}</span>
              </span>
            </div>
          </div>

          {/* {
            <pre>
              {JSON.stringify(data, null, 2)}
  
            </pre>
          } */}

          <Formik
            // initialValues={{
            //   request_type: "new_stock",
            //   source_store: currentAdmin?._id || "", // Ensure a fallback value
            //   destination: dynamicSelectedTask.createdBy?._id || "", // Ensure a fallback value
            //   product_details: [
            //     {
            //       product: dynamicSelectedTask._id, // Assuming 'dynamicSelectedTask' represents the selected product
            //       variant_details:
            //       dynamicSelectedTask && dynamicSelectedTask.variations?.map((variant: IVariants) => ({
            //           varient_name: variant.variant_name || "Unknown Variant",
            //           image: variant.image || "", // Ensure image URL is provided
            //           colorCode: variant.colorCode || "#000000", // Default black
            //           color: variant.colorName || "Unknown Color",
            //           sample: variant.sample || "false", // Ensure it's a string type
            //           size_details:
            //             variant.details?.map((detail: IVariantsDetails) => ({
            //               size: detail.size || "N/A",
            //               discount_type: dynamicSelectedTask.discount_type || "flat",
            //               bundle_quantity: detail.bundleQuantity || 1,
            //               discount: detail.discount || 0,
            //               selling_price: detail.selling_price || 0,
            //               variant_sku: detail.skuId || "",
            //               stock:  0,
            //             })) || [],
            //         })) || [],
            //     },
            //   ],
            // }}
            initialValues={{
              // request_type: "new_stock", // TypeScript now understands this as valid
              source_store: currentAdmin?._id || "",
              destination: dynamicSelectedTask.createdBy?._id || "",
              product_details: [],
            }}
            onSubmit={async (values) => {
              console.log("Final Submitted Values:", values);
              if (values.product_details.length === 0) {
                makeToastWarning("Please select at least one product variant.");
                return;
              }
              try {
                const response = await send_Request_Product_Stock_Api({
                  destination: values.destination,
                  product_details: values.product_details,
                  request_type: "new_stock",
                  source_store: values.source_store,
                });
                // console.log(response, "response");
                if (response.status === 201) {
                  dynamicCloseModal();
                  makeToast(response.data.message);
                }
              } catch (error: any) {
                // console.error("Error sending request:", error);
                if (error) {
                  makeToastError(error.response.data.message);
                }
              }
            }}
          >
            {({ values, setFieldValue, resetForm, isSubmitting }) => (
              <Form>
                <StockVarianTable
                  values={values}
                  setFieldValue={setFieldValue}
                  data={dynamicSelectedTask}
                />
                <div className="my-7">
                 <p>
                 Note:
                 </p>
                  <ol className="list-decimal list-inside text-sm space-y-3">
                    <li>Must Add purchase qty for requesting product.</li>
                    <li>remove purchase qty for make "0" for remove the item from list.</li>

                  </ol>
                </div>

                <div className="flex justify-end gap-4 my-4 mt-auto">
                  <AyButton
                    type="button"
                    title="Cancel"
                    variant="cancel"
                    sx={{
                      bgcolor: "#cccc",
                      color: "black",
                      "&:hover": {
                        bgcolor: "#cccc", // Subtle hover background
                      },
                    }}
                    onClick={() => {
                      resetForm({
                        values: {
                          source_store: currentAdmin?._id || "",
                          destination: dynamicSelectedTask.createdBy?._id || "",
                          product_details: [],
                        },
                      });
                      setFieldValue("product_details", []);
                    }}
                  />

                  <AyButton type="submit">
                    <Loader state={isSubmitting}>Request</Loader>
                  </AyButton>
                </div>
              </Form>
            )}
          </Formik>
        </TaskModalContent>
      </TaskModal>
    </div>
  );
}
