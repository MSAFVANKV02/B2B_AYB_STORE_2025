import {
  APPROVE_RENTAL_REQUESTS_URL,
  GET_ALL_RENTAL_REQUESTS_URL,
  REJECT_RENTAL_REQUESTS_URL,
} from "../api/rental_urlPath";
import { API, IGetAllFilterKey } from "../auth/route";

export const get_Seller_Rental_Request_Api = (
  filter?: { key: IGetAllFilterKey; value: string }[]
) => {
  const params: Record<string, string> = {};

  if (filter) {
    filter.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return API.get(
    GET_ALL_RENTAL_REQUESTS_URL,

    {
      withCredentials: true,
      params, // ✅ Send dynamic query params
    }
  );
};

export const accept_Seller_Rental_Request_Api = (rentalId: string) => {
  return API.post(
    `${APPROVE_RENTAL_REQUESTS_URL}/${rentalId}`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const reject_Seller_Rental_Request_Api = (
  rentalId: string,
  reason: string
) => {
  return API.post(
    `${REJECT_RENTAL_REQUESTS_URL}/${rentalId}`,
    { reason },
    {
      withCredentials: true,
    }
  );
};
