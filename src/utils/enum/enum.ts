export const DiscountTypeEnum = {
  NONE: "NONE",
  PERCENTAGE: "PERCENTAGE",
  FLAT: "FIXED_AMOUNT",
};

export const CouponTypeEnum = {
  ALL: "ALL",
  FIRST_PURCHASE: "FIRST_PURCHASE",
  REPEAT_CUSTOMER: "REPEAT_CUSTOMER",
  BULK_PURCHASE: "BULK_PURCHASE",
};
export const OwnerEnum = {
  INHOUSE: "INHOUSE",
  SELLER: "SELLER",
  STORE: "STORE",
  STORE_SELLER: "STORE_SELLER",
};

export const UserRolesEnum = {
  SELLER: "Seller",
  STORE: "Store",
  ADMIN: "admin",
  STORE_SELLER: "STORE_SELLER",
  CUSTOMER: "customer",
};

export const PurchaseTypeEnum = {
  NORMAL: "normal",
  BUNDLE: "bundle",
  SAMPLE: "sample",
};
// -- Product Tax Calculation Type -- //
export const TaxCalculationTypeEnum = {
  ON_ITEM_RATE: "on_item_rate",
  ON_VALUE: "on_value",
};
export const PaymentMethodsEnum = {
  COD: "cod",
  OFFLINE: "offline_payment",
  RAZORPAY: "razorpay",
};

export const PaymentTypeEnum = {
  UPI: "upi",
  BANK: "bank",
};


export const PaymentModesEnum = {
  ORDER: "ORDER_PAYMENT", // Customer to Platform
  SELLER: "SELLER_PAYOUT", // Platform to Seller
  STORE: "STORE_PAYOUT", // Platform to Store
  REFUND: "REFUND", // Platform to Customer
  PLATFORM: "PLATFORM_EARNING", // Commission/fees
  RENT: "RENT_PAYMENT", // Store to Platform
  ADJUSTMENT: "ADJUSTMENT", // Manual adjustment if needed
};

export const PaymentStatusEnum = {
  PENDING: "pending",
  UNPAID: "un-paid",
  PAID: "paid",
  PARTIAL: "partially_paid",
  REFUNDED: "refunded",
  FAILED:'failed'
};

export const ShippingMethodsEnum = {
  STORE_PICKUP: "store_pickup",
  PARCEL: "parcel_pickup",
  CUSTOM: "custom",
};

export const ParcelPaymentMethodsEnum = {
  TOPAY: "to_pay",
  PAY: "pay",
};

export const OrderStatusEnum = {
  PENDING: "pending",
  PROCESSING: "processing",
  READYTOPICK: "ready_to_pickup",
  SHIPPED: "shipped",
  OUTFORDELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};
export const ReturnModeEnum = {
  NONE: "none",
  REPLACE: "replace",
  REFUND: "refund",
};

export const ReturnStatusEnum = {
  REQUESTED: "requested",
  REFUND_APPROVED_BY_STORE: "refund_approved_by_store",
  RETURN_APPROVED_BY_STORE: "return_approved_by_store",
  REFUND_APPROVED_BY_ADMIN: "refund_approved_by_admin",
  REFUND_REJECTED_BY_ADMIN: "refund_rejected_by_admin",
  REJECTED: "rejected",
  CUSTOMER_RETURN_INITIATED: "customer_return_initiated",
  RECIEVED: "received",
  REFUNDED: "refunded",
  REPLACED: "replaced",
};

export const NotificationPreferencesEnum = {
  OTP_UPDATES: "otp_updates",
  AUTH_UPDATES: "auth_updates",
  ORDER_UPDATES: "order_updates",
  PAYMENT_UPDATES: "payment_updates",
  INVOICE: "invoice",
  PROMOTIONS: "promotions",
  INVENTORY_ALERTS: "inventory_alerts",
  SYSTEM: "system_notifications",
};
