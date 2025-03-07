import MyCloseIcon from "@/components/icons/My_CloseIcon";
import { useModal } from "@/providers/context/context";
import { ErrorMessage, Form, Formik } from "formik";

import AyButton from "@/components/myUi/AyButton";

import { IProducts, IVariants, IVariantsDetails } from "@/types/productType";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import StockVarianTable from "./stock_varient_table";
import { useAppSelector } from "@/redux/hook";

type IProps = {
  data: IProducts;
};

export default function RequestStockModal({ data }: IProps) {
  const { setIsOpen } = useModal();
  const { currentAdmin } = useAppSelector((state) => state.admin);
  // const [fileNames, setFileNames] = useState<
  //   Record<keyof FileInputFields, string | null>
  // >({
  //   lrPhoto: null,
  // });

  // Define the shape of form values
  console.log(currentAdmin, "admin");

  const allSizes = (data.variations ?? [])
    .flatMap((variant: any) =>
      (variant.details ?? []).map((detail: any) => detail.size)
    )
    .join(", ");

  const allColors = data.variations
    .map((variant: any) => variant.colorName)
    .join(", ");

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
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Product Name:</b>
                  <small className="overflow-hidden truncate">
                    {data.product_name}
                  </small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Brand:</b>
                  <small>{data.brand?.name}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Weight in gm:</b>
                  <small>{data.product_weight}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Min. order</b>
                  <small>{data.minimum_quantity}</small>
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
            <div className="bg-bgSoft p-2 rounded-md text-sm flex flex-col gap-1">
              <span>
                Product Own By : <span>{data.createdBy?.name}</span>
              </span>
              <span>
                Email : <span>{data.createdBy?.email}</span>
              </span>
            </div>
          </div>

          {/* {
            <pre>
              {JSON.stringify(data, null, 2)}
  
            </pre>
          } */}

          <Formik
            initialValues={{
              request_type: "new_stock",
              source_store: currentAdmin?._id || "", // Ensure a fallback value
              destination: data.createdBy?._id || "", // Ensure a fallback value
              product_details: [
                {
                  product: data._id, // Assuming 'data' represents the selected product
                  variant_details:
                    data.variations?.map((variant: IVariants) => ({
                      varient_name: variant.variant_name || "Unknown Variant",
                      image: variant.image || "", // Ensure image URL is provided
                      colorCode: variant.colorCode || "#000000", // Default black
                      color: variant.colorName || "Unknown Color",
                      sample: variant.sample || "false", // Ensure it's a string type
                      size_details:
                        variant.details?.map((detail: IVariantsDetails) => ({
                          size: detail.size || "N/A",
                          discount_type: data.discount_type || "flat",
                          bundle_quantity: detail.bundleQuantity || 1,
                          discount: detail.discount || 0,
                          selling_price: detail.selling_price || 0,
                          variant_sku: detail.skuId || "",
                          stock: detail.stock || 0,
                        })) || [],
                    })) || [],
                },
              ],
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <StockVarianTable
                  values={values}
                  setFieldValue={setFieldValue}
                  data={data}
                />

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
