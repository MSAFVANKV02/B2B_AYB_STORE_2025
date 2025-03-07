export const InitialValues = {
  product_name: '',
  mrp: undefined,
  product_sku: '',
  barcode: '',
  brand: '',
  categoryId:'',
  keywords: [],
  minimum_quantity: undefined,
  product_weight: undefined,
  product_owner:'',
  product_dimensions: {
    product_height: undefined,
    product_length: undefined,
    product_width: undefined,
  },
  tax_details:{
    // taxSlab: [],
    hsn_sac_number: 0,
    non_gst_goods:"no",
    calculation_types:"on_value",
    igst: undefined,
    central_tax: undefined,
    state_tax: undefined,
    // =====
    on_items_rate_details: [
      {
        greaterThan: 0,
        upto: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
      },
    ], 
    isCess: false,
    cess: undefined,
  },
  is_published:false,
  status: "",
  is_todays_deal: false,
  is_featured_product:false,
  description: '',
  
  // ===== File upload section =================
  gallery_image: [],
  thumbnails:[],
  // productImages: [],
  size_chart: "",
  // ===== price stock section =================

  basePrice:undefined,
  samplePrice:undefined,
  discount:undefined,
  discount_type:"",
  price_per_pieces:[],
  selectWise:"size",
  variations:[],

  // ===== shipping section =================
  is_cod:false,
  is_free_shipping:false,
  
}
// export const InitialValues = {
//   product_name: 'dasdas',
//   mrp: 132,
//   product_sku: 'adasd',
//   barcode: 'asdasd',
//   brand: 'asdas',
//   categoryId:'',
//   keywords: ["asda"],
//   minimum_quantity: 2,
//   product_weight: 2,
//   product_owner:'',
//   product_dimensions: {
//     product_height: 2,
//     product_length: 2,
//     product_width: 2,
//   },
//   tax_details:{
//     // taxSlab: [],
//     hsn_sac_number: 10,
//     non_gst_goods:"no",
//     calculation_types:"on_value",
//     igst: 10,
//     central_tax: 0,
//     state_tax: 0,
//     // =====
//     on_items_rate_details: [
//       {
//         greaterThan: 0,
//         upto: 0,
//         igst: 0,
//         cgst: 0,
//         sgst: 0,
//         cess: 0,
//       },
//     ], 
//     isCess: false,
//     cess: 2,
//   },
//   is_published:false,
//   status: "",
//   is_todays_deal: false,
//   is_featured_product:false,
//   description: '<p>sdasdasd</p>',
  
//   // ===== File upload section =================
//   gallery_image: ["sasdasd"],
//   thumbnails:["asdasd"],
//   // productImages: [],
//   size_chart: ["asdasd"],
//   // ===== price stock section =================

//   basePrice:2,
//   samplePrice:2,
//   discount:2,
//   discount_type:"",
//   price_per_pieces:[],
//   selectWise:"size",
//   variations:[],

//   // ===== shipping section =================
//   cod:false,
//   freeShipping:false,
  
// }
