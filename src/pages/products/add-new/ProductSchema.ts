import * as Yup from "yup";

// Define validation schemas for each section
export const GeneralSchema = Yup.object({
  product_name: Yup.string()
    .min(1, "Name is required")
    .required("Name is required"),
  mrp: Yup.number()
    .positive("MRP must be greater than 0")
    .required("MRP is required"),
  product_sku: Yup.string().min(1, "SKU is required").required("SKU is required"),
  barcode: Yup.string().optional(),
  brand: Yup.string().required("Brand is required"),
  keywords: Yup.string().optional(),
  minimum_quantity: Yup.number()
    .min(1, "Minimum Qty must be at least 1")
    .required("Minimum Qty is required"),
  product_weight: Yup.number()
    .min(1, "Minimum product_weight must be at least 1g")
    .required("Product product_weight is required"),
  // height: Yup.string().required("Height is required"),
  // length: Yup.string().required("Length is required"),
  // width: Yup.string().required("Width is required"),
  product_dimensions: Yup.object({
    product_height: Yup.number()
      .positive("Height must be a positive number")
      .required("Height is required"),
    product_length: Yup.number()
      .positive("Length must be a positive number")
      .required("Length is required"),
    product_width: Yup.number()
      .positive("Width must be a positive number")
      .required("Width is required"),
  }).required("Product dimensions are required"),

  // ========= tax details starts==========================
  tax_details: Yup.object({
    taxSlab: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().required("ID is required"),
        name: Yup.string().required("Name is required"),
      })
    )
    .min(1, "At least one tax slab must be selected"),
    isCess: Yup.boolean().default(false),
    //   cess: Yup.array().when("isCess", (isCess, schema) => {
    //     return isCess ? schema.required("Cess is required") : schema.optional();
    //   }),
    // cess: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       _id: Yup.string().required("Cess ID is required"),
    //       name: Yup.string().required("Cess name is required"),
    //     })
    //   )
    //   .when("isCess", {
    //     is: true,
    //     then: (schema) =>
    //       schema
    //         .min(1, "At least one Cess must be selected")
    //         .required("Cess is required"),
    //     otherwise: (schema) => schema.optional(),
    //   }),
    cess: Yup.number()
  .when("isCess", {
    is: true,
    then: (schema) =>
      schema
        .positive("Cess must be a positive number")
        .required("Cess is required"),
    otherwise: (schema) => schema.optional(),
  }),

  }),
  //========= tax details Ends ==========================

  isCess: Yup.boolean().default(false),
  //   cess: Yup.array().when("isCess", (isCess, schema) => {
  //     return isCess ? schema.required("Cess is required") : schema.optional();
  //   }),

  status: Yup.boolean().default(false),
  //   is_todays_deal: Yup.boolean().default(false),
  //   is_featured_product: Yup.boolean().default(false),
  description: Yup.string().optional(),
  
});
// Combined schema

export const FilesSchema = Yup.object({
  gallery_image: Yup.array()
    .min(1, "Must add Gallery Image")
    .required("Gallery Images are required"),
  thumbnails: Yup.array()
    .min(1, "Must add thumbnail")
    .required("Must add thumbnail"),
  // productImages: Yup.array().min(1, "Must add Product Image").required("Product Images are required"),
  variations: Yup.array()
    .of(
      Yup.object({
        colorCode: Yup.string().required("Color Code is required"),
        colorName: Yup.string().required("Color Name is required"),
        image: Yup.mixed().required("Image is required"),
      })
    )
    .min(1, "At least one variation is required")
    .required("Variations are required"),
  sizeImages: Yup.array()
    .min(1, "Must add Size Images")
    .required("Size Images are required"),
});

export const PriceStockSchema = Yup.object({
  // Base Price
  base_price: Yup.number()
    .nullable()
    .min(0, "Base Price must be a positive number")
    .required("Base Price is required"),

  // Sample Price
  sample_price: Yup.number()
    .nullable()
    .min(0, "Sample Price must be a positive number")
    .required("Sample Price is required"),

  // Discount
  discount: Yup.number()
    .nullable()
    .min(0, "Discount must be a positive number")
    .max(100, "Discount cannot be more than 100%")
    .required("Discount is required"),

  // Discount Type
  discount_type: Yup.string()
    .oneOf(
      ["flat", "percentage"],
      "Discount type must be either 'flat' or 'percentage'"
    )
    .required("Discount Type is required"),

  // Price per Pieces
  pricePerPieces: Yup.array()
    .min(1, "At least one price per piece is required")
    .required("Price per Pieces is required"),

  // Select Wise (either 'size' or 'bundle')
  selectWise: Yup.string()
    .oneOf(["size", "bundle"], "Select a valid option: 'size' or 'bundle'")
    .required("Select Wise is required"),

  // Store Selection
  store: Yup.string().required("Store selection is required"),

  // Variations (details array validation)
  variations: Yup.array()
    .of(
      Yup.object({
        colorCode: Yup.string().required("Color Code is required"),
        colorName: Yup.string().required("Color Name is required"),
        image: Yup.mixed().required("Image is required"),
        details: Yup.array().of(
          Yup.object({
            // size: Yup.string().required("Size is required"),
            stock: Yup.number()
              .min(0, "Stock must be a positive number")
              .required("Stock is required"),
            selling_price: Yup.number()
              .min(0, "MRP must be a positive number")
              .required("MRP is required"),
            // discount: Yup.number()
            //   .min(0, "Discount must be a positive number")
            //   .max(100, "Discount cannot be more than 100%")
            //   .required("Discount is required"),
            skuId: Yup.string().optional()
          })
        ),
      })
    )
    .min(1, "At least one variation is required")
    .required("Variations are required"),
});

// export const ShippingSectionSchema = Yup.object({
//   code:Yup.boolean().default(false),
//   freeShipping:Yup.boolean().default(false),

// })

export const getValidationSchema = (step: number) => {
  switch (step) {
    case 1:
      return GeneralSchema;
    case 2:
      return FilesSchema;
    case 3:
      return PriceStockSchema;
      case 4:
        // Combine all schemas for a comprehensive validation
        return GeneralSchema.concat(FilesSchema).concat(PriceStockSchema);
    // Add cases for other schemas when implementing PriceStockSectionPage and ShippingSectionPage
  }
};
