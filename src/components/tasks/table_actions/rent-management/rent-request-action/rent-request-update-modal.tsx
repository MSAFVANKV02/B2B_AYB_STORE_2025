import {
  extentRequestAction,
  RequestForRentalVacateAction,
  updateRequestForRental,
} from "@/actions/rental/rentalActions";
import Loader from "@/components/global/loader";
import Modal from "@/components/modals/main";
import AyButton from "@/components/myUi/AyButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutationData } from "@/hooks/useMutationData";
import { IRentTypes } from "@/types/rent-types";
import { makeToastError } from "@/utils/toaster";
import { useState } from "react";

type Props = {
  title?: string;
  trigger?: React.ReactNode;
  data: IRentTypes;
  type: "accept" | "reject";
  isExtend?: boolean;
};

const RentRequestUpdateModal = ({
  title = "Update Rent Request",
  trigger,
  data,
  type,
  isExtend = false,
}: Props) => {
  const [reason, setReason] = useState<string>("");

  const queryKey = ["rental-requests"];

  const { mutate, isPending } = useMutationData(
    ["request-update"],
    ({
      reason,
      rentalId,
      status,
    }: {
      rentalId: string;
      reason: string;
      status: string;
    }) => {
      if (isExtend === true&& data.extension.status === "pending") {
        return extentRequestAction({
          reason,
          rentalId,
          status: type === "accept" ? "approved" : "rejected",
        });
      }

      if (data.status === "pending") {
        return updateRequestForRental(reason, rentalId, type);
      }

      if (data.status === "vacate_requested") {
        return RequestForRentalVacateAction({
          reason,
          rentalId,
          status,
        });
      }

      throw new Error("Invalid rental status for update");
    },
    queryKey
  );

  const handleUpdateRequest = () => {
    if (type === "reject" && !reason.trim()) {
      makeToastError("Please provide a reason for rejection.");
      return;
    }

    const status = type === "accept" ? "vacated" : "vacate_rejected";

    mutate({
      rentalId: data._id,
      reason: reason,
      status: status,
    });
  };

  return (
    <Modal
      title={title}
      classnameTitle=" font-semibold"
      description="Update the rent request details below."
      classname="bg-[#F3F4F6]"
      trigger={trigger}
      footer={
        <div className="flex justify-end gap-3">
          <DialogClose>
            <AyButton type="button" variant="gray">
              Cancel
            </AyButton>
          </DialogClose>

          <AyButton
            type="submit"
            disabled={isPending}
            onClick={handleUpdateRequest}
          >
            <Loader state={isPending}>Update Request</Loader>
          </AyButton>
        </div>
      }
    >
      {/* {data._id} */}
      {type === "reject" && (
        <div className="">
          <Label htmlFor="reason" className="text-textGray">
            Reason for Rejection
          </Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for rejection here..."
            className="mt-2"
          />
        </div>
      )}
    </Modal>
  );
};

export default RentRequestUpdateModal;
