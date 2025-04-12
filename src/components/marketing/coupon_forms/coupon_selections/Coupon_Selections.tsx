import { getAllDataList } from "@/actions/coupon/couponAction";
import MultiSelect from "@/components/myUi/MultiSelect";
import { Label } from "@/components/ui/label";
import { GetSessionStorage, SessionStorageAllPaths } from "@/hooks/use-sessioStorage";
import { useQueryData } from "@/hooks/useQueryData";
import { ICouponType, IGetAllDataType } from "@/types/ICouponTypes";
import { SelectOption } from "@/types/productType";
import { ErrorMessage } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  title: string;
  setFieldValue: (field: string, value: any) => void;
  values: Partial<ICouponType>;
  name: keyof Partial<ICouponType>;
  index: number;
  placeholder?: string;
  type: keyof IGetAllDataType;
};

const CouponSelections = ({
  title,
  setFieldValue,
  name,
  index,
  placeholder,
  type,
}: Props) => {
  const [searchParams] = useSearchParams();
  const { coupon } = SessionStorageAllPaths();
  const [selectedProducts, setSelectedProducts] = useState<SelectOption[]>([]);


  const editId = useMemo(() => {
    return searchParams.get("editId");
  }, [searchParams]);

  const rawEditData = GetSessionStorage(coupon);
  const editData = rawEditData
    ? (JSON.parse(rawEditData) as ICouponType)
    : null;

  const { data: fetchedAllData } = useQueryData(["all-data"], () =>
    getAllDataList()
  );

  // console.log(fetchedAllData,'fetchedAllData');


  

  const options: SelectOption[] = useMemo(() => {
    const allData = (fetchedAllData as { data?: IGetAllDataType })?.data;
    const raw = allData?.[type] || [];
    return raw.map((item: any) => ({
      _id: item._id,
      name: item.name || item.title || item.storeName || "Unknown",
    }));
  }, [fetchedAllData, type]);

  useEffect(() => {
    if (editId && editData && options.length > 0) {
      const selectedRaw = editData[name];
      const selectedIds = Array.isArray(selectedRaw) ? selectedRaw : [];
  // console.log(selectedIds,'sss');
      
  
      const selectedOptions = options.filter((option) =>
        selectedIds.includes(option._id)
      );
  
      setSelectedProducts(selectedOptions);
    }
  }, [editId]);

  
  

  return (
    <div key={index}>
      <div className="flex justify-between lg:flex-row flex-col gap-2">
        <Label
          htmlFor="applicable_product_id"
          className="text-sm text-textGray"
        >
          {title}
        </Label>

        <MultiSelect
          options={options}
          placeholder={placeholder}
          className="lg:w-3/4 border-slate-600"
          fieldName={name as string}
          selectedValue={selectedProducts}
          setSelectedValues={(_, selectedOptions) => {
            // console.log(selectedOptions);
          
            const selectedArray = Array.isArray(selectedOptions) ? selectedOptions : [];
          
            setFieldValue(
              name,
              selectedArray.map((option: SelectOption) => option?._id)
            );
            setSelectedProducts(selectedArray);
          }}
          
        />

        <ErrorMessage
          name={name as string}
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
    </div>
  );
};

export default CouponSelections;
