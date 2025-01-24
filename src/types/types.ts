export interface ICoupon {
    id: string; // Primary key
    coupon_code: string; // Unique coupon code
    discount_type: "percentage" | "flat"; // Enum for discount type
    discount_amount: number; // Discount amount
    minimum_purchase_amount: number; // Minimum purchase amount
    start_date: Date; // Start date of the coupon
    expired_at: Date; // Expiration date of the coupon
    is_active: boolean; // Whether the coupon is active or not
    applicable_brand_id: string[]; // Foreign key(s) for applicable brand(s)
    applicable_category_id: string[]; // Foreign key(s) for applicable category(ies)
    applicable_product_id: string[]; // Foreign key(s) for applicable product(s)
    applicable_store_id: string[]; // Foreign key(s) for applicable store(s)
    applicable_seller_id: string[]; // Foreign key(s) for applicable seller(s)
    purchase_limit?: number; //
    createdAt: Date; // Date of creation
    updatedAt: Date; // Date of last update
  }
  