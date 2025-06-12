
import React, { createContext, useReducer, useContext, ReactNode } from "react";

type ModalType =
  | "none"
  | "address"
  | "NewAddress"
  | "shipping"
  | "offlinePay"
  | "order-tracker-one"
  | "cancel-order"
  | "return-order"
  | "return-product-details"
  | "order-status-update"
  | "success";


type ModalState = {
  isOpen: boolean;
  type: ModalType;
  selectedModalData: any; // You can also type this e.g., `Record<string, unknown>` or a union if you want safety
};

type ModalAction =
  | { type: "OPEN_MODAL"; modalType: ModalType; payload?: any }
  | { type: "CLOSE_MODAL" };

const initialState: ModalState = {
  isOpen: false,
  type: "none",
  selectedModalData: null,
};

const ModalContext = createContext<{
  modalState: ModalState;
  dispatchModal: React.Dispatch<ModalAction>;
}>({
  modalState: initialState,
  dispatchModal: () => {},
});

const modalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isOpen: true,
        type: action.modalType,
        selectedModalData: action.payload ?? null,
      };
    case "CLOSE_MODAL":
      return { isOpen: false, type: "none", selectedModalData: null };
    default:
      return state;
  }
};

export const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, dispatchModal] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ modalState, dispatchModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const UseUpdateModal = () => useContext(ModalContext);
