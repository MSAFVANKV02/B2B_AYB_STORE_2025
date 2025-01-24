export type IProducts = {
  _id?: number;
  product_owner?: "seller"|"admin"|"store";
  product_name: string;
  mrp: number;
  product_sku: string;
  barcode?: string;
  brand?: string;
  keywords?: string;
  minimum_quantity: number;
  product_weight?: number;
  product_dimensions: IProductDimensions;

  special_features?: string;
  care_guide?: string;
  description?: string;
  //   ===== tax  details ============
  tax_details: ITaxDetails;
//   taxSlab?: SelectOption[];
//   isCess: boolean;
  //   cess?: SelectOption[];
//   cess?: number;

  //   ===== tax  details ============

  is_featured_product?: boolean;
  is_published?: boolean;
  is_todays_deal?: boolean;
  is_best_selling?: boolean;

  //   files section
  gallery_image?: File[];
  thumbnails: File[];
  variations: {
    image: File;
    colorCode: string;
    colorName: string;
    sample: boolean;
    details: IVariants[];
  }[];
  sizeImages: File[];

  // === price stock ===
  base_price: number;
  sample_price: number;
  discount: number;
  discount_type: "flat" | "percentage";
  price_per_pieces: IPricePerPieces[];
  selectWise: "size" | "bundle";
  store: string;

  // ===== shipping section =================
  cod: boolean;
  freeShipping: boolean;

  // ==== after uses of user side =================
  rating_count?: number;
  total_ratings?: number;
  unit_soled?: number;
  avg_sale_per_customer?: number;
  return_rate?: number;
  search_count?: number;
  wishlist_count?: number;
  createdAt?: Date;
  updatedAt?: Date;

  //   admin side
  status: "approved" | "hold" | "reject";
  reject_reason?: string;
};
// ====== type ends =================
export type ITaxDetails = {
  taxSlab?: SelectOption[];
  isCess: boolean;
  //   cess?: SelectOption[];
  cess?: number;
};

export type IProductDimensions = {
  product_height: number;
  product_length: number;
  product_width: number;
};

export type IPricePerPieces = {
  _id?: string;
  min_Piece?: number;
  max_Piece?: number;
  discount: number;
};

export type IVariants = {
  _id?: string;
  size: string;
  // bundleSizes?:[{ size: string, quantity: number}];
  bundle_quantity?: number;
  stock: number;
  discount: number;
  selling_price: number;
  skuId: string;
};

export interface SelectOption {
  _id: string;
  name: string;
}
