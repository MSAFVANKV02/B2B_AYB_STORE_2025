import MyCloseIcon from "@/components/icons/My_CloseIcon";
import TaskModal, { TaskModalHeader } from "@/components/modals/TaskModal";
import AyButton from "@/components/myUi/AyButton";
import { receive_Transacted_Stock_Api } from "@/services/stock/route";
import { IAdminTypes } from "@/types/adminUserTypes";
import { IStockStatusTypes, IStockType } from "@/types/stock_types";
import { StoreTypes } from "@/types/storeTypes";
import { makeToast, makeToastError } from "@/utils/toaster";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo } from "react";

type Props = {
  data: IStockType;
  closeModal: () => void;
};

// Type Guards to Check Destination Type
const isStoreType = (
  destination: StoreTypes | IAdminTypes
): destination is StoreTypes => {
  return "emailId" in destination; // If 'emailId' exists, it's StoreTypes
};

const isAdminType = (
  destination: StoreTypes | IAdminTypes
): destination is IAdminTypes => {
  return "email" in destination; // If 'email' exists, it's IAdminTypes
};

const RequestedProductStock = ({ data, closeModal }: Props) => {
  // console.log(data, "data in RequestedProductStock");
  const queryClient = useQueryClient();

  const { destination, product_details } = data;

  const isStore = isStoreType(destination);
  const isAdmin = isAdminType(destination);

  // const productNames = product_details.map((p) => p.product.product_name).join(', ');

  const allSizes = Array.from(
    new Set(
      product_details.flatMap((p) =>
        p.product.variations.flatMap((variant) =>
          variant.details.map((detail) => detail.size)
        )
      )
    )
  ).join(", ");

  const allColors = Array.from(
    new Set(
      product_details.flatMap((p) =>
        p.product.variations.map((variant) => variant.colorName)
      )
    )
  ).join(", ");

  const selectedProduct = product_details[0]?.product;

  const statusTitle = (status: Partial<IStockStatusTypes>) => {
    switch (status) {
      case "requested":
        return "Requested";
      case "rejected":
        return "Stock Rejected";
      case "approved":
        return "Approved";
      case "in_transit":
        return "Confirm";
      case "received":
        return "Received";
      case "outofstock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  }


  const handleReceiveRequestedProduct = async (id:string) =>{
    try {
      const {data,status} = await receive_Transacted_Stock_Api(id,"received");
      if(status === 201 || status === 200){
        queryClient.invalidateQueries({ queryKey: ["all-new-products"] });
        makeToast(data.message);
        closeModal();
       
      }
    } catch (error: any) {
      console.log(error, "error in receive_requested_product");
      if(error){
        makeToastError(error.response.data.message||"something wrong happened!");
      }
    }
  }

  return (
    <TaskModal className="2xl:w-[60%] sm:w-[90%] w-full md:h-[90vh] h-full bg-gray-50 dark:border dark:border-white">
      <TaskModalHeader className="bg-gray-50 dark:bg-inherit p-1">
        <span></span>
        <MyCloseIcon onClick={closeModal} />
      </TaskModalHeader>
      <div className="w-full md:h-[70vh] h-full space-y-4 bg-gray-50 dark:bg-inherit flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-16 h-16">
                <img
                  src={selectedProduct?.thumbnails?.[0] || ""}
                  className="object-cover h-full w-full"
                  alt={selectedProduct?.product_name || "Product Image"}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Product Name:</b>
                  <small className="overflow-hidden truncate">
                    {selectedProduct?.product_name}
                  </small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Brand:</b>
                  <small>{selectedProduct?.brand?.name}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Weight in gm:</b>
                  <small>{selectedProduct?.product_weight}</small>
                </span>
                <span className="text-sm capitalize flex items-center gap-1">
                  <b>Min. order:</b>
                  <small>{selectedProduct?.minimum_quantity}</small>
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

            {/* Right Side */}
            <div className="bg-bgSoft p-4 rounded-sm text-xs shadow-sm h-fit flex flex-col gap-1">
              <span>
                Request Sent to: <span>{destination.name || "N/A"}</span>
              </span>
              {isStore && (
                <>
                  <span>
                    Email: <span>{destination.emailId || "N/A"}</span>
                  </span>
                  <span>
                    Store Location: <span>{destination.state || "N/A"}</span>
                  </span>
                  <span>
                    Phone: <span>{destination?.phoneNumber || "N/A"}</span>
                  </span>
                </>
              )}
              {isAdmin && (
                <>
                  <span>
                    Email: <span>{destination.email || "N/A"}</span>
                  </span>
                  {/* <span>
                  Role: <span>{destination.role || "N/A"}</span>
                </span> */}
                  <span>
                    Phone: <span>{destination?.mobile || "N/A"}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="">
                  <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-left">
                    Variant
                  </th>
                  <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-left">
                    Size
                  </th>
                  <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
                    Sku Id
                  </th>
                  <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
                    Stock
                  </th>

                  <th className="border-b border-gray-300 text-xs text-textGray select-none px-4 py-4 text-center">
                    Purchase Quantity*
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  selectedProduct.variations.map((variant) => (
                    <React.Fragment key={variant.colorCode}>
                      {variant.details.map((stock, stockIndex) => (
                        <tr
                          key={`${selectedProduct.product_name}-${stock.size}`}
                        >
                           
                          {stockIndex === 0 && (
                            <td
                            rowSpan={variant.details.length}
                            className="border border-gray-300 px-2 py-1 text-center text-xs  w-[300px]"
                          >
                            <div className="flex gap-2 w-full">
                              <img
                                src={variant.image}
                                alt={selectedProduct.product_name}
                                className="w-10 h-10 rounded-sm object-cover text-xs"
                              />
                             <div className="flex flex-col gap-1  w-[200px]">
                             <span className='truncate overflow-hidden' >{variant.variant_name || selectedProduct.product_name}</span>
                             <span className="">{variant.colorName}</span>
                             </div>
                            </div>
                          </td>
                          )}
                          <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                            {stock.size}
                          </td>
                          <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                            {stock.skuId}
                          </td>
                          <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                            {stock.stock}
                          </td>
                          <td className="border border-gray-300 text-xs px-4 py-1 text-center">
                            {stock.requested_stock}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* ===================== */}
        <div className="h p-3   right-0 w-full flex items-center gap-4 justify-end sticky bottom-0">
          <p className={` ${data.status === "in_transit"?"text-textMain":"text-textSoft select-none"} text-sm`}>
            * {statusTitle(data.status)} you'r Stock :
          </p>
          <AyButton
          onClick={()=>{
            if(data.status === "in_transit"){
              handleReceiveRequestedProduct(data._id);
            }
          }}
            sx={{
              mt: "auto",
            }}
            disabled={data.status !== "in_transit"}
          >
           {statusTitle(data.status)}
          </AyButton>
        </div>
      </div>
    </TaskModal>
  );
};

export default memo(RequestedProductStock);
