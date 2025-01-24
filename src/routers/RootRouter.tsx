import App from "@/App";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "@/middlewares/ProtectedRoute";
import ErrorPage from "@/Error-Page";
import LoginPage from "@/pages/auth/Login-Page";
import {
  ProductsLayout,
  AccountLayout,
  StoreManagementLayout,
  SettingsLayout,
} from "@/layouts/Sidbar_Layout";
import ProductAddPage from "@/pages/products/add-new/product-add-page";
import AllProductsPage from "@/pages/products/all/All-Products-page";
import CategoryPage from "@/pages/products/category/category-page";
import BrandPage from "@/pages/products/brand/brand-page";
import ProductReviewPage from "@/pages/products/product-review/product-review-page";
import ProductSalePage from "@/pages/reports/product-sale/product-sale-page";
import ProductStockPage from "@/pages/reports/product-stock/product-stock-page";
// import UserSearchCountPage from "@/pages/reports/user-searches/user-search-count-page";
import StoreManagementPage from "@/pages/store/store-management-page";
import AuthProtectionRoute from "@/middlewares/AuthProtectionRoute";
import StoreReturnPage from "@/pages/store/return-from-store/store-return-page";
import ConversationPage from "@/pages/store/conversations/conversation-page";
import TransactionHistoryPage from "@/pages/accounts/transaction-history/transaction-history-page";
import RentHistoryPage from "@/pages/accounts/rent-history/rent-history-page";
import CommissionHistoryPage from "@/pages/accounts/commission-history/commission-history-page";
import MoneyWithdrawalPage from "@/pages/accounts/money-withdrawal/money-withdrawl-page";
import PageOnBuild from "@/components/myUi/PageOnBuild";

const rootRouter = createBrowserRouter(
  [
    {
      path: "/login",
      element: (
        <AuthProtectionRoute>
          <LoginPage />
        </AuthProtectionRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard" replace />, // Redirect from "/" to "/dashboard"
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: <ProductsLayout />, // Parent layout for Products
          children: [
            { path: "add-new", element: <ProductAddPage /> },
            { path: "all", element: <AllProductsPage /> },
            { path: "category", element: <CategoryPage /> },
            { path: "brand", element: <BrandPage /> },
            { path: "reviews", element: <ProductReviewPage /> },
          ],
        },
        {
          path: "/accounts",
          element: <AccountLayout />, // Parent layout for Sales
          children: [
            {
              path: "transaction-history",
              element: <TransactionHistoryPage />,
            },
            { path: "rent-history", element: <RentHistoryPage /> },
            { path: "commission-history", element: <CommissionHistoryPage /> },
            { path: "money-withdrawal", element: <MoneyWithdrawalPage /> },
          ],
        },
        // {
        //   path: "/marketing",
        //   element: <AccountLayout />, // Parent layout for Sales
        //   children: [{ path: "coupons", element: <MarketingPage /> }],
        // },
        {
          path: "/reports",
          element: <AccountLayout />, // Parent layout for Sales
          children: [
            { path: "product-sale", element: <ProductSalePage /> },
            { path: "product-stock", element: <ProductStockPage /> },
            { path: "wishlist", element: <PageOnBuild title="Wish List"/> },
            { path: "searches", element: <PageOnBuild title="User Searches"/> },
          ],
        },

        // {
        //   path: "/web-setup",
        //   element: <WebpSetupPage />,
        // },

        {
          path: "/store",
          element: <StoreManagementLayout />, // Parent layout for Store Management
          children: [
            { path: "stock-request", element: <StoreManagementPage /> },

            { path: "conversations", element: <ConversationPage /> },
            { path: "store-return", element: <StoreReturnPage /> },
            // { path: "earnings", element: <StoreEarningsPage /> },
            // { path: "commission", element:<StoreCommissionPage /> },
          ],
        },

        {
          path: "/settings",
          element: <SettingsLayout />,
          children: [
            {
              path: "mange-account",
              element: <PageOnBuild title="Manage Profile"/>,
            },
            { path: "support-ticket", element: <PageOnBuild title="Support Ticket"/> },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]
  // ,{
  //   future: {
  //     v7_fetcherPersist: true, // Enable the future flag for fetcher persistence in React Router v7
  //   },
  // }
);

export default rootRouter;
