import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box, useMediaQuery } from "@mui/material";
import { cn } from "@/lib/utils";
import TiptapCareGuide from "@/components/text_editors/TiptapCareGuide";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { MySwitch } from "@/components/myUi/mySwitch";
import { useState } from "react";
import { customStyles } from "@/components/products/Custom_styles";
import { IProductDimensions, ITaxDetails } from "@/types/productType";
// Define the type for form values
export interface GeneralFormValues {
  product_name: string;
  mrp: number;
  product_sku: string;
  barcode?: string;
  brand?: string;
  keywords?: string;
  minimum_quantity: number;
  product_weight?: number;

  // height?: number;
  // length?: number;
  // width?: number;
  product_dimensions: IProductDimensions;

  dimensions?: string;
  tax_details:ITaxDetails;
  // taxSlab?: SelectOption[];
  // isCess: boolean;
  // cess?: SelectOption[];
  status: boolean;
  is_todays_deal: boolean;
  description?: string;
  
  is_featured_product: boolean;
}

//   ==== formik =========================
type Props = {
  setFieldValue: any;
  values: GeneralFormValues;
  errors: any;
};

const animatedComponents = makeAnimated();
const taxSlabs: SelectOption[] = [
  { _id: "1", name: "5%" },
  { _id: "2", name: "12%" },
  { _id: "3", name: "18%" },
  { _id: "4", name: "28%" },
];
interface SelectOption {
  _id: string;
  name: string;
}

export default function GeneralSectionPage({
  values,
  setFieldValue,
  // errors,
}: Props) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // const [selectedCessOptions, setSelectedCessOptions] = useState<
  //   MultiValue<SelectOption>
  // >(values.cess || []);
  // const [selectedTaxSlab, setSelectedTaxSlab] = useState<
  //   MultiValue<SelectOption>
  // >(values.taxSlab || []);

  // =========================================
//   const [selectedCessOptions, setSelectedCessOptions] = useState<
//   MultiValue<SelectOption>
// >(values.tax_details.cess || []);
const [selectedTaxSlab, setSelectedTaxSlab] = useState<
  MultiValue<SelectOption>
>(values.tax_details.taxSlab || []);

  // console.log(errors, "errors");
  // console.log(values, "values");


  return (
    <Box display="flex"  sx={{
      flexDirection:isLargeScreen ?"row":"column"
    }} gap="13px">
      <div className="md:w-3/4 w-full flex flex-col gap-3">
        <FormFieldGenal
          value={values.product_name}
          title="Product Name"
          id="product_name"
          name="product_name"
          placeholder="Enter Product Name"
          fieldAs={Input}
        />

        {/* #sku ==== */}
        <FormFieldGenal
          value={values.product_sku}
          title="SKU id"
          id="product_sku"
          name="product_sku"
          placeholder="SKU ID"
          fieldAs={Input}
        />
        {/* #barcode ==== */}
        <FormFieldGenal
          value={values.barcode}
          title="Barcode"
          id="barcode"
          name="barcode"
          placeholder="Barcode"
          fieldAs={Input}
        />

        {/* #mrp ==== */}
        <FormFieldGenal
          value={values.mrp}
          title="Product MRP"
          id="mrp"
          name="mrp"
          type="number"
          placeholder="Product MRP"
          fieldAs={Input}
        />

        {/* #Brand ==== */}
        <FormFieldGenal
          value={values.brand}
          title="Brand"
          id="brand"
          name="brand"
          placeholder="Brand"
          fieldAs={Input}
        />

        {/* #keywords ==== */}
        <FormFieldGenal
          value={values.keywords}
          title="Search Keywords"
          id="keywords"
          name="keywords"
          placeholder="Keywords"
          fieldAs={Input}
        />

        {/* #minimum_quantity ==== */}
        <FormFieldGenal
          value={values.minimum_quantity}
          title="Minimum Qty*"
          id="minimum_quantity"
          name="minimum_quantity"
          placeholder="Quantity"
          fieldAs={Input}
        />

        {/* #product_weight ==== */}
        <FormFieldGenal
          value={values.product_weight}
          title="Product product_weight in gm"
          id="product_weight"
          name="product_weight"
          placeholder="product_weight"
          fieldAs={Input}
        />

        {/* #Dimension ==== */}
        <div className={cn("flex items-center justify-between")}>
          <Label htmlFor="dimension" className="text-textGray">
            Dimension (width / height / length)
          </Label>
          <div className="flex  md:w-3/4 gap-2">
            <div className="w-full">
              <Field
                id="product_dimensions.product_width"
                name="product_dimensions.product_width"
                placeholder="width"
                type="number"
                className={cn(` p-6`)}
                as={Input}
                value={values.product_dimensions.product_width} // Bind field value to Formik
              />
              <ErrorMessage
                name="product_dimensions.product_width"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>

            {/* #Height */}
            <div className="w-full">
              <Field
                id="product_dimensions.product_height"
                name="product_dimensions.product_height"
                placeholder="Height"
                type="number"
                className={cn(` p-6`)}
                as={Input}
                value={values.product_dimensions.product_height} // Bind field value to Formik
              />
              <ErrorMessage
                name="product_dimensions.product_height"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>

            {/* #Height */}
            <div className="w-full">
              <Field
                id="product_dimensions.product_length"
                name="product_dimensions.product_length"
                placeholder="product_length"
                className={cn(` p-6`)}
                as={Input}
                value={values.product_dimensions.product_length} // Bind field value to Formik
              />
              <ErrorMessage
                name="product_dimensions.product_length"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* #text editor description ==== */}
        <TiptapCareGuide
          label="Description"
          careGuide={values.description ?? ""}
          onChange={(value) => console.log(value)}
        />

        {/* #Tax details ======= */}

        <b>Tax details</b>
        <div className="flex justify-between w-full mb-10">
          <Label htmlFor="tax_details.taxSlab" className="text-textGray">
            Tax Slab
          </Label>
          <div className="w-3/4 flex flex-col gap-1">
            <Select
              isMulti
              components={animatedComponents}
              name="tax_details.taxSlab"
              className=""
              styles={customStyles}
              value={selectedTaxSlab}
              placeholder="Select tax slab"
              closeMenuOnSelect={false}
              options={taxSlabs} // assuming categories is an array of SelectOption
              getOptionLabel={(e: SelectOption) => e.name} // Explicitly type 'e' as SelectOption
              getOptionValue={(e: SelectOption) => e._id} // Explicitly type 'e' as SelectOption
              onChange={(selected: MultiValue<SelectOption>) => {
                // console.log(selected);
                const selectedOptions = selected.map((option) => option);
                setSelectedTaxSlab(selectedOptions);

                setFieldValue("tax_details.taxSlab", selectedOptions);
              }}
            />
               <ErrorMessage
            name="tax_details.taxSlab"
            component="span"
            className="text-red-500 text-xs"
          />
          </div>
       
        </div>

        {/* #Cess ========== */}
        <div className="flex justify-between w-full mb-10">
          <Label htmlFor="tax_details.cess" className="text-textGray">
            CESS
          </Label>
          <div className="w-3/4 flex ">
            <MySwitch
              id="tax_details.cess"
              isOn={values.tax_details.isCess}
              handleToggle={() => {
                setFieldValue("tax_details.isCess", !values.tax_details.isCess);
                if (!values.tax_details.isCess) setFieldValue("values.tax_details.cess", []);
              }}
            />
            <div className="w-full">
            <Field
                id="tax_details.cess"
                name="tax_details.cess"
                placeholder="Cess"
                className={cn(` p-6 ml-3`)}
                type="number"
                as={Input}
                disabled={!values.tax_details.isCess}
                value={values.tax_details.cess} // Bind field value to Formik
              />
             
              {/* <Select
                isMulti
                components={animatedComponents}
                className="w-full pl-3"
                styles={customStyles}
                placeholder="Select Cess"
                isDisabled={!values.tax_details.isCess}
                value={selectedCessOptions}
                closeMenuOnSelect={false}
                options={taxSlabs}
                getOptionLabel={(e: SelectOption) => e.name}
                getOptionValue={(e: SelectOption) => e._id}
                onChange={(selected: MultiValue<SelectOption>) => {
                  // console.log(selected);
                  // const selectedNames = selected.map((option) => option.name); // Extract names
                  // const selectedIds = selected.map((option) => option._id); // Extract names
                  const selectedOptions = selected.map((option) => option);
                  setSelectedCessOptions(selectedOptions);

                  setFieldValue("tax_details.cess", selectedOptions); // Save only the names
                }}
              /> */}
              <ErrorMessage
                name="tax_details.cess"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* #status toggle ========= */}
        <b>Status</b>
        <div className="flex justify-between">
          <Label htmlFor="is_featured_product" className="text-textGray">
            is_featured_product
          </Label>
          <div className="flex items-center justify-start w-3/4 gap-2">
            <MySwitch
              id="is_featured_product"
              isOn={values.is_featured_product}
              handleToggle={() => setFieldValue("is_featured_product", !values.is_featured_product)}
            />
          </div>
        </div>
        {/* #todays Deal============= */}
        <div className="flex justify-between">
          <Label htmlFor="is_todays_deal" className="text-textGray">
            Todays Deal
          </Label>
          <div className="flex items-center justify-start w-3/4 gap-2">
            <MySwitch
              id="is_todays_deal"
              isOn={values.is_todays_deal}
              handleToggle={() =>
                setFieldValue("is_todays_deal", !values.is_todays_deal)
              }
            />
          </div>
        </div>
      </div>

      {/* ================  Category Selection =====================
      ============================================================== */}
      <div className="flex-grow ">Category</div>
    </Box>
  );
}

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
}: FormFieldGenalProps) {
  return (
    <div className={cn("flex md:flex-row flex-col gap-2 md:items-center justify-between", className)}>
      <Label htmlFor={name} className="text-textGray">
        {title}
      </Label>
      <div className="flex flex-col md:w-3/4 gap-2">
        <Field
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(` p-6`, fieldClassName)}
          type={type}
          as={fieldAs}
          value={value} // Bind field value to Formik
        />
        <ErrorMessage name={name} component="span" className="text-red-500 text-xs" />
      </div>
    </div>
  );
}
