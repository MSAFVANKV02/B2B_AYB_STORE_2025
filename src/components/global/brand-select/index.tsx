import { useTheme } from "@/components/ui/theme";
import { cn } from "@/lib/utils";
import { GeneralFormValues } from "@/pages/products/add-new/Page_Sections/GeneralSection-page";
import { getAllBrands } from "@/redux/actions/brandsSlice";
import { dispatch, useAppSelector } from "@/redux/hook";
import { SelectOption } from "@/types/productType";
import { ErrorMessage } from "formik";
import { useEffect, useMemo, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

type Props = {
  setFieldValue: any;
  values: GeneralFormValues;
  errors: any;
  className?: string;
};

const BrandSelectTab = ({ setFieldValue, values, className }: Props) => {
  const [selectedBrand, setSelectedBrand] = useState<SelectOption | null>(null);
  const [brands, setBrands] = useState<SelectOption | null>(null);
  const allBrands = useAppSelector((state) => state.brand.brands);
  const {currentAdmin} = useAppSelector((state)=> state.admin);
  const { theme } = useTheme();

//   console.log(values.brand, "values");

  const brandOptions = useMemo(
    () => [
      // { _id: "none", name: "No Parent" },
      ...allBrands
        // .filter((cat) => cat.name !== cat.name)
        .map((brand) => ({
          _id: brand?._id ?? "", // Ensure _id is always a string
          name: brand.name,
        })),
    ],
    [allBrands]
  );

  const brandId = useMemo(() => {
    return typeof values.brand === "string" ? values.brand : values.brand?._id;
  }, [values.brand]);

  useEffect(() => {
    dispatch(getAllBrands({status:"",userId:currentAdmin?._id}));

  }, []);

  useEffect(() => {

    if (brandId) {
      const findBrand = brandOptions.find(
        (option) => option._id === brandId
      );

      const existedBrand = {
        _id: findBrand?._id ?? "",
        name: findBrand?.name ?? "",
      };
      //  console.log(existedBrand,'existedBrand');

      setBrands(existedBrand);
    }
  }, [brandId]);


  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1f2937" : "#fff", // Tailwind: gray-800 or white
      borderColor: state.isFocused
        ? "#1E40AF"
        : theme === "dark"
        ? "#4B5563"
        : "#e3dfdf",
      color: theme === "dark" ? "#f3f4f6" : "#111827", // Tailwind: gray-100 or gray-900
      padding: "5px",
      fontSize: "0.8rem",
      borderRadius: "7px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#1E40AF",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
      color: theme === "dark" ? "#f3f4f6" : "#111827",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? theme === "dark"
          ? "#2563eb"
          : "#bfdbfe"
        : state.isFocused
        ? theme === "dark"
          ? "#374151"
          : "#f3f4f6"
        : "transparent",
      color: theme === "dark" ? "#f3f4f6" : "#111827",
      cursor: "pointer",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#f3f4f6" : "#111827",
    }),
  };
  return (
    <div className={cn("lg:w-3/4  dark:bg-inherit", className)}>
      <Select
        components={animatedComponents}
        name="parentId"
        // styles={{
        //   control: (base: any) => ({
        //     ...base,
        //     borderColor: "#e3dfdf",
        //     borderRadius: "7px",
        //     padding: "5px",
        //     fontSize: "0.8rem",
        //     boxShadow: "none",
        //     color: "#e3dfdf",
        //     "&:hover": {
        //       borderColor: "#1E40AF",
        //     },
        //   }),
        // }}
        className="w-full text-xs"
        value={
          selectedBrand
            ? {
                _id: selectedBrand._id,
                name: selectedBrand.name,
              }
            : brands
            ? {
                _id: brands._id,
                name: brands.name,
              }
            : null
        }
        placeholder="Select Brand"
        // options={Category.map((cat) => ({
        //   _id: cat._id,
        //   name: cat.name,
        // }))}
        styles={customStyles}
        options={brandOptions}
        getOptionLabel={(e: SelectOption) => e.name}
        getOptionValue={(e: SelectOption) => e._id}
        isMulti={false} // Single selection
        onChange={(selected: SelectOption | null) => {
          setSelectedBrand(selected); // Update state with the selected option
        //   console.log(selected);

          setFieldValue(
            "brand",
            selected && selected._id !== "none" ? selected._id : null
          ); // Update Formik with the selected _id
        }}
      />

      <ErrorMessage
        name="brand"
        component="span"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default BrandSelectTab;
