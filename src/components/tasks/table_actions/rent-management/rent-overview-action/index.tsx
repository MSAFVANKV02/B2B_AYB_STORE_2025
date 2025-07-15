
import My_Icon from "@/components/icons/My_Icon";
// import { IRentTypes } from "@/types/rent-types";

// type Props = {
//   data:IRentTypes
// };

const RentOverviewActions = () => {
  return (
    <div className="flex gap-3 items-center justify-center h-0">
      {/* <RentSpaceChangeModal data={data} /> */}

      <My_Icon
        onClick={() => {}}
        className="bg-blue-100 text-blue-400 rounded-sm"
        color="#000000"
        fontSize={20}
        icon="ph:printer"
        tooltipTitle="Print"
      />
    </div>
  );
};

export default RentOverviewActions;


