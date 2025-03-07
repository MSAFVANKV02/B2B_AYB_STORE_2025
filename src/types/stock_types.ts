import { IProducts } from "./productType"
import { StoreTypes } from "./storeTypes"

export interface IStockType {
    _id: string
    request_type: string
    source_store: StoreTypes
    destination: string
    product_details: ProductDetail[];
    status: string
    history: History[]
    parcel_details: any[]
    createdAt: string
    updatedAt: string
    __v: number
  }

  export interface ProductDetail {
    product: IProducts
    variant_details: VariantDetail[]
    _id: string
  }

  export interface VariantDetail {
    image: string
    color: string
    colorCode: string
    size_details: SizeDetail[]
    _id: string
  }
  
  export interface SizeDetail {
    size: string
    discount_type: string
    discount: number
    selling_price: number
    variant_sku: string
    stock: number
    stock_threshold: number
    _id: string
  }

  export interface History {
    status: string
    product_details: ProductDetail2[]
    updatedBy: string
    _id: string
    timestamp: string
  }
  
  export interface ProductDetail2 {
    product: string
    quantity: number
    _id: string
  }