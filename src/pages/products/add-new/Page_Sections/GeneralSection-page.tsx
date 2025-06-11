import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box, useMediaQuery } from "@mui/material";
import { cn } from "@/lib/utils";
import TiptapCareGuide from "@/components/text_editors/TiptapCareGuide";
// import Select, { MultiValue } from "react-select";
import { MySwitch } from "@/components/myUi/mySwitch";
import React, { ReactNode } from "react";
import { IProductDimensions, ITaxDetails } from "@/types/productType";

// import "react-tagsinput/react-tagsinput.css";
import TagInput from "@/components/global/tagInput";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NonGstGoodsDetails from "./gstGood_Details/Non_Gst_Goods_Details";
import CategorySelection from "./CategorySelection";
import BrandSelectTab from "@/components/global/brand-select";
import { IBrand } from "@/types/brandtypes";
import { ICategory } from "@/types/categorytypes";

// Define the type for form values
export interface GeneralFormValues {
  product_name: string;
  mrp: number;
  product_sku: string;
  categoryId:string | ICategory;
  barcode?: string;
  brand?: string | IBrand;
  keywords: string[];
  minimum_quantity: number;
  product_weight?: number;
  product_dimensions: IProductDimensions;
  dimensions?: string;
  tax_details: ITaxDetails;
  status: boolean;
  is_todays_deal: boolean;
  description: string;
  product_details: string;
  special_features: string;
  care_guid: string;

  is_featured_product: boolean;
}

//   ==== formik =========================
type Props = {
  setFieldValue: any;
  values: GeneralFormValues;
  errors: any;
};

export default function GeneralSectionPage({
  values,
  setFieldValue,
  errors
}: // errors
// errors,

Props) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // console.log(errors, "errors");
  // console.log(values, "values");

  const productFields: {
    id: keyof GeneralFormValues;
    name: keyof GeneralFormValues;
    title?: string;
    fileType?: string;
    placeholder: string;
    type?: React.ComponentProps<"input">["type"];
    render?: (data: any) => ReactNode;
  }[] = [
    {
      id: "product_name",
      title: "Product Name",
      name: "product_name",
      fileType: "text",
      placeholder: "Enter Product Name",
      type: "text",
    },
    {
      id: "product_sku",
      title: "SKU Id",
      name: "product_sku",
      fileType: "text",
      placeholder: "Enter SKU Id",
      type: "text",
    },
    {
      id: "barcode",
      title: "Barcode",
      name: "barcode",
      fileType: "text",
      placeholder: "Enter Barcode",
      type: "text",
    },
    {
      id: "mrp",
      title: "Product MRP",
      name: "mrp",
      fileType: "number",
      placeholder: "Enter Product MRP",
      type: "number",
    },
    {
      id: "brand",
      title: "Brand",
      name: "brand",
      fileType: "text",
      placeholder: "Enter Brand",
      type: "text",
      render: () => {
        return (
          <div className="flex justify-between lg:flex-row flex-col gap-3">
            <Label className="text-textGray text-sm">Brand</Label>
           <BrandSelectTab 
            setFieldValue={setFieldValue}
            values={values}
            errors={errors}
           />
          </div>
        );
      },
    },
    {
      id: "keywords",
      title: "Brand",
      name: "keywords",
      fileType: "text",
      placeholder: "Enter Keywords here",
      type: "text",
      render: () => {
        return (
          <div className="flex justify-between lg:flex-row flex-col gap-3">
            <Label className="text-textGray text-sm">KeyWords</Label>
            <TagInput
              tags={values.keywords ?? []}
              setTags={(updatedTags) => {
                setFieldValue("keywords", updatedTags);
              }}
            />
          </div>
        );
      },
    },
    // {
    //   id: "minimum_quantity",
    //   title: "Minimum Qty*",
    //   name: "minimum_quantity",
    //   fileType: "number",
    //   placeholder: "Enter Minimum Qty",
    // },
    {
      id: "product_weight",
      title: "Product product_weight in gm",
      name: "product_weight",
      fileType: "number",
      placeholder: "Enter Product product_weight in gm",
    },
    // {
    //   id: "product_dimensions.product_width",
    //   title:"Product product_weight in gm",
    //   name: "product_dimensions.product_width",
    //   fileType: "text",
    //   placeholder: "Enter Product product_weight in gm",
    // },
  ];

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: isLargeScreen ? "row" : "column",
      }}
      gap="13px"
    >
      <div className="md:w-3/4 w-full flex flex-col gap-3">
        {productFields.map((field) => (
          <div key={field.id}>
            {field.render ? (
              field.render({ values, setFieldValue })
            ) : (
              <FormFieldGenal
                value={values[field.id] as string}
                title={field.title ?? ""}
                id={field.id}
                name={field.name}
                type={field.fileType }
                placeholder={field.placeholder}
                setFieldValue={setFieldValue}
                fieldAs={Input}
              />
            )}
          </div>
        ))}

        {/* #Dimension ==== */}
        <div
          className={cn(
            "flex md:flex-row flex-col md:items-center gap-3 justify-between"
          )}
        >
          <Label htmlFor="dimension" className="text-textGray">
            Dimension (width / height / length)
          </Label>
          <div className="flex md:flex-row flex-col  md:w-3/4 gap-2">
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
                 type="number"
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
          onChange={(value) => {
            setFieldValue("description", value);
            // console.log(value)
          }}
        />
        {/* #text editor special_features ==== */}
        <TiptapCareGuide
          label="Special Features"
          careGuide={values.special_features ?? ""}
          onChange={(value) => {
            setFieldValue("special_features", value);
            // console.log(value)
          }}
        />

        {/* #text editor product_details ==== */}
        <TiptapCareGuide
          label="Product Details"
          careGuide={values.product_details ?? ""}
          onChange={(value) => {
            setFieldValue("product_details", value);
            // console.log(value)
          }}
        />
        {/* #text editor care_guid ==== */}
        <TiptapCareGuide
          label="Care Guid"
          careGuide={values.care_guid ?? ""}
          onChange={(value) => {
            setFieldValue("care_guid", value);
            // console.log(value)
          }}
        />

        {/* #Tax details ======= */}
        <FormFieldGenal
          title="HSN/SAC"
          id="tax_details.hsn_sac_number"
          name="tax_details.hsn_sac_number"
          placeholder="HSN/SAC"
          className={cn(``)}
          fieldClassName="w-[200px]"
          type="number"
          setFieldValue={setFieldValue}
          fieldAs={Input}
          extraTitle={
            <Link
              to={`https://services.gst.gov.in/services/searchhsnsac`}
              target="_blank"
              className="text-textMain text-sm font-semibold capitalize"
            >
              Chek HSN/SAC number
            </Link>
          }
          value={`${values.tax_details.hsn_sac_number}`} // Bind field value to Formik
        />
        {/* ==== #non_gst_goods ===== */}
        <FormFieldGenal
          title="Is non-GST Goods"
          defaultValue="no"
          select
          id="tax_details.non_gst_goods"
          name="tax_details.non_gst_goods"
          placeholder="Yes / No"
          className={cn(``)}
          fieldClassName=""
          fieldAs={Input}
          setFieldValue={setFieldValue}
          value={`${values.tax_details.non_gst_goods}`} // Bind field value to Formik
        />

        {/* ====  #Gst Goods Details ====== */}
        {values.tax_details.non_gst_goods === "no" && (
          <NonGstGoodsDetails values={values} setFieldValue={setFieldValue} />
        )}

        {/* #Cess ========== */}

        <FormFieldGenal
          title="CESS"
          reverseFlex={true}
          maxNumber={100}
          havePercentage
          extraTitle={
            <MySwitch
              id="tax_details.isCess"
              isOn={values.tax_details.isCess}
              handleToggle={() => {
                setFieldValue("tax_details.isCess", !values.tax_details.isCess);
                if (!values.tax_details.isCess)
                  setFieldValue("values.tax_details.cess", undefined);
              }}
            />
          }
          id="tax_details.cess"
          name="tax_details.cess"
          placeholder="Cess"
          className={cn(``)}
          type="number"
          fieldAs={Input}
          disabled={!values.tax_details.isCess}
          value={`${values.tax_details.cess}`} // Bind field value to Formik
          setFieldValue={setFieldValue} 
        />
        {/* #status toggle ========= */}
        <b>Status</b>
        <div className="flex justify-between">
          <Label htmlFor="is_featured_product" className="text-textGray">
            Featured product
          </Label>
          <div className="flex items-center justify-start md:w-3/4 gap-2">
            <MySwitch
              id="is_featured_product"
              isOn={values.is_featured_product}
              handleToggle={() =>
                setFieldValue(
                  "is_featured_product",
                  !values.is_featured_product
                )
              }
            />
          </div>
        </div>
        {/* #todays Deal============= */}
        <div className="flex justify-between">
          <Label htmlFor="is_todays_deal" className="text-textGray">
            Todays Deal
          </Label>
          <div className="flex items-center justify-start md:w-3/4 gap-2">
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
      <div className="flex-grow border rounded-sm p-4 space-y-5">
      <b>Product Category</b>
        {/* <hr /> */}

        <CategorySelection setFieldValue={setFieldValue} values={values} />
      </div>
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
  extraTitle?: React.ReactNode;
  select?: boolean;
  setFieldValue?: (name: string, value: any) => void;
  selectValue?: { name: string; value: ITaxDetails["calculation_types"] }[];
  defaultValue?: string;
  maxNumber?: number;
  havePercentage?: boolean;
  disabled?: boolean;
  reverseFlex?: boolean;
  titleSize?: "sm" | "lg" | "xs" | "xl";
  onChange?: (value: any) => void;
  showError?: boolean;
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
  type = "text",
  extraTitle,
  select,
  setFieldValue,
  selectValue,
  defaultValue,
  maxNumber,
  havePercentage,
  disabled,
  reverseFlex,
  titleSize,
  onChange,
}: FormFieldGenalProps) {
  const titleSizeAdd = (size?: string) => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      case "xs":
        return "text-xs";
      case "xl":
        return "text-xl";
      default:
        return "text-sm";
    }
  };

  return (
    <div
      className={cn(
        "flex md:flex-row flex-col gap-2 md:items-center justify-between",
        className
      )}
    >
      {title && (
        <Label
          htmlFor={name}
          className={`text-textGray ${titleSizeAdd(titleSize)}`}
        >
          {title}
        </Label>
      )}

      <div className="flex flex-col md:w-3/4 gap-2">
        <div
          className={cn(
            "flex items-center gap-3",
            reverseFlex ? "flex-row-reverse" : "flex-col lg:flex-row"
          )}
        >
          {select ? (
            <Select
              defaultValue={defaultValue}
              onValueChange={(value) => {
                if (setFieldValue) setFieldValue(name, value);
              }}
            >
              <SelectTrigger
                className={cn(` p-6 text-textGray`, fieldClassName)}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {selectValue?.map(({ name, value }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                )) || [
                  <SelectItem key="no" value="no">
                    No
                  </SelectItem>,
                  <SelectItem key="yes" value="yes">
                    Yes
                  </SelectItem>,
                ]}
                {/* <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem> */}
              </SelectContent>
            </Select>
          ) : (
            <div className={cn(`no-spinner w-full relative`, fieldClassName)}>
              <Field
                id={id}
                max={maxNumber}
                name={name}
                placeholder={placeholder}
                className={cn(`no-spinner p-6`, fieldClassName)}
                type={type}
                as={fieldAs}
                value={value}
                disabled={disabled}
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
                onInput={(e: any) => {
                  if (
                    maxNumber !== undefined &&
                    Number(e.currentTarget.value) > maxNumber
                  ) {
                    e.currentTarget.value = maxNumber.toString(); // Reset input to maxNumber
                  }
                }}
              />
              {type === "number" && havePercentage && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  %
                </span>
              )}
            </div>
          )}

          {extraTitle && <div>{extraTitle}</div>}
        </div>
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
    </div>
  );
}
