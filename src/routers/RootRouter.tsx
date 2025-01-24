import App from "@/App";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "@/middlewares/ProtectedRoute";
import ErrorPage from "@/Error-Page";
import LoginPage from "@/pages/auth/Login-Page";
import {
  ProductsLayout,
  SalesLayout,
  StoreManagementLayout,
  SettingsLayout,
} from "@/layouts/Sidbar_Layout";
import ProductAddPage from "@/pages/products/add-new/product-add-page";
import AllProductsPage from "@/pages/products/all/All-Products-page";
import CategoryPage from "@/pages/products/category/category-page";
import BrandPage from "@/pages/products/brand/brand-page";
import ProductReviewPage from "@/pages/products/product-review/product-review-page";
import AllOrdersPage from "@/pages/orders/all/all-oders-page";
import CustomerRefundPage from "@/pages/orders/customer-refunds/customer-refund-page";
import ProductSalePage from "@/pages/reports/product-sale/product-sale-page";
import OfflinePaymentPage from "@/pages/payments/offline-payments/offline-payment-page";
import ProductStockPage from "@/pages/reports/product-stock/product-stock-page";
import UserSearchCountPage from "@/pages/reports/user-searches/user-search-count-page";
import StoreManagementPage from "@/pages/store/store-management-page";
import AuthProtectionRoute from "@/middlewares/AuthProtectionRoute";
import StoreReturnPage from "@/pages/store/return-from-store/store-return-page";
import ConversationPage from "@/pages/store/conversations/conversation-page";



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
          element: <SalesLayout />, // Parent layout for Sales
          children: [
            { path: "orders", element: <AllOrdersPage /> },
            { path: "refunds", element: <CustomerRefundPage /> },
          ],
        },
        // {
        //   path: "/marketing",
        //   element: <SalesLayout />, // Parent layout for Sales
        //   children: [{ path: "coupons", element: <MarketingPage /> }],
        // },
        {
          path: "/reports",
          element: <SalesLayout />, // Parent layout for Sales
          children: [
            { path: "product-sale", element: <ProductSalePage /> },
            { path: "product-stock", element: <ProductStockPage /> },
            { path: "searches", element: <UserSearchCountPage /> },
          ],
        },
        
        // {
        //   path: "/web-setup",
        //   element: <WebpSetupPage />,
        // },
        {
          path: "/offline-payment",
          element: <OfflinePaymentPage />,
        },
        {
          path: "/store",
          element: <StoreManagementLayout />, // Parent layout for Store Management
          children: [
            { path: "stock-request", element: <StoreManagementPage /> },
           
            { path: "conversations", element: <ConversationPage /> },
            { path: "store-return", element: <StoreReturnPage/> },
            // { path: "earnings", element: <StoreEarningsPage /> },
            // { path: "commission", element:<StoreCommissionPage /> },
          ],
        },
       
        {
          path: "/settings",
          element: <SettingsLayout />,
          children: [
            { path: "shipping", element: <div>Shipping Page</div> },
          
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
