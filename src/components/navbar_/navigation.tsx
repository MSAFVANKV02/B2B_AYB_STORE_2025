import { useAppSelector } from "@/redux/hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback } from "react";



function NavigationList() {
  const { currentAdmin } = useAppSelector((state)=>state.admin);



   const NAVIGATION = [
    {
      kind: "page",
      segment: "/dashboard",
      title: "Dashboard",
      icon: <Icon icon="material-symbols:dashboard-rounded" />,
    },
    // {
    //   kind: "page",
    //   segment: "/kyc",
    //   title: "Kyc verification",
    //   icon: <Icon icon="iconamoon:shield-yes-fill" />,
    // },
  
   
    {
      kind: "page",
      segment: "/products",
      title: "Products",
      icon: <Icon icon="entypo:box" />,
      isChild: true,
      children: [
        { title: "Add New Product", segment: "/products/add-new" },
        { title: "All Products", segment: "/products/all" },
        { title: "Category", segment: "/products/category" },
        { title: "Brand", segment: "/products/brand" },
        { title: "Product Reviews", segment: "/products/reviews" },
   
      ],
    },
    {
      kind: "page",
      segment: "/store",
      title: "Store Management",
      icon: <Icon icon="mdi:storefront-outline" />,
      isChild: true,
      children: [
        { title: "Store Stock Request", segment: "/store/stock-request" },
        { title: "Conversations", segment: "/store/conversations" },
        // { title: "Product Transfer", segment: "/store/product-transfer" },
        { title: "Return from store", segment: "/store/store-return" },
        // { title: "Store Commission", segment: "/store/commission" },
      ],
    },
    {
      kind: "page",
      segment: "/accounts",
      title: "Accounts",
      icon: <Icon icon="streamline:graph-bar-increase-solid" />,
      isChild: true,
      children: [
        { title: "Transaction history", segment: "/accounts/transaction-history" },
        { title: "Rent history", segment: "/accounts/rent-history" },
        { title: "Commission history", segment: "/accounts/commission-history" },
        { title: "Money withdraw history", segment: "/accounts/money-withdrawal" },


      ],
    },

 
    {
      kind: "page",
      segment: "/reports",
      title: "Reports",
      icon: <Icon icon="mdi:chart-bar" />,
      isChild: true,
      children: [
        { title: "Product Sale", segment: "/reports/product-sale" },
        { title: "Product Stock", segment: "/reports/product-stock" },
        { title: "Product Wishlist", segment: "/reports/wishlist" },
        { title: "User Searches", segment: "/reports/searches" },
      ],
    },



    // {
    //   kind: "page",
    //   segment: "/seller",
    //   title: "Seller Management",
    //   icon: <Icon icon="mdi:account-tie" />,
    //   isChild: true,
    //   children: [
    //     { title: "Create Seller", segment: "/seller/create" },
    //     { title: "Seller", segment: "/seller/all" },
    //     { title: "Seller Payout", segment: "/seller/payout-seller" },
    //     { title: "Request to Stock", segment: "/seller/request-stock" },
    //     { title: "Conversations", segment: "/seller/conversations" },
    //     { title: "Returns to Seller", segment: "/seller/returns" },
    //   ],
    // },
  
    {
      kind: "page",
      segment: "/offline-payment",
      title: "Offline Payment",
      icon: <Icon icon="fluent:phone-link-setup-24-filled" />,
    },
    // {
    //   kind: "page",
    //   segment: "/customers/refund",
    //   title: "Customer Refund",
    //   icon: <Icon icon="heroicons:receipt-refund-20-solid" />,
    // },

    {
      kind: "page",
      segment: "/settings",
      title: "Settings",
      icon: <Icon icon="mdi:cog-outline" />,
      isChild: true,
      children: [{ title: "Shipping", segment: "/settings/shipping" },
        { title: "Admin Roles", segment: "/settings/admin-management" },
        { title: "Payment Setup", segment: "/settings/payment-setup" }
      ],
    },
  ];


  // ====== filters =====

  const filteredNavigation = useCallback(() => {
    if (!currentAdmin) return [];

    // Show all navigation items if the currentAdmin is an "admin"
    if (currentAdmin.role === "admin") {
      return NAVIGATION;
    }

    // Filter navigation items based on allowed pages for non-admin roles
    if (currentAdmin.pages) {
      return NAVIGATION.filter((item) => {
        if (item.segment && currentAdmin.pages.includes(item.segment)) {
          return true;
        }

        if (item.isChild) {
          item.children = item.children?.filter((child) =>
            currentAdmin.pages.includes(child.segment)
          );
          return item.children?.length > 0;
        }

        return false;
      });
    }

    return [];
  }, [currentAdmin]);

  const navigationItems = filteredNavigation();
  
  return {
    navigationItems
  }
}

export default NavigationList