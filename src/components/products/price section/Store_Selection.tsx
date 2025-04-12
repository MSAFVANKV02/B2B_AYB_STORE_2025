
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IProducts } from "@/types/productType";

type Props = {
    values: IProducts;
  setFieldValue: any;
}


export function StoreSelection({
    
    setFieldValue,
  
}:Props) {
  return (
  <div className="">
      <Select
      onValueChange={(value) =>{
        setFieldValue("store", value);
      }}
      >
      <SelectTrigger className="w-full py-6">
        <SelectValue placeholder="Select a Store" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Stores</SelectLabel>
          <SelectItem value="kozhikode">kozhikode</SelectItem>
          <SelectItem value="bangalore">bangalore</SelectItem>
          <SelectItem value="mumbai">mumbai</SelectItem>
          <SelectItem value="uae">UAE</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  )
}
