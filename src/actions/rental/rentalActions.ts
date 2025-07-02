import { IGetAllFilterKey } from "@/services/auth/route";
import {
  accept_Seller_Rental_Request_Api,
  extent_Seller_Rental_Request_Api,
  get_Seller_Rental_Request_Api,
  reject_Seller_Rental_Request_Api,
  vacate_Seller_Rental_Request_Api,
} from "@/services/rental/route";

export const getSellerRequestForRental = async (
  filter?: { key: IGetAllFilterKey; value: string }[]
) => {
  try {
    const response = await get_Seller_Rental_Request_Api(filter);
    // console.log(response, "response in rental action");

    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error: any) {
    console.error("Error fetching available stores for rental:", error);
    return {
      status: 500,
      data: [],
      message:
        error.response.data.message ||
        "An error occurred while fetching rental requests.",
    };
  }
};

// 2 update accept or reject rental request

export const updateRequestForRental = async (
  reason: string,
  rentalId: string,
  type: "accept" | "reject"
) => {
  try {
    const route =
      type === "accept"
        ? accept_Seller_Rental_Request_Api(rentalId)
        : reject_Seller_Rental_Request_Api(rentalId, reason);

    const response = await route;
    console.log(response.data, "response in rental update action");

    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error: any) {
    console.error("Error updating rental:", error);
    return {
      status: 500,
      data: [],
      message:
        error.response.data.message ||
        "An error occurred while fetching rental requests.",
    };
  }
};

export const RequestForRentalVacateAction = async ({
  reason,
  rentalId,
  status,
}: {
  rentalId: string;
  reason: string;
  status: string;
}) => {
  try {
    const route = vacate_Seller_Rental_Request_Api({
      reason,
      rentalId,
      status,
    });

    const response = await route;
    // console.log(response.data, "response in rental update action");

    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error: any) {
    console.error("Error updating rental:", error);
    return {
      status: 500,
      data: [],
      message:
        error.response.data.message ||
        "An error occurred while fetching rental requests.",
    };
  }
};

// extent request from seller

export const extentRequestAction = async ({
  rentalId,
  reason,

  status,
}: {
  rentalId: string;
  reason: string;
  status: string;
}) => {
  try {
    const route = extent_Seller_Rental_Request_Api({
      reason,
      rentalId,
      status,
    });

    const response = await route;
    console.log(response.data, "response in extentRequestAction");

    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data.data,
        message: response.data.message,
      };
    }
  } catch (error: any) {
    console.error("An error occurred while extent Request Action:", error);
    return {
      status: 500,
      data: [],
      message:
        error.response.data.message ||
        "An error occurred while extent Request Action",
    };
  }
};
