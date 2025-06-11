import { SelectOption } from "@/types/productType";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
// import { customStyles } from "../products/Custom_styles";
import { cn } from "@/lib/utils";
import { useTheme } from "../ui/theme";

const animatedComponents = makeAnimated();

type Props = {
  setSelectedValues: (fieldName: string, value: SelectOption[]) => void;
  selectedValue: MultiValue<SelectOption>;
  options: SelectOption[];
  fieldName: string;
  className?: string; 
  placeholder?: string; 
  isDisabled?:boolean
  formatOptionLabel?:any

};

export default function MultiSelect({
  setSelectedValues,
  selectedValue,
  options,
  fieldName,
  className,
  placeholder='Select sizes',
  isDisabled,
  formatOptionLabel
}: Props) {
  const { theme } = useTheme();


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
    <Select
      isMulti
      components={animatedComponents}
      isDisabled={isDisabled}
      formatOptionLabel={formatOptionLabel}
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
