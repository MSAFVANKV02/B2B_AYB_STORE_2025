import { StoreTypes } from "../storeTypes";


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
  isExtensionRequested: boolean
  rejectionReason:string;
  rentalHistory: any[]
  requestDate: string
  createdAt: string
  updatedAt: string
  __v: number
  approvalDate: string
  endDate: string
  startDate: string
  extension: RentTypeExtension
  }

  export interface RentTypeExtension {
    requestedDays: number
    volume: number
    pricePerUnit: number
    totalPrice: number
    isExtend: boolean
    action: string
    status: string
    _id: string
    requestDate: string
  }
  