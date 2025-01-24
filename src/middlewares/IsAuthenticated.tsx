import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  // const token = Cookies.get('us_b2b_admin');
  const token = Cookies.get('ad_b2b_tkn');

  // console.log('Token from cookies:', token);
  // console.log(document.cookie);

  return !!token; // Returns true if the token exists, otherwise false
};
export const isAuthOtp = () => {
  const token = Cookies.get('us_b2b_admin_otp');
//   console.log('Token from cookies:', token);
//   console.log(document.cookie);

  return !!token; // Returns true if the token exists, otherwise false
};
