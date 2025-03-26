import { MySwitch } from "@/components/myUi/mySwitch";
import { useUpdateToggleWithStore } from "@/hooks/use-product-statusChange";
import { useAppSelector } from "@/redux/hook";
import { IFinalProductTypes } from "@/types/final-product-types";


export const PublishedCell = ({ row, refetch }: { row: IFinalProductTypes; refetch: () => void }) => {
  const { currentAdmin } = useAppSelector((state) => state.admin);

    const { onChangeNewToggle } = useUpdateToggleWithStore(row._id ?? "", refetch);
  
    const matchedStore = row?.product.non_published_stores?.find(
      (task) => task.store === row?.product?.createdBy
    );
  
    return (
      <div className="flex items-center gap-1 py-3">
        <MySwitch
          isOn={!!matchedStore}
          id={`is_published-${row._id}`}
          handleToggle={async () => {
            onChangeNewToggle("is_published", currentAdmin?._id ? [currentAdmin._id] : []);
          }}
        />
      </div>
    );
  };
  