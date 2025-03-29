import { Check } from "lucide-react";
import { useState, memo, useEffect } from "react";

interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  checked?: boolean; // Added prop for default checked state
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "success" | "danger" | "ayaboo";
  onChange?: (checked: boolean) => void;
}

const Checkbox = memo(({ label, disabled = false, checked = false, size = "medium", color = "primary", onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked); // Initialize with checked prop

  useEffect(() => {
    setIsChecked(checked); // Update if prop changes
  }, [checked]);

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
    danger: "bg-red-500 border-red-500",
    ayaboo: "bg-textMain border-textMain"
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
