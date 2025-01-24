import { IModalTypes } from "@/components/tasks/table_actions/data-table-action-dashboard";
import useNavigateClicks from "@/hooks/useClicks";
import { logoutState } from "@/redux/actions/adminSlice";
import { useAppDispatch } from "@/redux/hook";
import { LogoutAdmins_Api } from "@/services/auth/route";
import { IUserProps } from "@/types/adminUserTypes";
import { ICategory } from "@/types/categorytypes";
import { IProducts } from "@/types/productType";
import { makeToastError } from "@/utils/toaster";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the context type
interface ModalContextType {
  isOpen: boolean;
  selectedTask: IUserProps | null;
  openModal: (task: any, type: IModalTypes) => void;
  openProductModal: (task: any) => void;
  closeModal: () => void;
  isOfflineTable: boolean;
  isKycTable: boolean;
  isTopStoresTable: boolean;
  isTopProductsTable: boolean;
  isTopSellerTable: boolean;
  modalTypeDashboard: IModalTypes;
  selectedPage: string | null;
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCategory: Dispatch<SetStateAction<ICategory | null>>;
  selectedProducts: IProducts | null;
  selectedCategory: ICategory | null;
  openCategoryModal: (task: ICategory) => void;
  handleLogout: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { handleClick } = useNavigateClicks();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<IUserProps |null>(null);
  const [selectedProducts, setSelectedProducts] = useState<IProducts | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [isOfflineTable, setIsOfflineTable] = useState(false);
  const [isKycTable, setIsKycTable] = useState(false);
  const [isTopStoresTable, setIsTopStoresTable] = useState(false);
  const [isTopProductsTable, setIsTopProductsTable] = useState(false);
  const [isTopSellerTable, setIsTopSellerTable] = useState(false);
  const [modalTypeDashboard, setModalTypeDashboard] = useState<IModalTypes>("");
  const [selectedPage, setSelectedPage] = useState<string | null>("general");

  // store sections =======
  // const [storeEdit]

  //  ===== modal open in dashboard =================
  const openModal = (task: IUserProps, type: IModalTypes) => {
    setSelectedTask(task);
    setIsOpen(true);
    setModalTypeDashboard(type);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
    setIsOfflineTable(false);
    setIsKycTable(false);
    setIsTopStoresTable(false);
    setIsTopProductsTable(false);
    setIsTopSellerTable(false);
  };

  //  ===== modal open in product all page =================

  const openProductModal = (task: IProducts) => {
    // Accept a single product
    setSelectedProducts(task); // Wrap in an array
    setIsOpen(true);
  };

  //  ===== modal open in category page =================

  const openCategoryModal = (task: ICategory) => {
    setSelectedCategory(task); // Wrap in an array
    setIsOpen(true);
  };

  // const handleStoreManagementEdit = (task: any) => {

  // }

  const handleLogout = async () => {
    try {
      await LogoutAdmins_Api();
      dispatch(logoutState());
      handleClick("/login");
    } catch (error:any) {
      console.error("Error logging out:", error);
      if(error.response.data){
        makeToastError(error.response.data?.message);
      }
      // TODO: Handle error
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedTask,
        openModal,
        openProductModal,
        closeModal,
        isOfflineTable,
        isKycTable,
        isTopStoresTable,
        isTopProductsTable,
        isTopSellerTable,
        modalTypeDashboard,
        selectedPage,
        setSelectedPage,
        selectedProducts,
        openCategoryModal,
        selectedCategory,
        setSelectedCategory,
        handleLogout,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the ModalContext
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
