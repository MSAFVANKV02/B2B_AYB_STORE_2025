import { SelectOption } from "@/types/productType";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { customStyles } from "../products/Custom_styles";
import { cn } from "@/lib/utils";

const animatedComponents = makeAnimated();

type Props = {
  setSelectedValues: (fieldName: string, value: SelectOption[]) => void;
  selectedValue: MultiValue<SelectOption>;
  options: SelectOption[];
  fieldName: string;
  className?: string; 
  placeholder?: string; 
};

export default function MultiSelect({
  setSelectedValues,
  selectedValue,
  options,
  fieldName,
  className,
  placeholder='Select sizes'
}: Props) {
  return (
    <Select
      isMulti
      components={animatedComponents}
      className={cn(`w-full`,className)}
      styles={customStyles}
      value={selectedValue}
      placeholder={placeholder}
      closeMenuOnSelect={false}
      options={options}
      getOptionLabel={(e: SelectOption) => e.name}
      getOptionValue={(e: SelectOption) => e._id}
      onChange={(selected) => {
        setSelectedValues(fieldName, selected as SelectOption[]);
      }}
    />
  );
}
