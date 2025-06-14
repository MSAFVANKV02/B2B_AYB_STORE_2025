import { IUserAddressType } from "./address_types";
import { Store } from "./final-product-types";

export type IOrderItem = {
  size: string; // Size of the product (e.g., "S")
  count: number; // Quantity of the product
  color: string; // Color of the product as a string (e.g., "red")
};

export type IFlatOrderItemDetailsType = {
  _id: string;
  product_id: string;
  stock_id: string;
  stock_sku: string;
  mrp: number;
  discount_type: string;
  product: Product;

  variation: ProductVariation;
  details:VariationDetail;

  store: IStoreOrder;
  order: IOrders;
  showVerifiedLabel: boolean;
};

export type IGroupedOrderDetails = {
  product_id: string;
  product_name: string;
  image: string;
  variationDetails: {
    color: string;
    size: string;
    quantity: number;
    selling_price: number;
  }[];
};


export type IFlatOrderItem = StoreItem & {
  store: IStoreOrder;
  order: IOrders;
  showVerifiedLabel: boolean;
};

// export const OrderStatusEnum = {
//   PENDING: "pending",
//   PROCESSING: "processing",
//   READYTOPICK: "ready_to_pickup",
//   SHIPPED: "shipped",
//   OUTFORDELIVERY: "out_for_delivery",
//   DELIVERED: "delivered",
//   CANCELLED: "cancelled",
//   RETURNED: "returned",
// };

export type IOrderStatus =
  | "pending"
  | "processing"
  | "ready_to_pickup"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type IReturnMode = "none" | "requested" | "replace" | "refund";

export type IReturnStatus =
  | "none"
  | "approved"
  | "rejected"
  | "cancelled"
  | "customer_return_initiated"
  | "recieved"
  | "refunded"
  | "replaced";

export type PaymentStatus = "Pending" | "Confirmed";
export type IFilterOrders =
  | "page"
  | "limit"
  | "status"
  | "store_id"
  | "customer_id"
  | "order_id"
  | "date_from"
  | "date_to"
  | "sort_by"
  | "sort_order";

// export type IOrder = {
//   id: number; // Unique identifier for the order
//   slug:string; // Order
//   productName: string; // Name of the product
//   subtotal: number; // Total amount for the product
//   orderDate: string; // Date when the order was placed
//   deliveryDate: string; // Date when the order was delivered
//   OrderStatus: OrderStatus;
//   deliveryStatus: "Delivered" | "Pending" | "Cancelled"; // Status of the delivery
//   paymentStatus: PaymentStatus; // Status of the payment
//   itemQuantity: IOrderItem[]; // Array of items in the order with details
// };
// ======================================================
// ======================================================
export type IOrdersType = {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  orders: IOrders[];
  orderStatusSummary: {
    all: number;
    pending: number;
    processing: number;
    ready_to_pickup: number;
    shipped: number;
    out_for_delivery: number;
    delivered: number;
    cancelled: number;
    returnedCount: number;
    
  };
};

export type IOrderTransactionDetails = {
  remarks: string;
  referral_doc: File | null;
  transaction_id: string;
  payment_type: "upi" | "bank";
  is_policy_verified?: boolean;
};

export type ICouponCode = {
  _id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT" | "";
  discountValue: number;
  maxDiscountAmount: number;
  minOrderAmount: number;
  expiryDate: Date;
  startDate: Date;
  usageLimit: number;
  isActive: boolean;
  applicableToAll: boolean;
  applicableStores: string[];
  applicableSellers: string[];
  applicableCategories: string[];
  applicableProducts: string[];
  applicableBrands: string[];
  applicablePurchaseType:
    | "ALL"
    | "FIRST_PURCHASE"
    | "REPEAT_CUSTOMER"
    | "BULK_PURCHASE";
  minPurchaseCount: number;
  minPurchaseAmountThreshold: number;
  maxUsagePerUser: number;
  createdBy: string;
  dbModel: string;
  coupon_owner: string;
  createdAt: string;
  updatedAt: string;
};

export type IOrders = {
  _id: string;
  order_id: string;
  customer_id: {
    _id: string;
    name: string;
  };
  coupon_code: ICouponCode | null;
  shipping_address: IUserAddressType;
  coupon: string;
  payment_method: "cod" | "razorpay" | "offline_payment";
  payment_status: string;
  createdAt: string;
  updatedAt: string;
  payment_status_updated_at: string;
  __v: number;
  payment_details: IOrderTransactionDetails;
  order_total: OrderTotal;
  store_orders: IStoreOrder[];
};

type OrderTotal = {
  total_products: number;
  sub_total: number;
  cart_discount: number;
  coupon_discount: number;
  parcel_charge: number;
  taxable_amount: number;
  gst: number;
  cess: number;
  total_amount: number;
};

export type IStoreOrder = {
  _id: string;
  invoice: string;
  main_order_id: string;
  store_order_id: string;
  customer_id: string;
  store_info: Store;
  order_status: IOrderStatus;
  // return_mode: IReturnMode;
  // refund_replace_status: IReturnStatus;
  is_returned: boolean;
  __v: number;
  order_total: OrderTotal;
  parcel_details: ParcelDetails;

  items: StoreItem[];

  return_reason: string;
  rejection_reason: string;
  refund_id: string;
  return_id: string;
  return_status_updated_at: Date;
  return_request_date: Date;
  return_action_date: Date;
  customer_returned_date: Date;
  recieved_date: Date;
  refunded_replaced_date: Date;
  cancelled_date: Date;

  ready_to_pick_date: Date;
  shipped_date: Date;
  out_for_delivery_date: Date;
  delivery_date: Date;

  createdAt: Date;
  updatedAt: Date;
};

type ParcelDetails = {
  shipping_method: "store_pickup"|"parcel_pickup"|"custom"|"";
  parcel_payment_method: string;
  parcel_weight: number | null;
  parcel_charge: number | null;
  parcel_price: number | null;
  parcel_quantity: number | null;
  tracking_url: string;
};

type StoreItem = {
  _id: string;
  product_order_id: string;
  product_id: string;
  stock_id: string;
  stock_sku: string;
  mrp: number;
  discount_type: string;
  product: Product;
};

type Product = {
  _id: string;
  product_owner: string;
  createdBy: string;
  brand: {
    _id: string;
    name: string;
    logo: string;
  };
  product_sku: string;
  barcode: string;
  keywords: string[];
  minimum_quantity: number;
  product_name: string;
  description: string;
  categoryId: {
    _id: string;
    name: string;
  };
  gst_rate: number;
  tax_details: TaxDetails;
  gallery_image: string[];
  thumbnails: string[];
  size_chart: string;
  mrp: number;
  basePrice: number;
  samplePrice: number;
  discount_type: string;
  discount: number;
  likes: any[];
  disLikes: any[];
  product_weight: number;
  product_dimensions: ProductDimensions;
  selectWise: string;
  bundle_details: any[];
  is_free_shipping: boolean;
  is_featured_product: boolean;
  is_todays_deal: boolean;
  is_best_selling: boolean;
  is_published: boolean;
  is_cod: boolean;
  price_per_pieces: PricePerPiece[];
  variations: ProductVariation[];
  status: string;
  isDeleted: boolean;
  non_published_stores: any[];
  non_featured_stores: any[];
  non_todays_deal_stores: any[];
  requested_stores: {
    by: string;
    request_count: number;
    _id: string;
  }[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  care_guid: string;
  product_details: string;
  special_features: string;
};

type TaxDetails = {
  hsn_sac_number: string;
  non_gst_goods: "yes" | "no";
  calculation_types: string;
  on_items_rate_details: {
    greaterThan: number | null;
    upto: number | null;
    igst: number | null;
    cgst: number | null;
    sgst: number | null;
    cess: number | null;
    _id: string;
  }[];
  igst: number;
  state_tax: number;
  central_tax: number;
  isCess: boolean;
  _id: string;
};

type ProductDimensions = {
  product_height: number;
  product_length: number;
  product_width: number;
  _id: string;
};

type PricePerPiece = {
  minPiece: number;
  maxPiece: number;
  purchase_Amount: number;
  _id: string;
};

type ProductVariation = {
  _id: string;
  image: string;
  colorCode: string;
  colorName: string;
  details: VariationDetail[];
};

type VariationDetail = {
  size: string;
  quantity: number;
  discount: number;
  bundleQuantity: number;
  selling_price: number;
  discount_amount: number;
  taxable_amount: number;
  gst: number;
  cess: number;
  total_price: number;
  returned_quantity: number;
};
