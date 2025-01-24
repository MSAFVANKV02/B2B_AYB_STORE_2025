export const InitialValues = {
    product_name: '',
    mrp: 0,
    product_sku: '',
    barcode: '',
    brand: '',
    keywords: '',
    minimum_quantity: 0,
    product_weight: 0,
    product_owner:'',
    // height: 0,
    // length: 0,
    // width:0,
    product_dimensions: {
      product_height: 0,
      product_length: 0,
      product_width: 0,
    },
    // dimensions: '',
    tax_details:{
      taxSlab: [],
      isCess: false,
      cess: null,
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

    base_price:null,
    sample_price:null,
    discount:null,
    discount_type:"",
    price_per_pieces:[],
    selectWise:"size",
    store:"",
    variations:[],
    // variations: [
    //   {
    //     colorCode: '',
    //     colorName: '',
    //     image: null,
    //     details: [{ size: '', stock: 0, mrp: 0, selling_price: 0 }],
    //   },
    // ],

    // ===== shipping section =================
    cod:false,
    freeShipping:false,
    
  }
 