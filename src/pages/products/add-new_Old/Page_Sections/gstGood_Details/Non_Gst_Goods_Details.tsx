import { cn } from "@/lib/utils";
import { FormFieldGenal, GeneralFormValues } from "../GeneralSection-page";
import { Input } from "@/components/ui/input";
import GstOnItemsRate from "./Gst_On_Items_Rate";
import { useEffect } from "react";

type Props = {
  values: GeneralFormValues;
  setFieldValue: (name: string, value: any) => void;
};

const NonGstGoodsDetails = ({ values, setFieldValue }: Props) => {

  useEffect(() => {
    if (values.tax_details.calculation_types === "on_value") {
      setFieldValue("tax_details.on_items_rate_details", [
        {
          greaterThan: null,
          upto: null,
          igst: null,
          cgst: null,
          sgst: null,
          cess: null,
        },
      ]);
    }
  }, [values.tax_details.calculation_types, setFieldValue]);
  return (
    <div className="space-y-3">
      <FormFieldGenal
        title="Calculation type"
        defaultValue="on_value"
        select
        selectValue={[
          { name: "On Value", value: "on_value" },
          { name: "On Item rate ", value: "on_item_rate" },
        ]}
        id="tax_details.calculation_types"
        name="tax_details.calculation_types"
        placeholder="Calculation type"
        className={cn(``)}
        fieldClassName=""
        fieldAs={Input}
        setFieldValue={setFieldValue}
        value={`${values.tax_details.calculation_types}`} // Bind field value to Formik
      />
      {values.tax_details.calculation_types === "on_value" ? (
        <FormFieldGenal
          title="IGST"
          maxNumber={100}
          id="tax_details.igst"
          name="tax_details.igst"
          setFieldValue={setFieldValue}
          placeholder="IGST"
          className={cn(``)}
          fieldClassName="w-[200px]"
            havePercentage
          type="number"
          fieldAs={Input}
          extraTitle={
            <div className="flex flex-col text-xs gap-2 text-textGray">
              <span>Central Tax: <b>{values.tax_details.igst && values.tax_details.igst / 2 || 0}%</b> </span>
              <span>State Tax: <b>{values.tax_details.igst && values.tax_details.igst / 2 || 0}%</b></span>
            </div>
          }
          value={`${values.tax_details.igst}`} // Bind field value to Formik
        />
      ) : (
       <GstOnItemsRate 
        setFieldValue={setFieldValue}
        values={values} 
       />
      )}
    </div>
  );
};

export default NonGstGoodsDetails;
