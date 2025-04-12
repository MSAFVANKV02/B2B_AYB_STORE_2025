import { useEffect, useMemo, useState } from "react";

import { dispatch, useAppSelector } from "@/redux/hook";
import { makeToastError } from "@/utils/toaster";
import { IProducts, SelectOption } from "@/types/productType";
import {
  deleteColorsSizeRedux,
  getColorsRedux,
} from "@/redux/actions/size_color_Slice";
import SingleSelect from "@/components/myUi/SingleSelect";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  setFieldValue: any;
  values: IProducts;
  className?: string;
  showError?: boolean;
  productLocalImages: {
    image: string;
    colorCode: string;
    colorName: string;
  }[];
  setProductLocalImages: (
    images: {
      image: string;
      colorCode: string;
      colorName: string;
    }[]
  ) => void;
  setSelectedColor: (value: boolean) => void;
  setShowColorPicker: (value: boolean) => void;
  index: number;
};

const ColorVariantSelectTab = ({
  className,
  productLocalImages,
  setProductLocalImages,
  setSelectedColor,
  index,
}: Props) => {
  // const [pickedColor, setPickedColor] = useState<Color | null>(null);
  // const [colorPickerToggle, setColorPickerToggle] = useState(false);
  // const colorPickerRef = useRef<HTMLDivElement>(null);
  // const colorPickerRef2 = useRef<HTMLButtonElement>(null);

  const [pickedColor, setPickedColor] = useState<SelectOption | null>(null);

  const [colorOptions, setColorOptions] = useState<SelectOption[]>([]);

  // console.log(productLocalImages);

  const { colors } = useAppSelector((state) => state.sizeColor);

  const selectOptions = useMemo(
    () =>
      colorOptions.map((color) => ({
        _id: color._id,
        name: color.name,
        code: color.code,
      })),
    [colorOptions]
  );

  useEffect(() => {
    dispatch(getColorsRedux());
  }, []);

  useEffect(() => {
    if (colors && colors.length > 0) {
      setColorOptions(
        colors.map((color) => ({
          code: color.colorCode,
          name: color.colorName,
          _id: color._id,
        }))
      );
    }
  }, [colors]);

  useEffect(() => {
    if (
      colorOptions.length > 0 &&
      productLocalImages[index] &&
      productLocalImages[index].colorCode &&
      productLocalImages[index].colorName
    ) {
      const variationColorCode = productLocalImages[index].colorCode;
      const variationColorName = productLocalImages[index].colorName;

      const matchedColor = colorOptions.find(
        (opt) =>
          opt.code === variationColorCode && opt.name === variationColorName
      );

      if (matchedColor) {
        setPickedColor({
          code: matchedColor.code,
          name: matchedColor.name,
          _id: matchedColor._id,
        });
      } else {
        setPickedColor(null); // Don’t show if not matched
      }
    } else {
      setPickedColor(null); // Reset if missing data
    }
  }, [colorOptions, productLocalImages, index]);

  const formatOptionLabel = (option: SelectOption, { context }: any) => (
    <div className="flex items-center">
      <div
        className="w-4 h-4 rounded-lg mr-2"
        style={{ backgroundColor: option.code }}
      />
      <span>{option.name}</span>

      {context === "menu" && (
        <button
          className="ml-auto hover:text-red-500"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              deleteColorsSizeRedux({ id: option._id, value: "color" })
            );
            // Optional: Add delete logic
          }}
        >
          <Icon icon="mdi:delete" />
        </button>
      )}
    </div>
  );

  return (
    <div className={className}>
      <SingleSelect
        formatOptionLabel={formatOptionLabel}
        options={selectOptions}
        className="lg:w-3/4 border-slate-600"
        fieldName={"variations"}
        selectedValue={pickedColor}
        // isDisabled={values.variations.length === 0}
        setSelectedValue={(_, selectedOption) => {
          if (!selectedOption || !selectedOption.code || !selectedOption.name) return;
        
          const isColorUsed = productLocalImages.some(
            (img, i) => img.colorName === selectedOption.name && i !== index
          );
        
          if (isColorUsed) {
            setSelectedColor(true);
            makeToastError(
              `The color ${selectedOption.name} is already assigned to another image.`
            );
            return;
          }
        
          setSelectedColor(false);
          setPickedColor(selectedOption);
        
          const updatedImages = [...productLocalImages];
          updatedImages[index] = {
            ...updatedImages[index],
            colorCode: selectedOption.code, // now guaranteed to be a string
            colorName: selectedOption.name,
          };
          setProductLocalImages(updatedImages);
        }}
        
        // setSelectedValue={(_, selectedOption) => {
        //   setPickedColor(selectedOption);
        //   const isColorUsed = productLocalImages.some(
        //     (img) => img.colorName === selectedOption?.name
        //   );

        //   if (isColorUsed) {
        //     setSelectedColor(true);
        //     makeToastError(
        //       `The color ${selectedOption?.name} is already assigned to another image.`
        //     );
        //     return;
        //   } else {
        //     setSelectedColor(false);
        //     setPickedColor(selectedOption);
        //     // setPickedColor({
        //     //   value: selected.value,
        //     //   label: selected.label,
        //     //   id: selected.id,
        //     // });
        //     const updatedImages = [...productLocalImages];
        //     updatedImages[index] = {
        //       ...updatedImages[index],
        //       colorCode: selectedOption?.code ,
        //       colorName: selectedOption?.name ,
        //     };
        //     setProductLocalImages(updatedImages);
        //   }
        // }}
      />
    </div>
  );
};

export default ColorVariantSelectTab;
