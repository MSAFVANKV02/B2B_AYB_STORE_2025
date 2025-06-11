import { Product as BaseProduct, Store } from "./final-product-types";

// ----------------- Custom Return-Specific IReturnDetail -----------------
export interface IReturnDetail {
  size: string;
  returned_quantity: number;
  replaced_quantity: number;
  discount: number;
  bundleQuantity: number;
  selling_price: number;
  discount_amount: number;
  taxable_amount: number;
  gst: number;
  cess: number;
  total_price: number;
  return_reason: string;
  return_reference_docs: string[];
  return_mode: string;
  remarks:string
  return_status: ReturnStatusEnum;
}

// ----------------- Overridden Product Type -----------------
export type ReturnProduct = Omit<BaseProduct, "variations"> & {
  variations: (Omit<BaseProduct["variations"][number], "details"> & {
    details: IReturnDetail[];
  })[];
};

// ----------------- Main Types -----------------
export interface IReturnOrderTypes {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  return_orders: IReturnOrders[];
}

export type IFilterReturnOrders =
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

export type ReturnStatusEnum =
  | "requested"
  | "refund_approved_by_store"
  | "return_approved_by_store"
  | "refund_approved_by_admin"
  | "refund_rejected_by_admin"
  | "rejected"
  | "customer_return_initiated"
  | "received"
  | "refunded"
  | "replaced";

export interface IReturnOrders {
  _id: string;
  return_id: string;
  main_order_id: MainOrderReturnType;
  store_order_id: string;
  order_against_id: string;
  customer_id: CustomerId;
  store_id: Store;
  items: ReturnItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MainOrderReturnType {
  _id: string
  shipping_address: ReturnShippingAddressType
}

export interface ReturnShippingAddressType {
  _id: string;
  name: string;
  mobile: number;
  email: string;
  street: string;
  city: string;
  building: string;
  landmark: string;
  state: string;
  country: string;
  zip: string;
  isDefault: boolean;
}

export interface CustomerId {
  _id: string
  businessName: string
  emailId: string
  buildingName: string
  street: string
  pinCode: string
  state: string
  country: string
  gstNumber: string
  proof: string
  proofType: string
  status: string
  isApproved: boolean
  userId: ReturnUserId
  createdAt: string
  updatedAt: string
  __v: number
  kycFeedback: string
}

export interface ReturnUserId {
  _id: string
  name: string
}

// Use overridden product type here
export interface ReturnItem {
  product_order_id: string;
  product_id: string;
  stock_id: string;
  _id: string;
  product: ReturnProduct;
}
