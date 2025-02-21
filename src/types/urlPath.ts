export const LOCAL_URL = `http://localhost:4000`

export const ALLOWED_DOMAIN = "https://6qg6jmv3-5176.inc1.devtunnels.ms";


export const STORE_SEND_OTP = `/user_api/store/sendOtp_StoreLogin`;
export const STORE_VERIFY_OTP = `/user_api/store/verifyOtp_StoreLogin`;
export const STORE_RESEND_OTP = `/user_api/admin/resendOtp_AdminLogin`;

// ==== sub admins =================
export const CREATE_SUB_STORE_URL = `/user_api/seller/createSubadmin`;
export const UPDATE_SUB_STORE_URL = `/user_api/seller/updateSubadmin`;
export const GET_STORE_URL = `/user_api/store/getCurrentStore`;

// ==== current store =================

export const GET_CURRENT_STORE_URL = `/user_api/store/getCurrentStore`;

export const DELETE_STORE_URL = `/user_api/seller/deleteSubadmin`;



// export const STORE_VERIFY_OTP = `https://www.user-service.ayaboo.com/seller/verifyOtp_AdminLogin`;
// export const STORE_VERIFY_OTP = `http://localhost:4001/seller/verifyOtp_AdminLogin`;



// ------ logout --------------------
export const LOGOUT_STORE_URL = `/user_api/seller/logoutAdmin`;


// ------ customer --------------------
export const CUSTOMER_DETAILS_URL = `/user_api/seller/getUsersWithkyc`;
export const UPDATE_CUSTOMER_KYC_URL = `/user_api/seller/approveOrreject_Kyc`;

// ============ store urls =========================
// ==============****************====================

export const CREATE_STORE_URL = `/user_api/seller/addStore`

// ============ media urls =========================
// ==============****************====================

export const CREATE_MEDIA_URL = `/product_api/media/addMedia`;
export const GET_MEDIA_URL = `/product_api/media/getAllMedia`
export const GET_MEDIA_BY_ID_URL = `/product_api/media/getMediaById`

export const DELETE_MEDIA_URL = `/product_api/media/deleteMediaById`
export const DELETE_MULTIPLE_MEDIA_URL = `/product_api/media/deleteMultipleMedia`



// ============ CREATE BRAND FOR PRODUCTS =========================
// ==============****************====================
export const CREATE_BRAND_URL = `/product_api/brand/createBrand`;
export const UPDATE_BRAND_URL = `/product_api/brand/updateBrand`;
export const GET_BRAND_URL = `/product_api/brand/getAllBrands`;
export const SOFT_DELETE_SINGLE_BRAND_URL = `/product_api/brand/softDeleteBrand`;
export const HARD_DELETE_ALL_BRAND_URL = `/product_api/brand/hardDeleteAllBrands`;
export const HARD_DELETE_SINGLE_BRAND_URL = `/product_api/brand/hardDeleteBrand`;