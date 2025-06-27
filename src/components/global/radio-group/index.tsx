import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


type Props = {
  className?: string;
  options: { label: string; value: string }[];
};

const MyRadioGroup = ({ className,options }: Props) => {
  return <div className={cn("", className)}>
    <RadioGroup defaultValue="increase" className="flex gap-6">
  {options.map((option) => (
    <div key={option.value} className="flex items-center space-x-2">
      <RadioGroupItem
        value={option.value}
        id={option.value}
        className={cn(
          "w-4 h-4 border-2 rounded-full border-blue-500",
          "data-[state=checked]:border-black",
          "relative data-[state=checked]:after:content-[''] data-[state=checked]:after:absolute",
          "data-[state=checked]:after:w-2 data-[state=checked]:after:h-2 data-[state=checked]:after:bg-blue-500",
          "data-[state=checked]:after:rounded-full data-[state=checked]:after:top-1/2 data-[state=checked]:after:left-1/2",
          "data-[state=checked]:after:-translate-x-1/2 data-[state=checked]:after:-translate-y-1/2 data-[state=checked]:after:transform"
        )}
      />
      <Label htmlFor={option.value} className="text-sm">
        {option.label}
      </Label>
    </div>
  ))}
</RadioGroup>
  </div>;
};

export default MyRadioGroup;
