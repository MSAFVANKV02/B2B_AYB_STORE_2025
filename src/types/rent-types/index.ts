import { StoreTypes } from "../storeTypes";

export interface IRentTypesDummy {
    seller_name: string;
    space_m3: number;
    start_date: string;
    end_date: string;
    total_amount: string;
    days_remaining: string; // "5 Days" or "10 Days Overdue"
    status: "Received" | "Overdue";
    invoice: {
      print: boolean;
      view: boolean;
    };
  }


  export const PaymentStatusEnum = {
    PENDING: "pending",
    PAID: "paid",
    NONE: "none",
  } as const;
  
  export type PaymentStatusType = (typeof PaymentStatusEnum)[keyof typeof PaymentStatusEnum];
  
  export const RentStatusEnum = {
    PENDING: "pending",
    APPROVED: "approved",
    ACTIVE: "active",
    EXPIRED: "expired",
    REJECTED: "rejected",
    CANCELLED: "cancelled",
    VACATEREQUESTED: "vacate_requested",
    VACATED: "vacated",
    VACATEREJECTED: "vacate_rejected",
  } as const;
  
  export type RentStatusType = (typeof RentStatusEnum)[keyof typeof RentStatusEnum];
  
  

  export interface IRentTypes {
    _id: string
    storeId: StoreTypes
    sellerId: StoreTypes
    volume: number
    requestedDays: number
    pricePerUnit: number
    totalPrice: number
    status: RentStatusType
    paymentStatus: PaymentStatusType
    requestDate: string
    extensionRequests: any[]
    createdAt: string
    updatedAt: string
    __v: number
  }