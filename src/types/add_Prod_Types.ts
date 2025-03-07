export interface IProdAddRoot {
    product_name: string
    mrp: number
    product_sku: string
    barcode: string
    brand: string
    categoryId: string
    keywords: string[]
    minimum_quantity: number
    product_weight: number
    product_dimensions: ProductDimensions
    description: string
    tax_details: TaxDetails
    is_featured_product: boolean
    is_todays_deal: boolean
    gallery_image: string[]
    thumbnails: string[]
    size_chart: string
    discount_type: string
    price_per_pieces: PricePerPiece[]
    selectWise: string
    variations: Variation[]
    is_cod: boolean
    is_free_shipping: boolean
    basePrice: number
    samplePrice: number
    discount: number
    // store: string
    status: string
  }
  
  export interface ProductDimensions {
    product_height: number
    product_length: number
    product_width: number
  }
  
  export interface TaxDetails {
    hsn_sac_number: number
    non_gst_goods: string
    calculation_types: string
    on_items_rate_details: OnItemsRateDetail[]
    isCess: boolean
  }
  
  export interface OnItemsRateDetail {
    greaterThan: number
    upto: number
    igst: number
    cgst: number
    sgst: number
    cess: number
  }
  
  export interface PricePerPiece {
    minPiece: number
    maxPiece: number
    discount: number
  }
  
  export interface Variation {
    image: string
    colorCode: string
    colorName: string
    sample: boolean
    details: Detail[]
  }
  
  export interface Detail {
    size: string
    bundleQuantity: number
    stock: number
    discount: number
    selling_price: number
    skuId: string
  }
  