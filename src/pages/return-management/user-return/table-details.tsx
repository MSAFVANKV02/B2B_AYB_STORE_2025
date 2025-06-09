import Image from "@/components/global/image";
import MyBackBtn from "@/components/myUi/myBackBtn";
import MyClock from "@/components/myUi/MyClock";
import { UseUpdateModal } from "@/providers/context/modal-context";
import { IReturnOrders } from "@/types/return_order_types";
import { Form, Formik } from "formik";
import { useMemo } from "react";

const UserReturnTableDetails = () => {
  const { dispatchModal, modalState } = UseUpdateModal();

  const orders = useMemo(() => {
    return modalState.selectedModalData;
  }, [modalState.selectedModalData]) as IReturnOrders;

  return (
    <div className="space-y-6">
      <MyBackBtn
        clickEvent={() => {
          dispatchModal({ type: "CLOSE_MODAL" });
        }}
      />
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <Form className="space-y-6">
              <div className="flex justify-between md:w-1/2 w-full">
                <div className="flex flex-col gap-1">
                  <p className="flex items-center gap-1 text-xs">
                    <span className="font-semibold">Return ID :</span>
                    <span className="">{orders.return_id}</span>
                  </p>
                  <p className="flex items-center gap-1 text-xs">
                    <span className="font-semibold">User Name :</span>
                    <span className="">{orders.customer_id.name}</span>
                  </p>
                </div>

                <div className="">
                  <span className="">Date : {""}</span>
                  <MyClock
                    date={orders.createdAt}
                    showSeconds={false}
                    showTime={false}
                  />
                </div>
              </div>

              {/* table starts ===
              ================= */}

              <table className="w-full">
                <thead className="bg-[#F8F8F8]">
                  <tr>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Name
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      size/color
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Order Qty
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Return Qty
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Return Type
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Reason
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Uploaded File
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Refund / Replace
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Admin Comment
                    </th>
                    <th className="sm:py-2 py-1 sm:px-4 px-2 sm:text-sm text-xs text-left font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {modalState.type === "return-product-details" &&
                    orders.items.map((order, index) => {
                      const variation = order.product.variations[0]


                      const allDetails = order.product.variations.flatMap(
                        (variation) => variation.details
                      );

                      return (
                        <tr
                          className="border-t-2 border-t-white bg-[#FCFCFC] "
                          key={index}
                        >
                          <td className="py-3 sm:px-4 px-2  text-xs flex gap-3">
                            <Image
                              src={variation.image}
                              className="w-12 h-12 rounded-md overflow-hidden"
                              classNameImg="w-full h-full object-contain"
                            />
                            <div className=" max-w-[100px]">
                              <span className="block truncate overflow-hidden whitespace-nowrap">
                                {order.product.product_name}
                              </span>
                            </div>
                          </td>
                          {/* ==== */}
                          <td className="py-3 sm:px-4 px-2  text-xs">
                            {variation.colorName} / 
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserReturnTableDetails;
