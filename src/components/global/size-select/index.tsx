import { useEffect, useMemo, useState } from "react";

import { dispatch, useAppSelector } from "@/redux/hook";

import { IProducts, SelectOption } from "@/types/productType";
import AyButton from "@/components/myUi/AyButton";
import AddNewSize from "@/components/size/Add_New_Size";
import MultiSelect from "@/components/myUi/MultiSelect";
import {
  deleteColorsSizeRedux,
  getSizesRedux,
} from "@/redux/actions/size_color_Slice";
import { Icon } from "@iconify/react/dist/iconify.js";

// const animatedComponents = makeAnimated();

type Props = {
  setFieldValue: any;
  values: IProducts;
  className?: string;
  showError?: boolean;
};

const SizeSelectTab = ({ values, className, setFieldValue }: Props) => {
  const [selectedSizes, setSelectedSizes] = useState<SelectOption[]>([]) || [];

  const [colorOptions, setSizeOptions] = useState<
    { name: string; _id: string }[]
  >([]);

  // console.log(productLocalImages);

  const { sizes } = useAppSelector((state) => state.sizeColor);
  const [newSize, setNewSize] = useState(false);
  // console.log(sizes);

  const selectOptions = useMemo(() => {
    return colorOptions.map((size) => ({
      _id: size._id,
      name: size.name,
    }));
  }, [colorOptions]);

  useEffect(() => {
    dispatch(getSizesRedux());
  }, []);

  useEffect(() => {
    if (sizes && sizes.length > 0) {
      setSizeOptions(
        sizes.map((size) => ({
          name: size.name,
          _id: size._id,
        }))
      );
    }
  }, [sizes]);

 
  const formatOptionLabel = (option: SelectOption, { context }: any) => {
    return (
      <div className="flex items-center">
        <span>{option.name}</span>
  
        {context === "menu" && (
          <button
            className="ml-auto hover:text-red-500"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteColorsSizeRedux({ id: option._id, value: "size" }));
            }}
          >
            <Icon icon="mdi:delete" />
          </button>
        )}
      </div>
    );
  };
  

  return (
    <div className={className}>
      {/* <Select
        components={animatedComponents}
        isMulti // Allow multiple selections
        name="size"
        options={selectOptions}
        className="w-full text-xs"
        placeholder="Select Sizes"
        value={selectedSizes}
        onChange={(val) => handleSizeChange(val as SelectOption[])} // handle array
        closeMenuOnSelect={false} // don't close on each select
        formatOptionLabel={formatOptionLabel}
      /> */}
      <MultiSelect
        options={selectOptions}
        // placeholder={placeholder}
        className="lg:w-3/4 border-slate-600"
        formatOptionLabel={formatOptionLabel}
        fieldName={"variations"}
        selectedValue={selectedSizes}
        isDisabled={values.variations.length === 0}
        setSelectedValues={(_, selectedOptions) => {
          // console.log(selectedOptions);

          const selectedArray = Array.isArray(selectedOptions)
            ? selectedOptions
            : [];

          setSelectedSizes(selectedArray);

          setFieldValue(
            "variations",
            values.variations.map((variation) => {
              const updatedDetails = selectedArray.map((size) => {
                const existingDetail = variation.details.find(
                  (detail) => detail.size === size.name
                );

                return {
                  ...existingDetail,
                  size: size.name,
                  stock: existingDetail?.stock || 0,
                  discount: existingDetail?.discount || 0,
                  selling_price: existingDetail?.selling_price || 0,
                  skuId: existingDetail?.skuId || "",
                };
              });

              return {
                ...variation,
                details: updatedDetails,
                sample: variation.sample || false,
              };
            })
          );
          // setSelectedProducts(selectedArray);
        }}
      />

      <div className="relative mt-5 md:block flex">
        <AyButton
          title="Add New Size"
          sx={{
            border: "1px dotted #EC922B",
            bgcolor: "#F3F3F3",
            color: "#737373",
            py: "0.6rem",
            width: "100%",
          }}
          outLineColor=""
          variant="outlined"
          onClick={() => setNewSize(true)}
        />
        <div className="absolute top-14 -right-0 z-50">
          <AddNewSize isOpen={newSize} onClose={() => setNewSize(false)} />
        </div>
      </div>
    </div>
  );
};

export default SizeSelectTab;
