export const LOCAL_URL = `http://localhost:4000`

export const ALLOWED_DOMAIN = "https://6qg6jmv3-5176.inc1.devtunnels.ms";


export const SELLER_SEND_OTP = `/user_api/seller/sendOtp_SellerLogin`;
export const SELLER_VERIFY_OTP = `/user_api/seller/verifyOtp_SellerLogin`;


// ==== sub admins =================
export const CREATE_SUB_SELLER_URL = `/user_api/seller/createSubadmin`;
export const UPDATE_SUB_SELLER_URL = `/user_api/seller/updateSubadmin`;
export const GET_SELLER_URL = `/user_api/seller/getSubadmins`;

export const GET_CURRENT_SELLER_URL = `/user_api/seller/getCurrentSeller`;

export const DELETE_SELLER_URL = `/user_api/seller/deleteSubadmin`;



// export const SELLER_VERIFY_OTP = `https://www.user-service.ayaboo.com/seller/verifyOtp_AdminLogin`;
// export const SELLER_VERIFY_OTP = `http://localhost:4001/seller/verifyOtp_AdminLogin`;
export const SELLER_RESEND_OTP = `/user_api/seller/resendOtp_AdminLogin`;


// ------ logout --------------------
export const LOGOUT_SELLER_URL = `/user_api/seller/logoutAdmin`;


// ------ customer --------------------
export const CUSTOMER_DETAILS_URL = `/user_api/seller/getUsersWithkyc`;
export const UPDATE_CUSTOMER_KYC_URL = `/user_api/seller/approveOrreject_Kyc`;

// ============ store urls =========================
// ==============****************====================

export const CREATE_STORE_URL = `/user_api/seller/addStore`



