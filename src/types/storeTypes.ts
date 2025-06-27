export type StoreTypes = {
  bankDetails: BankDetails
  _id: string
  role: string
  createdBy: string
  subscription: boolean
  rentedSellers:string[];
  mobileVerified: boolean
  isRegistered: boolean
  adminStatus: string
  isBlocked: boolean
  name: string
  gstNumber: string
  Address: string
  storeCapacity: number
  state: string
  country: string
  pinCode: string
  googleLocation: GoogleLocation
  manager: string
  emailId: string
  phoneNumber: string
  userName: string
  password: string
  registrationType: IRegistrationTypes
  aadhaarCard: string
  panCard: string
  localBodyLicense: string
  roomRentAgreement: string
  gstCertificate: string
  totalSalessAmount: number
  totalOrders: number
  mostPurchasedProducts: any[]
  createdAt: string
  updatedAt: string
  __v: number
  avatar: string
  cinNumber: string
  companyIncorporationCertificate: any
  companyPanCard: any
  llpNumber: string
  partnershipAgreement: any
  allocatedVolume: number
  rentCurrency: string
  rentPricePerUnit: number
};


export interface BankDetails {
  accountName: string
  accountNumber: string
  ifscCode: string
  shiftCode: string
  upiId: string
}

export interface GoogleLocation {
  latitude: number
  longitude: number
  _id: string
}



export type IAdminStatus =  "pending" | "viewed" | "approved" | "rejected";

export type IRegistrationTypes =
  | "Sole Proprietorship"
  | "Partnerships"
  | "LLP"
  | "PVT LTD";