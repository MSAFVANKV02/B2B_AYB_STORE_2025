import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IProducts } from "@/types/productType";
import { ErrorMessage, Field } from "formik";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox, styled } from "@mui/material";
import SelectWise from "@/components/products/Select_Wise";
import AllNewProductsTable from "@/components/products/price section/All_new_Products_Table";
import PricePerPiecesComponent from "@/components/products/Price_Per_Pieces_Component";
import { useEffect } from "react";

type Props = {
  setFieldValue: any;
  values: IProducts;
  errors: any;
};

export default function PriceStockSectionPage({
  values,
  setFieldValue,
  errors,
}: Props) {
  console.log(errors, "error");
  console.log(values, "values");

  useEffect(() => {
    if (values.variations?.length > 0) {
      const updatedVariations = values.variations.map((variation) => {
        if (variation.details && variation.details.length > 0) {
          const updatedDetails = variation.details.map((detail) => ({
            ...detail,
            discount:
              detail.discount === 0 || !detail.discount
                ? values.discount
                : detail.discount,
          }));

          return { ...variation, details: updatedDetails };
        } else {
          return {
            ...variation,
            details: [{ discount: values.discount }], // If no details exist, create one
          };
        }
      });

      setFieldValue("variations", updatedVariations);
    }
  }, []);

  return (
    <div className="">
      <div
        className="lg:w-1/2 flex
     flex-col gap-4"
      >
        {/* ===== basePrice ===== */}
        <FormFieldGenal
          value={values.basePrice}
          title="Base Price"
          type="number"
          id="basePrice"
          name="basePrice"
          placeholder="Enter Price"
          fieldAs={Input}
          setFieldValue={setFieldValue}
        />
        {/* ===== samplePrice ===== */}
        <FormFieldGenal
          value={values.samplePrice}
          title="Sample Price"
          type="number"
          id="samplePrice"
          name="samplePrice"
          placeholder="Enter Sample Price"
          fieldAs={Input}
          setFieldValue={setFieldValue}

        />
        {/* ===== discount ===== */}
        <FormFieldGenal
          value={values.discount}
          title="Discount (% / flat)"
          id="discount"
          type="number"
          name="discount"
          placeholder="Enter Discount"
          fieldAs={Input}
          onChange={(e) => {
            let discountValue = parseFloat(e.target.value);

            // Ensure value is between 0 and 100
            if (discountValue < 0) discountValue = 0;
            if (discountValue > 100) discountValue = 100;
            setFieldValue("discount", discountValue);

            if (values.variations?.length > 0) {
              const updatedVariations = values.variations.map((variation) => {
                if (variation.details && variation.details.length > 0) {
                  const updatedDetails = variation.details.map((detail) => ({
                    ...detail,
                    discount:
                      detail.discount === 0 || !detail.discount
                        ? discountValue
                        : detail.discount,
                  }));

                  return { ...variation, details: updatedDetails };
                } else {
                  return {
                    ...variation,
                    details: [{ discount: discountValue }], // If no details exist, create one
                  };
                }
              });

              setFieldValue("variations", updatedVariations);
            }
          }}
        />
        {/* ===== discount type ===== */}
        <div className="flex justify-between md:flex-row flex-col gap-2 md:items-center">
          <Label className="text-sm text-textGray">Discount Type</Label>
          <Select
            value={values.discount_type}
            onValueChange={(value) => {
              setFieldValue("discount_type", value);
            }}
          >
            <SelectTrigger className="lg:w-3/4 p-6">
              <SelectValue placeholder="Discount Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flat">Flat</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* === */}
        {/* ===== Price per Pieces  =====
          ================================= */}
        <div className="flex lg:flex-row flex-col justify-between">
          <Label className="text-sm text-textGray">Price / pieces</Label>
          <div className="md:w-3/4 w-full">
            <PricePerPiecesComponent
              pricePerPieces={values.price_per_pieces}
              setFieldValue={setFieldValue}
              values={values}
            />
            <ErrorMessage
              name="pricePerPieces"
              component="span"
              className="text-red-500 text-xs"
            />
          </div>
        </div>

        {/* ===== select wise  =====
          ================================= */}
        <div className="flex lg:flex-row flex-col items-center justify-between">
          <Label className="text-sm text-textGray">Price / pieces</Label>
          <div className="lg:w-3/4 flex">
            <div className="flex items-center gap-2">
              <CustomCheckbox
                name="selectWise"
                id="selectWise-size"
                checked={values.selectWise === "size"}
                onChange={() =>
                  setFieldValue(
                    "selectWise",
                    values.selectWise === "size" ? "" : "size"
                  )
                }
              />
              <Label className="text-textGray" htmlFor="selectWise-size">
                Size wise
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <CustomCheckbox
                id="selectWise-bundle"
                name="selectWise"
                checked={values.selectWise === "bundle"}
                onChange={() =>
                  setFieldValue(
                    "selectWise",
                    values.selectWise === "bundle" ? "" : "bundle"
                  )
                }
              />
              <Label className="text-textGray" htmlFor="selectWise-bundle">
                Bundle wise
              </Label>
            </div>
          </div>
        </div>

        {/* ===== select wise ends =====
          ================================= */}
        {/* ===== select wise size starts =====
          ================================= */}
        <div className="">
          <SelectWise
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
          />
        </div>

        {/* select store ====
        ==================== */}
        {/* <div className="flex md:items-center gap-2 lg:flex-row flex-col justify-between">
          <Label className="text-textGray">Store</Label>
          <div className="lg:w-3/4 w-full">
            <StoreSelection values={values} setFieldValue={setFieldValue} />
            <ErrorMessage
              name="store"
              component="span"
              className="text-red-500 text-xs"
            />
          </div>
        </div> */}
      </div>

      {/* ======= All Selected Details In Table ======== */}
      <div className="flex justify-end mt-10 w-[90%]">
        <AllNewProductsTable values={values} setFieldValue={setFieldValue} />
      </div>
    </div>
  );
}

//  =================================================================

const CustomCheckbox = styled(Checkbox)({
  color: "#ccc", // Default color
  "&.Mui-checked": {
    color: "#5F08B1", // Color when checked
  },
});

type FormFieldGenalProps = {
  // children: React.ReactNode;
  className?: string;
  value: string | number | boolean | undefined;
  title: string; // Label for the field
  id: string;
  name: string;
  placeholder?: string;
  fieldAs?: React.ElementType;
  fieldClassName?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue?: (name: string, value: any) => void;

};
export function FormFieldGenal({
  className,
  value,
  title,
  id,
  name,
  placeholder,
  fieldAs,
  fieldClassName,
  type = "text", // default type is text
  onChange,
  setFieldValue
}: FormFieldGenalProps) {
  return (
    <div
      className={cn(
        "flex lg:flex-row flex-col lg:items-center gap-3 justify-between",
        className
      )}
    >
      <Label htmlFor={name} className="text-textGray">
        {title}
      </Label>
      <div className="flex flex-col lg:w-3/4 gap-2">
        <Field
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(` p-6`, fieldClassName)}
          type={type}
          as={fieldAs}
          value={value} // Bind field value to Formik
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log("New Cess Value:", e.target.value);
            const newValue = e.target.value;
            if (setFieldValue) {
              setFieldValue(name, newValue);
            }
            if (onChange) {
              onChange(e);
            }
          }}
        />
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
    </div>
  );
}
