import { IProducts } from "@/types/productType";
import { Label } from "../ui/label";

import { useState } from "react";
import BundleCreation from "../size/Bundle_Creation";
import SizeSelectTab from "../global/size-select";
import BundleSizeSelect from "../global/bundle-size-select";

type Props = {
  setFieldValue: (field: string, value: any) => void;
  values: IProducts;
  errors: any;
};

export default function SelectWise({ setFieldValue, values, errors }: Props) {
  // selee
  const [newBundle, setBundle] = useState(false);

  return (
    <div>
      {values.selectWise === "size" ? (
        <div className="flex justify-between md:flex-row flex-col md:items-center gap-2 w-full relative">
          <Label htmlFor="size" className="text-textGray">
            Select size
          </Label>
          <div className=" md:w-3/4">
            <div className="flex gap-3 md:flex-row flex-col md:items-center w-full">
              <SizeSelectTab
                className="w-full"
                setFieldValue={setFieldValue}
                values={values}
              />
            </div>
          </div>

          {/* add new sizes */}
        </div>
      ) : (
        <div className="flex justify-between items-center w-full relative">
          <Label htmlFor="size" className="text-textGray">
            Select Bundle
          </Label>
          <div className=" w-3/4 gap-3 items-center">
            <BundleSizeSelect
              className="w-full"
              setFieldValue={setFieldValue}
              values={values}
            />

            <div className="absolute top-14 -right-0 z-50">
              <BundleCreation
                isOpen={newBundle}
                onClose={() => setBundle(false)}
              />
            </div>
          </div>
        </div>
      )}
      {<span className="text-red-500 text-xs">{errors.variations}</span>}
    </div>
  );
}
