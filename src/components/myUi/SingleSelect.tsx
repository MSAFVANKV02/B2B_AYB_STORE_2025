import { SelectOption } from "@/types/productType";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { customStyles } from "../products/Custom_styles";
import { cn } from "@/lib/utils";

const animatedComponents = makeAnimated();

type Props = {
  setSelectedValue: (fieldName: string, value: SelectOption | null) => void;
  selectedValue: SelectOption | null;
  options: SelectOption[];
  fieldName: string;
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
  formatOptionLabel?:any
};

export default function SingleSelect({
  setSelectedValue,
  selectedValue,
  options,
  fieldName,
  className,
  placeholder = "Select an option",
  isDisabled,
  formatOptionLabel
}: Props) {
  return (
    <Select
      isMulti={false}
      components={animatedComponents}
      isDisabled={isDisabled}
      className={cn("w-full", className)}
      formatOptionLabel={formatOptionLabel}
      styles={customStyles}
      value={selectedValue}
      placeholder={placeholder}
      options={options}
      getOptionLabel={(e: SelectOption) => e.name}
      getOptionValue={(e: SelectOption) => e._id}
      onChange={(selected) => {
        setSelectedValue(fieldName, selected as SelectOption);
      }}
    />
  );
}
