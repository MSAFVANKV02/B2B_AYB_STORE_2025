import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  name: string;
  type: string;
  accept: string;
  selectedData?: any;
  className?: string;
  multiple?: boolean;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  img?: string;
};

export default function FileInput({
  name,
  type="file",
  accept,
  selectedData,
  onChange,
  className,
  id,
  multiple,
  img
}: Props) {
  return (
    <Label
      htmlFor={name}
      className={cn(`w-full border h-12 rounded-md flex items-center cursor-pointer overflow-hidden`,className)}
    >
      <div className="px-5 border-r h-full text-center flex items-center bg-gray-100">
        {
          img ? <Icon icon={img} fontSize={25} color="#7A7A7A"/>:"Browse"
        }
       
      </div>
      <div className="flex-1 h-full flex items-center text-xs px-3 overflow-hidden">
        {/* Ensure the container has restricted width */}
        <span className="truncate w-full font-bold">
          {selectedData ? selectedData : "Choose File"}
        </span>
      </div>

      <Input
      id={id}
        type={type}
        multiple={multiple}
        name={name}
        className="hidden"
        onChange={onChange}
        accept={accept}
      />
    </Label>
  );
}
