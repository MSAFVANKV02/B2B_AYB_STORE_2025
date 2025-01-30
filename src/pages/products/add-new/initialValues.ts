export const InitialValues = {
    product_name: '',
    mrp: undefined,
    product_sku: '',
    barcode: '',
    brand: '',
    keywords: '',
    minimum_quantity: undefined,
    product_weight: undefined,
    product_owner:'',
    // height: undefined,
    // length: undefined,
    // width:undefined,
    product_dimensions: {
      product_height: undefined,
      product_length: undefined,
      product_width: undefined,
    },
    // dimensions: '',
    tax_details:{
      taxSlab: [],
      isCess: false,
      cess: undefined,
    },
// isCess: false,
//     cess: [],
//     taxSlab: [],
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
    // variations: [
    //   {
    //     colorCode: '',
    //     colorName: '',
    //     image: null,
    //     details: [{ size: '', stock: undefined, mrp: undefined, selling_price: undefined }],
    //   },
    // ],

    // ===== shipping section =================
    cod:false,
    freeShipping:false,
    
  }
 