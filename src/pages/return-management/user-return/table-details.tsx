import { takeActionReturnOrdersAction } from "@/actions/orders/ordersAction";
import Image from "@/components/global/image";
import Loader from "@/components/global/loader";
import Modal from "@/components/modals/main";
import AyButton from "@/components/myUi/AyButton";
import MyBackBtn from "@/components/myUi/myBackBtn";
import MyClock from "@/components/myUi/MyClock";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMutationData } from "@/hooks/useMutationData";
import { UseUpdateModal } from "@/providers/context/modal-context";
import { IReturnDetail, IReturnOrders } from "@/types/return_order_types";
import { makeToastError } from "@/utils/toaster";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConsumer,
  FormikHelpers,
} from "formik";
import { useMemo } from "react";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      return_id: Yup.string().required(),
      product_order_id: Yup.string().required(),
      size: Yup.string().required(),

      status: Yup.string()
        .oneOf(
          ["rejected", "refund_approved_by_store", "return_approved_by_store"],
          "Invalid status"
        )
        .required("Status is required"),

      return_mode: Yup.string()
        .oneOf(["refund", "replace"], "Invalid return mode")
        .required("Return mode is required"),

      remarks: Yup.string().when("status", {
        is: "rejected",
        then: (schema) =>
          schema.trim().min(1, "Remarks are required for rejected items"),
        otherwise: (schema) => schema,
      }),
    })
  ),
  // .min(1, "Please select at least one item"),
});

export type ReturnActionFormData = {
  return_id: string;
  product_order_id: string;
  size: string;
  status:
    | ""
    | "rejected"
    | "refund_approved_by_store"
    | "return_approved_by_store";
  return_mode: "refund" | "replace";
  remarks: string;
};

const UserReturnTableDetails = () => {
  const { dispatchModal, modalState } = UseUpdateModal();
  // const [searchParams] = useSearchParams();
  // const pageQ = searchParams.get("page") ?? "1";
  // const status =
  //   (searchParams.get("status") as
  //     | "requested"
  //     | "refund_approved_by_store"
  //     | "return_approved_by_store"
  //     | "refund_approved_by_admin"
  //     | "refund_rejected_by_admin"
  //     | "rejected"
  //     | "customer_return_initiated"
  //     | "received"
  //     | "refunded"
  //     | "replaced"
  //     | "approved"
  //     | "all") ?? "";

  const queryKey = ["return-orders"];

  const { mutate, isPending } = useMutationData(
    ["return-order-update"],
    (data) => takeActionReturnOrdersAction(data),
    queryKey
  );

  const orders = useMemo(() => {
    return modalState.selectedModalData;
  }, [modalState.selectedModalData]) as IReturnOrders;

  const isItemSelected = (
    items: ReturnActionFormData[],
    checkItem: ReturnActionFormData
  ) => {
    return items.some(
      (i) =>
        i.return_id === checkItem.return_id &&
        i.product_order_id === checkItem.product_order_id &&
        i.size === checkItem.size
    );
  };

  return (
    <div className="space-y-6 ">
      <MyBackBtn
        clickEvent={() => {
          dispatchModal({ type: "CLOSE_MODAL" });
        }}
      />
      <Formik<{ items: ReturnActionFormData[] }>
        initialValues={{ items: [] }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);

          if (values.items.length === 0) {
            makeToastError("Please Select a item");
            return;
          }

          const rejectedWithoutRemarks = values.items.filter(
            (item) => item.status === "rejected" && !item.remarks.trim()
          );

          if (rejectedWithoutRemarks.length > 0) {
            makeToastError("Please add a rejected reason");
            return;
          }

          mutate(values.items, {
            onSuccess(data) {
              // variables, context
              if (data.status === 200) {
                dispatchModal({ type: "CLOSE_MODAL" });
                resetForm();
              }
              // console.log(data, "onSuccess");
              // console.log(variables, "variables");
              // console.log(context, "context");
            },
          });
        }}
      >
        {({ setFieldValue, values }) => {
          // console.log(values);

          // const allItems = orders.items.flatMap((order) =>
          //   order.product.variations[0].details.map((detail) => ({
          //     return_id: orders.return_id,
          //     product_order_id: order.product_order_id,
          //     size: detail.size,
          //   }))
          // );

          // const allSelected = allItems.every((item) =>
          //   values.items.some(
          //     (selected) =>
          //       selected.return_id === item.return_id &&
          //       selected.product_order_id === item.product_order_id &&
          //       selected.size === item.size
          //   )
          // );

          return (
            <Form className="space-y-6">
              {/* Top Info */}
              <div className="flex justify-between lg:w-1/2 md:w-3/4 w-full">
                <div className="flex flex-col gap-1">
                  <p className="text-xs">
                    <span className="font-semibold">Return ID: </span>
                    {orders.return_id}
                  </p>
                  <p className="text-xs">
                    <span className="font-semibold">User Name: </span>
                    {orders.customer_id.name}
                  </p>
                </div>
                <div>
                  <span>Date: </span>
                  <MyClock
                    date={orders.createdAt}
                    showSeconds={false}
                    showTime={false}
                  />
                </div>
              </div>

              {/* Table */}
              <div className=" shadow-md w-full overflow-x-auto">
                <table className="min-w-[1200px] w-full table-auto border-collapse">
                  <thead className="bg-[#F8F8F8]">
                    <tr className="text-left border-b-2 font-semibold">
                      <th className="text-xs font-medium sm:px-4 px-2 py-3">
                        {" "}
                        <input
                          type="checkbox"
                          // checked={allSelected}
                          checked={values.items.length > 0}
                          disabled={
                            !orders.items.some((order) =>
                              order.product.variations[0].details.some(
                                (detail) => detail.return_status === "requested"
                              )
                            )
                          }
                          // onChange={() => {
                          //   if (allSelected) {
                          //     setFieldValue("items", []);
                          //   } else {
                          //     const newItems = orders.items.flatMap((order) =>
                          //       order.product.variations[0].details.map(
                          //         (detail) => ({
                          //           return_id: orders.return_id,
                          //           product_order_id: order.product_order_id,
                          //           size: detail.size,
                          //           status: "approved",
                          //           return_mode: "replace",
                          //           remarks: "",
                          //         })
                          //       )
                          //     );
                          //     setFieldValue("items", newItems);
                          //   }
                          // }}
                          onChange={() => {
                            if (values.items.length > 0) {
                              setFieldValue("items", []);
                            } else {
                              const newItems = orders.items.flatMap((order) =>
                                order.product.variations[0].details
                                  .filter(
                                    (detail) =>
                                      detail.return_status === "requested"
                                  )
                                  .map((detail) => ({
                                    return_id: orders.return_id,
                                    product_order_id: order.product_order_id,
                                    size: detail.size,
                                    status: "approved",
                                    return_mode: "replace",
                                    remarks: "",
                                  }))
                              );
                              setFieldValue("items", newItems);
                            }
                          }}
                        />
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Name
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Size/Color
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Order Qty
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Return Qty
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Reason
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Uploaded File
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Refund / Replace
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Admin Comment
                      </th>
                      <th className="text-xs sm:px-4 px-2 py-3  font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalState.type === "return-product-details" &&
                      orders.items.map((order, index) => {
                        const variation = order.product.variations[0];
                        return variation.details.map((detail, dIndex) => {
                          const dataObj: ReturnActionFormData = {
                            return_id: orders.return_id,
                            product_order_id: order.product_order_id,
                            size: detail.size,
                            status: "",
                            return_mode: "replace",
                            remarks: "",
                          };

                          const existingItem = values.items.find(
                            (i) =>
                              i.return_id === dataObj.return_id &&
                              i.product_order_id === dataObj.product_order_id &&
                              i.size === dataObj.size
                          );

                          if (existingItem) {
                            dataObj.status = existingItem.status;
                            dataObj.return_mode = existingItem.return_mode;
                            dataObj.remarks = existingItem.remarks;
                          }

                          const isChecked = isItemSelected(
                            values.items,
                            dataObj
                          );

                          return (
                            <tr
                              key={`${index}-${dIndex}`}
                              className="bg-[#FCFCFC] border-b-2 "
                            >
                              <td className="text-xs py-3 sm:px-4 px-2">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  disabled={
                                    detail.return_status !== "requested"
                                  }
                                  onChange={() => {
                                    if (isChecked) {
                                      const filtered = values.items.filter(
                                        (i) =>
                                          !(
                                            i.return_id === dataObj.return_id &&
                                            i.product_order_id ===
                                              dataObj.product_order_id &&
                                            i.size === dataObj.size
                                          )
                                      );
                                      setFieldValue("items", filtered);
                                    } else {
                                      setFieldValue("items", [
                                        ...values.items,
                                        dataObj,
                                      ]);
                                    }
                                  }}
                                />
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs flex gap-3">
                                <Image
                                  src={variation.image}
                                  className="w-12 h-12 rounded-md"
                                  classNameImg="w-full h-full object-contain"
                                />
                                <div className="max-w-[100px]">
                                  <span className="block truncate">
                                    {order.product.product_name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs">
                                {variation.colorName} / {detail.size}
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs">
                                {detail.returned_quantity}
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs">
                                {detail.returned_quantity}
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs">
                                {detail.return_reason}
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs space-y-1">
                                {detail.return_reference_docs?.length > 0
                                  ? detail.return_reference_docs.map((f) => {
                                      const ext =
                                        f.split(".").pop()?.toLowerCase() ?? "";
                                      const typeMap: Record<string, string> = {
                                        jpg: "Image",
                                        jpeg: "Image",
                                        png: "Image",
                                        webp: "Image",
                                        mp4: "Video",
                                        mov: "Video",
                                        ogv: "Video",
                                        pdf: "PDF",
                                      };
                                      const label = typeMap[ext] || "File";
                                      return (
                                        <a
                                          key={f}
                                          href={f}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="underline text-blue-500 block"
                                        >
                                          {label} ({ext})
                                        </a>
                                      );
                                    })
                                  : "-"}
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs">
                                <RefundOrReplaceField
                                  detail={detail}
                                  index={values.items.findIndex(
                                    (i) =>
                                      i.return_id === dataObj.return_id &&
                                      i.product_order_id ===
                                        dataObj.product_order_id &&
                                      i.size === dataObj.size
                                  )}
                                  isEnabled={isChecked}
                                  setFieldValue={setFieldValue}
                                  values={values.items}
                                />
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs">
                                <RemarkField
                                  detail={detail}
                                  index={values.items.findIndex(
                                    (i) =>
                                      i.return_id === dataObj.return_id &&
                                      i.product_order_id ===
                                        dataObj.product_order_id &&
                                      i.size === dataObj.size
                                  )}
                                  isEnabled={isChecked}
                                />
                              </td>
                              <td className="py-3 sm:px-4 px-2 text-xs">
                                <StatusUpdateField
                                  detail={detail}
                                  item={dataObj}
                                  isEnabled={isChecked}
                                  values={values.items}
                                  setFieldValue={setFieldValue}
                                />
                              </td>
                            </tr>
                          );
                        });
                      })}
                  </tbody>
                </table>
              </div>

              {/* <ErrorMessage name="items">
                {(msg) => (
                  <div className="text-red-500 text-xs mt-1">{msg}</div>
                )}
              </ErrorMessage> */}

              <div className="flex justify-end">
                <Modal
                  classnameTitle="text-center"
                  classnameDescription="text-center"
                  title="Are you sure you want to finalize this return?"
                  description="Once submitted,
                                you cannot change item statuses."
                  trigger={
                    <button
                      type="button"
                      className={` ${
                        values.items.length === 0
                          ? "bg-[#DCDCDC] cursor-not-allowed "
                          : ""
                      } text-xs border py-3 px-2 min-w-[150px] rounded-lg shadow-sm text-white bg-[#2B90EC] `}
                      disabled={values.items.length === 0}
                    >
                      Take Action
                    </button>
                  }
                  footer={
                    <div className="flex w-full gap-3 mt-5">
                      <DialogClose className="w-full">
                        <AyButton
                          type="button"
                          variant="gray"
                          sx={{
                            width: "100%",
                            borderRadius: "10px",
                            py: "12px",
                          }}
                        >
                          Cancel
                        </AyButton>
                      </DialogClose>
                      <div className="w-full">
                        <FormikConsumer>
                          {(formik) => (
                            <AyButton
                              type="button"
                              onClick={() => {
                                formik.submitForm();
                              }}
                              sx={{
                                width: "100%",
                                borderRadius: "10px",
                                py: "12px",
                              }}
                            >
                              <Loader state={isPending}>Yes, Submit</Loader>
                            </AyButton>
                          )}
                        </FormikConsumer>
                      </div>
                    </div>
                  }
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserReturnTableDetails;

const StatusUpdateField = ({
  item,
  isEnabled = true,
  values,
  setFieldValue,
  detail,
}: {
  item: ReturnActionFormData;
  isEnabled?: boolean;
  values: ReturnActionFormData[];
  setFieldValue: FormikHelpers<{
    items: ReturnActionFormData[];
  }>["setFieldValue"];
  detail: IReturnDetail;
}) => {
  const itemIndex = values.findIndex(
    (i) =>
      i.return_id === item.return_id &&
      i.product_order_id === item.product_order_id &&
      i.size === item.size
  );

  const fieldName = `items[${itemIndex}].status`;
  const returnMode = values[itemIndex]?.return_mode;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    if (selected === "approved") {
      if (returnMode === "refund") {
        setFieldValue(fieldName, "refund_approved_by_store");
      } else if (returnMode === "replace") {
        setFieldValue(fieldName, "return_approved_by_store");
      }
    } else if (selected === "rejected") {
      setFieldValue(fieldName, "rejected");
    } else {
      setFieldValue(fieldName, "");
    }
  };

  return (
    <div className="flex flex-col">
      {detail.return_status === "requested" ? (
        <div className="flex flex-col">
          <select
            disabled={!isEnabled || itemIndex === -1}
            // value={values[itemIndex]?.status || ""}
            onChange={handleChange}
            className="text-xs border rounded px-1 py-1"
          >
            <option value="">Select</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
          <ErrorMessage
            name={fieldName}
            className="text-xs text-red-500"
            component={"span"}
          />
        </div>
      ) : (
        <div className="">
          <span className="capitalize">
            {detail.return_status.split("_").join(" ")}
          </span>
        </div>
      )}
    </div>
  );
};

const RemarkField = ({
  index,
  isEnabled = true,
  detail,
}: {
  index: number;
  isEnabled?: boolean;
  detail: IReturnDetail;
}) => {
  const isDisabled = !isEnabled && !detail.remarks;
  return (
    <Modal
      title="Remarks"
      description="Enter note to customer"
      footer={
        <div className="flex flex-col p-0 text-end text-textGray select-none ">
          <span className="text-[10px]">Files are auto save</span>
          <span className="text-[10px] lowercase ">
            Close Modal once you done
          </span>
        </div>
      }
      trigger={
        <button
          type="button"
          className={`text-xs border py-1 px-2 rounded-sm shadow-sm ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isDisabled}
        >
          Remarks
        </button>
      }
    >
      {detail.remarks ? (
        <Textarea />
      ) : (
        <Field
          as={Textarea}
          name={`items[${index}].remarks`}
          placeholder="Enter Remarks"
          className="text-xs min-h-[200px] max-h-[300px]"
          disabled={!isEnabled}
        />
      )}
    </Modal>
  );
};

const REFUND_OPTIONS = [
  { label: "Refund", value: "refund" },
  { label: "Replace", value: "replace" },
];
const RefundOrReplaceField = ({
  index,
  isEnabled,
  setFieldValue,
  values,
  detail,
}: {
  index: number;
  isEnabled: boolean;
  setFieldValue: FormikHelpers<{
    items: ReturnActionFormData[];
  }>["setFieldValue"];
  values: ReturnActionFormData[];
  detail: IReturnDetail;
}) => {
  const fieldName = `items[${index}].return_mode`;
  const currentValue = values[index]?.return_mode;

  // const RefundReplaceValue =

  return (
    <div className="flex flex-col gap-1 text-xs">
      {detail.return_mode === "none" ? (
        REFUND_OPTIONS.map((option) => (
          <label key={option.value} className="flex items-center gap-1">
            <input
              type="radio"
              checked={currentValue === option.value}
              onChange={() => {
                setFieldValue(
                  fieldName,
                  currentValue === option.value ? "" : option.value
                );
              }}
              disabled={!isEnabled}
            />
            {option.label}
          </label>
        ))
      ) : (
        <span className="capitalize w-fit bg-blue-50 border-blue-500 border rounded-sm text-center p-1 text-blue-600 font-bold">
          {detail.return_mode}
        </span>
      )}

      <ErrorMessage
        name={fieldName}
        className="text-xs text-red-50"
        component={"span"}
      />
    </div>
  );
};
