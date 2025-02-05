import { Check } from "lucide-react";
import { useState, memo } from "react";

interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "success" | "danger";
  onChange?: (checked: boolean) => void;
}

const Checkbox = memo(({ label, disabled = false, size = "medium", color = "primary", onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);

      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6"
  };

  const colorClasses = {
    primary: "bg-blue-500 border-blue-500",
    secondary: "bg-purple-500 border-purple-500",
    success: "bg-green-500 border-green-500",
    danger: "bg-red-500 border-red-500"
  };

  const baseClasses = "relative border-2 rounded transition-all duration-200 ease-in-out cursor-pointer";
  const checkboxClasses = `${baseClasses} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"} ${isChecked ? colorClasses[color] : "bg-white border-gray-300 hover:border-gray-400"}`;

  const iconSize = size === "small" ? "w-3 h-3" : size === "medium" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="inline-flex items-center">
      <div
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={disabled}
        aria-label={label || "Checkbox"}
        tabIndex={disabled ? -1 : 0}
        className={checkboxClasses}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleToggle();
          }
        }}
      >
        {isChecked && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <Check className={iconSize} />
          </div>
        )}
      </div>
      {label && (
        <label className={`ml-2 ${disabled ? "text-gray-400" : "text-gray-700"} select-none`}>
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;


// const CustomCheckbox = () => {
//     return (
//       <div className="p-8 space-y-4">
//         <h2 className="text-xl font-semibold mb-4">Checkbox Variants</h2>
//         <div className="space-y-2">
//           <Checkbox label="Default Checkbox" onChange={(checked) => console.log("Checked:", checked)} />
//           <Checkbox label="Small Size" size="small" color="secondary" />
//           <Checkbox label="Large Size" size="large" color="success" />
//           <Checkbox label="Danger Color" color="danger" />
//           <Checkbox label="Disabled Checkbox" disabled />
//         </div>
//       </div>
//     );
//   };
  
//   export default CustomCheckbox;