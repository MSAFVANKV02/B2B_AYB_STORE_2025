import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import MyEditIcon from "@/components/icons/My_EditIcon";
import {
  AddToSessionStorage,
  SessionStorageAllPaths,
} from "@/hooks/use-sessioStorage";
import { deleteCouponsRedux } from "@/redux/actions/coupon_slice";
import { dispatch } from "@/redux/hook";
import { ICouponType } from "@/types/ICouponTypes";
import { makeToast } from "@/utils/toaster";
import { useNavigate } from "react-router-dom";

type Props = {
  data: ICouponType;
};

function CouponColumnAction({ data }: Props) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await dispatch(deleteCouponsRedux(data._id))
      .then(() => {
        makeToast("Coupon deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { coupon } = SessionStorageAllPaths();

  return (
    <div>
      <div className="flex items-center">
        <MyEditIcon
          onClick={() => {
            navigate(`/marketing/coupons?type=create&editId=${data._id}`);
            AddToSessionStorage(coupon, JSON.stringify(data));
          }}
        />
        <MyDeleteIcon onClick={handleDelete} />
      </div>
    </div>
  );
}

export default CouponColumnAction;
