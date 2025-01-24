import MyCloseIcon from "@/components/icons/My_CloseIcon";
import MyEditIcon from "@/components/icons/My_EditIcon";
import MyEyeIcon from "@/components/icons/My_EyeIcon";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import { Label } from "@/components/ui/label";
import { useModal } from "@/providers/context/context";
import { StoreTypes } from "@/types/storeTypes";
import { useState } from "react";

type Props = {
  data: StoreTypes;
};

export default function StoreTableAction({ data }: Props) {
  const { setIsOpen } = useModal();
  const [selectedData, setSelectedData] = useState<StoreTypes | null>(null);

  const handleViewClick = () => {
    setSelectedData(data); // Set the selected row's data
    setIsOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setSelectedData(null); // Clear selected data
    setIsOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="flex items-center">
        <MyEyeIcon onClick={handleViewClick} />
        <MyEditIcon onClick={() => {}} />
      </div>

      {/* Modal specifically tied to the selected data */}
      {selectedData && (
        <TaskModal className="xl:w-[60%] md:w-[70%] w-full md:h-[90%] h-full">
          <TaskModalHeader>
            <h5 className="font-bold capitalize">Store Details</h5>
            <div className="">
              <MyCloseIcon onClick={handleCloseModal} isTooltip={false} />
            </div>
          </TaskModalHeader>

          <TaskModalContent className="space-y-3 sm:px-7 pt-5">
            {/* Store Name */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Store Name :</Label>
              <span>{selectedData.storeName || "N/A"}</span>
            </div>

            {/* GST Number */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">GST Number :</Label>
              <span>{selectedData.gstNumber || "N/A"}</span>
            </div>

            {/* Store Address */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Store Address :</Label>
              <span>{selectedData.storeAddress || "N/A"}</span>
            </div>

            {/* Store Capacity in Cubic */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">
                Store Capacity (in cubic):
              </Label>
              <span>{selectedData.storeCapacity || "N/A"}</span>
            </div>

            {/* State */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">State :</Label>
              <span>{selectedData.state || "N/A"}</span>
            </div>

            {/* Country */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Country :</Label>
              <span>{selectedData.country || "N/A"}</span>
            </div>

            {/* Pincode */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Pincode :</Label>
              <span>{selectedData.pinCode || "N/A"}</span>
            </div>

            {/* Google Location */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Google Location :</Label>
              <div className="">
                lat:{" "}
                <span>{selectedData?.googleLocation?.latitude || "N/A"}</span>
                lng:{" "}
                <span>{selectedData?.googleLocation?.longitude || "N/A"}</span>
              </div>
            </div>

            {/* Store Manager */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Store Manager :</Label>
              <span>{selectedData.storeManager || "N/A"}</span>
            </div>

            {/* Email ID */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Email ID :</Label>
              <span>{selectedData.emailId || "N/A"}</span>
            </div>

            {/* Phone Number */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Phone Number :</Label>
              <span>{selectedData.phoneNumber || "N/A"}</span>
            </div>

            {/* User Name */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">User Name :</Label>
              <span>{selectedData.userName || "N/A"}</span>
            </div>

            {/* Password */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">Password :</Label>
              <span>{selectedData.password || "N/A"}</span>
            </div>

            {/* In-House Product */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">
                In-House Product :
              </Label>
              <span>{selectedData.inHouseProduct ? "Yes" : "No"}</span>
            </div>

            {/* Bank Details */}
            <div className="border-t-2 pt-4 space-y-3">
              <div className="text-lg font-semibold">Bank Details</div>

              {/* Account Name */}
              <div className="flex justify-between sm:flex-row flex-col gap-3">
                <Label className="text-sm text-textGray">Account Name :</Label>
                <span>{selectedData.bankDetails.accountName || "N/A"}</span>
              </div>

              {/* Account Number */}
              <div className="flex justify-between sm:flex-row flex-col gap-3">
                <Label className="text-sm text-textGray">
                  Account Number :
                </Label>
                <span>{selectedData.bankDetails.accountNumber || "N/A"}</span>
              </div>

              {/* IFSC */}
              <div className="flex justify-between sm:flex-row flex-col gap-3">
                <Label className="text-sm text-textGray">IFSC :</Label>
                <span>{selectedData.bankDetails.ifscCode || "N/A"}</span>
              </div>

              {/* Shift Code */}
              <div className="flex justify-between sm:flex-row flex-col gap-3">
                <Label className="text-sm text-textGray">Shift Code :</Label>
                <span>{selectedData.bankDetails.shiftCode || "N/A"}</span>
              </div>

              {/* UPI ID */}
              <div className="flex justify-between sm:flex-row flex-col gap-3">
                <Label className="text-sm text-textGray">UPI ID :</Label>
                <span>{selectedData.bankDetails.upiId || "N/A"}</span>
              </div>
            </div>

            {/* Store Capacity in Cubic Meter */}
            <div className="flex justify-between sm:flex-row flex-col gap-3">
              <Label className="text-sm text-textGray">
                Store Capacity (in cubic meters) :
              </Label>
              <span>{selectedData.storeCapacity || "N/A"}</span>
            </div>
          </TaskModalContent>
        </TaskModal>
      )}
    </div>
  );
}
