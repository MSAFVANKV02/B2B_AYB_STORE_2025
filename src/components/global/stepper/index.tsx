import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/assets/css/Order.css";
// import { IoBagCheckOutline } from "react-icons/io5";
import { addDays } from "date-fns";
import { useWindowWidth } from "@react-hook/window-size";
import {
  formatOrderDate,
  safeFormatDate,
  safeParseDate,
} from "../elements/FormateTime";
import { IFlatOrderItem } from "@/types/orderTypes";
import { useTheme } from "@/components/ui/theme";
import { OrderStatusEnum } from "@/utils/enum/enum";
import { getStatusOptions } from "@/utils/orderStatusOptions"; // path to your refactored export

// order_status and IOrder types

interface OrderStatusProps {
  orderDetails: IFlatOrderItem[];
  refetch?: any;
}

const DottedConnector = styled("div")<{
  active?: boolean;
  completed?: boolean;
  index: number;
  onlyWidth: number;
}>(({ active, completed, onlyWidth }) => ({
  content: '""',
  zIndex: 99,

  position: "absolute",
  width: "1px",
  height: "calc(100%)",
  margin: "",
  bottom: -20,
  // top:0,
  left: "10px",
  marginLeft: `${onlyWidth < 645 ? "-2px" : "-1px"}`,
  background:
    completed || active
      ? "repeating-linear-gradient(0deg, #6DC558, #6DC558 3px, transparent 3px, transparent 6px)"
      : "repeating-linear-gradient(0deg, #ccc, #ccc 3px, transparent 3px, transparent 6px)",
  //   display: index === 0 ? "none" : "block",
}));

const CustomStepIcon = styled("div")<{
  active?: boolean;
  completed?: boolean;
  index?: number;
  onlyWidth: number;
}>(({ active, completed, onlyWidth }) => ({
  // main theme
  width: onlyWidth < 645 ? 16 : 20,
  height: onlyWidth < 645 ? 16 : 20,
  borderRadius: "50%",
  marginRight: 10,
  marginTop: -15,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: completed || active ? "#6DC558" : "#B2E195",
  border: `2px solid ${completed || active ? "#6DC558" : "#B2E195"}`,
  zIndex: 100,

  position: "relative",

  "&::after": {
    content: '""',
    display: active || completed ? "block" : "none",
    width: onlyWidth < 645 ? 8 : 10,
    height: onlyWidth < 645 ? 8 : 10,
    backgroundColor: "#fff",
    borderRadius: "50%",
    zIndex: 1001,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: onlyWidth < 645 ? 16 : 20,
    height: onlyWidth < 645 ? 16 : 20,
    display: active ? "block" : "none",
    // backgroundColor: "#afa9a9",
    border: "1px solid #B2E195",
    borderRadius: "50%",

    zIndex: 100,
    animation: active ? "wave 1.5s infinite ease-in-out" : "none",
  },
}));

const MAX_RETURN_DAYS = 10;

export const OrderStatusStepper: React.FC<OrderStatusProps> = ({
  orderDetails,
}) => {
  // Determine the active step based on the order_status
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  // const [isReturned, setIsReturned] = useState<boolean>(false);
  const onlyWidth = useWindowWidth();

  const shippingMethod =
    orderDetails[0]?.store?.parcel_details.shipping_method || "";
  const storeStatus = orderDetails[0].store.order_status;

  const statusSteps = getStatusOptions(shippingMethod)
    .filter((step) => {
      if (orderDetails[0].store.is_returned) return true; // Keep all if returned
      return step.value !== "cancelled" || storeStatus === "cancelled";
    })
    .map((step, index) => {
      const status = step.value;
      const store = orderDetails[0].store;
      const order = orderDetails[0].order;

      const isReturned = store.is_returned && status === "cancelled"; // Replace cancelled with returned if returned

      const label = isReturned ? "returned" : status;

      return {
        id: step.id,
        label,
        title: (() => {
          if (isReturned) return "Order Returned";
          switch (status) {
            case "pending":
              return "Order Placed";
            case "processing":
              return index <= currentStep ? "Order Confirmed" : "Processing...";
            case "ready_to_pickup":
              return "Ready for Store Pickup";
            case "shipped":
              return index === currentStep
                ? "Package is on the way"
                : "Shipped";
            case "out_for_delivery":
              return "Out for Delivery";
            case "delivered": {
              const changedAt = safeParseDate(store.delivery_date);
              const createdAt = safeParseDate(order.createdAt);
              if (changedAt && createdAt) {
                const maxReturnDate = addDays(createdAt, MAX_RETURN_DAYS);
                return changedAt < maxReturnDate
                  ? `Delivered early ${safeFormatDate(changedAt)}`
                  : `Delivered ${safeFormatDate(changedAt)}`;
              }
              return "Delivered";
            }
            case "cancelled":
              return "Order Cancelled";
            default:
              return step.label;
          }
        })(),
        icon: (() => {
          if (isReturned) return "game-icons:return-arrow";
          switch (status) {
            case "pending":
              return "bi:bag-check";
            case "processing":
              return "mdi:credit-card-check-outline";
            case "ready_to_pickup":
              return "mdi:store-check-outline";
            case "shipped":
            case "out_for_delivery":
              return "mdi:truck-fast-outline";
            case "delivered":
              return "hugeicons:package-delivered";
            case "cancelled":
              return "mdi:cancel";
            default:
              return "mdi:alert-circle-outline";
          }
        })(),
        description: (() => {
          if (isReturned)
            return `${safeFormatDate(
              orderDetails[0].store.return_action_date || store.updatedAt
            )}`;
          switch (status) {
            case "pending":
              return `${formatOrderDate(order.createdAt)}`;
            case "shipped":
              return `${formatOrderDate(store.shipped_date)}`;
            case "delivered":
              return `${safeFormatDate(store.delivery_date)}`;
            case "cancelled":
              return `${safeFormatDate(
                store.cancelled_date || store.updatedAt
              )}`;
            default:
              return "";
          }
        })(),
      };
    });

  // useEffect(() => {
  //   if (orderDetails?.length) {
  //     const { order_status } = orderDetails[0].store;
  //     // setIsCancelled(order_status === OrderStatusEnum.CANCELLED);
  //     // setIsReturned(is_returned);

  //     const index = statusSteps.findIndex((s) => s.label === order_status);
  //     setCurrentStep(index !== -1 ? index : 0);
  //   }
  // }, [orderDetails]);
  useEffect(() => {
    if (orderDetails?.length) {
      const store = orderDetails[0].store;
      const { order_status } = orderDetails[0].store;
      setIsCancelled(order_status === OrderStatusEnum.CANCELLED);
      // setIsReturned(is_returned);

      if (store.is_returned) {
        // ✅ Mark all steps as completed if order is returned
        setCurrentStep(statusSteps.length - 1);
      } else {
        const index = statusSteps.findIndex(
          (s) => s.label === store.order_status
        );
        setCurrentStep(index !== -1 ? index : 0);
      }
    }
  }, [orderDetails, statusSteps]);

  const statusesCancelled = [
    {
      id: 1,
      label: "confirmed",
      title: `Order Confirmed `,
      icon: "mdi:credit-card-check-outline",
      description: ` 
      ${formatOrderDate(orderDetails[0].store.createdAt)}`,
    },
    {
      id: 2,

      label: "cancelled",
      title: `Order cancelled ${safeFormatDate(
        orderDetails[0].store.cancelled_date
      )}`,
      icon: "ix:cancelled",
      description: ` 
      ${safeFormatDate(orderDetails[0].store.cancelled_date)}`,
    },
  ];

  const stepperChanges = isCancelled ? statusesCancelled : statusSteps;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={currentStep} orientation="vertical" className="">
        {stepperChanges.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              "& .MuiStepConnector-root": {
                borderLeft: "none", // Remove the unwanted border
              },
            }}
            className="relative space-x- h-[70px]"
          >
            {/* {currentStep} */}
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  onlyWidth={onlyWidth}
                  active={index === currentStep}
                  completed={index < currentStep}
                  index={index}
                  //   className={`${index === activeStep && "animate-wave"} `}
                />
              )}
            >
              <Box display="flex" gap="15px">
                <Icon
                  icon={step.icon}
                  style={{
                    fontSize: "24px",
                    color:
                      step.label === "cancelled"
                        ? "#FF4D4F"
                        : step.label === "returned"
                        ? "#6C63FF" // ⬅️ Standard return violet color (customize as needed)
                        : index <= currentStep
                        ? "#6DC558"
                        : "#BBBBBB",
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: index === currentStep ? "bold" : "normal",
                      color:
                        step.label === "cancelled" // ✅ Red for cancelled title
                          ? "#FF4D4F"
                          : step.label === "returned"
                          ? "#6C63FF"
                          : index <= currentStep
                          ? theme === "light"
                            ? "#000"
                            : "#d4d4d4"
                          : "#BBBBBB",
                      fontSize: `${onlyWidth < 645 ? "12px" : "15px"}`,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color:
                        step.label === "cancelled" // ✅ Muted red for description
                          ? "#FF8888"
                          : step.label === "returned"
                          ? "#6C63FF"
                          : index <= currentStep
                          ? "#636363"
                          : "#BBBBBB",
                      fontSize: `${onlyWidth < 645 ? "10px" : "12px"}`,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </StepLabel>

            {index !== stepperChanges.length - 1 && (
              <DottedConnector
                onlyWidth={onlyWidth}
                active={index === currentStep}
                completed={index < currentStep}
                index={index}
              />
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
