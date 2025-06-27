import { IRentTypes } from "@/types/rent-types";
import RentRequestUpdateModal from "./rent-request-update-modal";

type Props = {
  data: IRentTypes;
};

const RentRequestActions = ({ data }: Props) => {
  return (
    <div className="">
      {data.status === "pending" ? (
        <div className="flex gap-3 items-center justify-center">
          <RentRequestUpdateModal
            type="accept"
            data={data}
            trigger={
              <button className="bg-green-100 py-2 text-xs min-w-16 rounded-md text-green-600">
                <span className="text-xs">Accept</span>
              </button>
            }
          />

          <RentRequestUpdateModal
            type="reject"
            data={data}
            trigger={
              <button className="bg-red-100 py-2 text-xs min-w-16 rounded-md text-red-600">
                <span className="text-xs">Reject</span>
              </button>
            }
          />
        </div>
      ) : (
        <button className="bg-blue-100 py-2 min-w-[80px] rounded-md text-blue-600">
          <span className="text-xs">Action Taken</span>
        </button>
      )}
    </div>
  );
};

export default RentRequestActions;
