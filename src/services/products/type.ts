export interface IRequestProductType {
    request_type?: "new_stock"|"stock_transfer"
    source_store: string
    destination: string
    product_details: ProductDetail[]
  }
  
  export interface ProductDetail {
    product: string
    variant_details: VariantDetail[]
  }
  
  export interface VariantDetail {
    variant_id:string;
    variant_name: string;
    image: string
    colorCode: string
    colorName: string
    sample: string
    size_details: SizeDetail[]
  }
  
  export interface SizeDetail {
    size: string
    discount_type: string
    bundle_quantity?: number
    discount: number
    selling_price: number
    variant_sku: string
    stock: number
  }
  