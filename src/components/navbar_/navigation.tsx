import { useAppSelector } from "@/redux/hook";
import { ALLOWED_DOMAIN } from "@/services/api/urlPath";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback } from "react";

function NavigationList() {
  const { currentAdmin } = useAppSelector((state) => state.admin);

  // console.log(currentAdmin,'currentAdmin');

  const NAVIGATION = [
    {
      kind: "page",
      segment: "/dashboard",
      title: "Dashboard",
      icon: <Icon icon="material-symbols:dashboard-rounded" />,
      subscribed: "free",
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
      subscribed: "free",
      isChild: true,
      children: [
        {
          title: "Add New Product",
          segment: "/products/add-new",
          subscribed: "free",
        },
        { title: "All Products", segment: "/products/all", subscribed: "free" },
        { title: "Brand", segment: "/products/brand", subscribed: "free" },
        {
          title: "Product Reviews",
          segment: "/products/reviews",
          subscribed: "free",
        },
      ],
    },
    {
      kind: "page",
      segment: "/sales",
      title: "Sales",
      icon: <Icon icon="streamline:graph-bar-increase-solid" />,
      isChild: true,
      subscribed: "free",
      children: [
        { title: "All Orders", segment: "/sales/orders", subscribed: "free" },
      ],
    },
    {
      kind: "page",
      segment: "/return",
      title: "Return Management",
      icon: <Icon icon="ph:key-return-fill" />,
      isChild: true,
      subscribed: "free",
      children: [
        {
          title: "Customer Return",
          segment: "/return/customer-return",
          subscribed: "free",
        },
        {
          title: "Seller Return",
          segment: "/return/seller-return",
          subscribed: "free",
        },
      ],
    },
    {
      kind: "page",
      segment: "/marketing",
      title: "Marketing",
      subscribed: "free",
      icon: <Icon icon="mdi:bullhorn" />,
      isChild: true,
      children: [
        { title: "Coupons", subscribed: "free", segment: "/marketing/coupons" },
      ],
    },
    // {
    //   kind: "page",
    //   title: "Customer Refunds",
    //   segment: "/refunds",
    //   subscribed: "free",

    //   icon: <Icon icon="heroicons:receipt-refund-solid" />,
    // },
    // {
    //   kind: "page",
    //   segment: "/customers",
    //   title: "Customers",
    //   subscribed: "free",
    //   icon: <Icon icon="mdi:account-group" />,
    // },
    {
      kind: "page",
      segment: "/stock",
      title: "Stock Management",
      icon: <Icon icon="mdi:storefront-outline" />,
      subscribed: "free",
      isChild: true,
      children: [
        {
          title: "Stock Transfer",
          segment: "/stock/stock-transfer",
          subscribed: "free",
        },
        {
          title: "Stock Received",
          segment: "/stock/received",
          subscribed: "free",
        },
        // { title: "Product Transfer", segment: "/stock/product-transfer", subscribed:'free', },
        {
          title: "Requests",
          segment: "/stock/requests",
          subscribed: "free",
        },
        // { title: "Store Commission", segment: "/store/commission", subscribed:'free', },
      ],
    },
    {
      kind: "page",
      segment: "/seller",
      title: "Seller Management",
      icon: <Icon icon="mdi:storefront-outline" />,
      subscribed: "free",
      isChild: true,
      children: [
        {
          title: "New Products From Seller",
          segment: "/seller/new-products",
          subscribed: "free",
        },
        {
          title: "Stock Request",
          segment: "/seller/stock-request",
          subscribed: "free",
        },
        {
          title: "Conversations",
          segment: "/seller/conversations",
          subscribed: "free",
        },
        // { title: "Product Transfer", segment: "/seller/product-transfer", subscribed:'free', },
        {
          title: "Return from store",
          segment: "/seller/store-return",
          subscribed: "free",
        },
        // { title: "Store Commission", segment: "/store/commission", subscribed:'free', },
      ],
    },
    {
      kind: "page",
      segment: "/accounts",
      title: "Accounts",
      icon: <Icon icon="streamline:graph-bar-increase-solid" />,
      subscribed: "free",
      isChild: true,
      children: [
        {
          title: "Transaction history",
          segment: "/accounts/transaction-history",
          subscribed: "free",
        },
        {
          title: "Rent history",
          segment: "/accounts/rent-history",
          subscribed: "free",
        },
        {
          title: "Commission history",
          segment: "/accounts/commission-history",
          subscribed: "free",
        },
        {
          title: "Money withdraw history",
          segment: "/accounts/money-withdrawal",
          subscribed: "free",
        },
      ],
    },

    {
      kind: "page",
      segment: "/reports",
      title: "Reports",
      icon: <Icon icon="mdi:chart-bar" />,
      subscribed: "free",
      isChild: true,
      children: [
        {
          title: "Product Sale",
          segment: "/reports/product-sale",
          subscribed: "free",
        },
        {
          title: "Product Stock",
          segment: "/reports/product-stock",
          subscribed: "free",
        },
        {
          title: "Product Wishlist",
          segment: "/reports/wishlist",
          subscribed: "free",
        },
        {
          title: "User Searches",
          segment: "/reports/searches",
          subscribed: "free",
        },
      ],
    },

    // {
    //   kind: "page",
    //   segment: "/seller",
    //   title: "Seller Management",
    //   icon: <Icon icon="mdi:account-tie" />,
    //   isChild: true,
    //   children: [
    //     { title: "Create Seller", segment: "/seller/create", subscribed:'free', },
    //     { title: "Seller", segment: "/seller/all", subscribed:'free', },
    //     { title: "Seller Payout", segment: "/seller/payout-seller", subscribed:'free', },
    //     { title: "Request to Stock", segment: "/seller/request-stock", subscribed:'free', },
    //     { title: "Conversations", segment: "/seller/conversations", subscribed:'free', },
    //     { title: "Returns to Seller", segment: "/seller/returns", subscribed:'free', },
    //   ],
    // },

    // {
    //   kind: "page",
    //   segment: "/offline-payment",
    //   title: "Offline Payment",
    //   icon: <Icon icon="fluent:phone-link-setup-24-filled" />,
    // },
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
      subscribed: "free", //main subscription page before child
      isChild: true,
      children: [
        {
          title: "Settings",
          segment: "/settings/mange-account",
          subscribed: "free",
        },
        {
          title: "Support ticket",
          segment: "/settings/support-ticket",
          subscribed: "free",
        },
        {
          title: "Media",
          segment: "/settings/media/uploads",
          subscribed: "free",
        },
      ],
    },
  ];

  // ====== filters =====

  const filteredNavigation = useCallback(() => {
    if (window.location.origin.includes(ALLOWED_DOMAIN)) {
      return NAVIGATION; // Show everything in dev tunnel
    }

    if (!currentAdmin) return [];

    // Show all navigation items for "Seller" role
    // if (currentAdmin.role === "Seller") {
    //   return NAVIGATION;
    // }

    // Filter based on subscription type
    return NAVIGATION.filter((item) => {
      // Check for the main page subscription
      const isMainPageValid =
        currentAdmin.subscription === false
          ? item.subscribed === "free"
          : item.subscribed === "free" || item.subscribed === "premium";

      // If the main page is valid, check the children (if any)
      if (isMainPageValid && item.isChild && item.children) {
        // Filter children based on subscription
        item.children = item.children.filter((child) => {
          return currentAdmin.subscription === false
            ? child.subscribed === "free"
            : child.subscribed === "free" || child.subscribed === "premium";
        });
        // Return the item with its filtered children
        return item.children.length > 0 || !item.children.length; // Keep item if it has valid children or no children
      }

      return isMainPageValid;
    });
  }, [currentAdmin]);

  const navigationItems = filteredNavigation();

  return {
    navigationItems,
  };
}

export default NavigationList;
