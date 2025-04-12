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
    hsn_sac_number: undefined,
    non_gst_goods:"no",
    calculation_types:"on_value",
    igst: undefined,
    central_tax: undefined,
    state_tax: undefined,
    // =====
    on_items_rate_details: [
      {
        greaterThan: undefined,
        upto: undefined,
        igst: undefined,
        cgst: undefined,
        sgst: undefined,
        cess: undefined,
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
  sizeImages: [],
  // ===== price stock section =================

  base_price:undefined,
  sample_price:undefined,
  discount:undefined,
  discount_type:"",
  price_per_pieces:[],
  selectWise:"size",
  variations:[],

  // ===== shipping section =================
  cod:false,
  freeShipping:false,
  
}
