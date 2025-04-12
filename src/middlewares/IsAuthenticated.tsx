import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  // const token = Cookies.get('us_b2b_admin');
  const token = Cookies.get('st_b2b_tkn');
  return !!token; 
};
export const isAuthOtp = () => {
  const token = Cookies.get('us_b2b_store_otp');
//   console.log('Token from cookies:', token);
//   console.log(document.cookie);

  return !!token; 
};
