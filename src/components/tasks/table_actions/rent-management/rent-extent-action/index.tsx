import { IRentTypes } from "@/types/rent-types";
import RentRequestUpdateModal from "../rent-request-action/rent-request-update-modal";

type Props = {
  data: IRentTypes;
};

const RentExtentRequestAction = ({ data }: Props) => {
  return (
    <div>
      {" "}
      {
        data.extension.status === "pending" && (
            <div className="flex gap-3 items-center justify-center">
        <RentRequestUpdateModal
        isExtend={true}
          type="accept"
          data={data}
          trigger={
            <button className="bg-green-100 py-2 text-xs min-w-16 rounded-md text-green-600">
              <span className="text-xs">Accept</span>
            </button>
          }
        />

        <RentRequestUpdateModal
        isExtend={true}
          type="reject"
          data={data}
          trigger={
            <button className="bg-red-100 py-2 text-xs min-w-16 rounded-md text-red-600">
              <span className="text-xs">Reject</span>
            </button>
          }
        />
      </div>
        )
      }
    
    </div>
  );
};

export default RentExtentRequestAction;
