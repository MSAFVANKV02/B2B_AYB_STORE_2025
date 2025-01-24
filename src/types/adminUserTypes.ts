export interface IAdminTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "ecommerce" | "social-media";
  pages: string[];
  isBlocked: boolean;
  mobile: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProps {
  user: IUserDetailsType;
  kyc: IKycProps;
}

export interface IUserDetailsType {
  _id: string;
  mobile: string;
  isVerified: boolean;
  isRegistered: boolean;
  isBlocked: boolean;
  policyVerified: boolean;
  kycsubmitted: boolean;
  kycApproved: boolean;
  isWhatsappApproved: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  kycStatus: "pending" | "approved" | "viewed" | "rejected";
  // __v: number;
  name: string;
  pinCode: string;
  shopName: string;
}

export interface IKycProps {
  _id: string;
  businessName: string;
  emailId: string;
  buildingName: string;
  street: string;
  post: string;
  pinCode: string;
  state: string;
  country: string;
  gstNumber: string;
  proof?: string; // Optional
  proofType:
    | "Udyam Aadhaar"
    | "GST Certificate"
    | "Current Account Cheque"
    | "Shop & Establishment License"
    | "Trade Certificate/License"
    | "Other Shop Documents";
  status: "pending" | "approved" | "rejected";
  kycFeedback?: string; // Optional
  isApproved: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ValidProofTypes =
  | "Udyam Aadhaar"
  | "GST Certificate"
  | "Current Account Cheque"
  | "Shop & Establishment License"
  | "Trade Certificate/License"
  | "Other Shop Documents";
