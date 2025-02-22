import usePageTitle from "@/hooks/usePageTitle";
import { Outlet } from "react-router-dom";

export const SalesLayout = () => (
  <div>
    <Outlet /> {/* Renders child routes */}
  </div>
);

export const ProductsLayout = () => {
  {
    usePageTitle("Ayaboo | Products");
  }
  return (
    <div>
      {/* <h1>Store Management Page</h1> */}
      <Outlet />
    </div>
  );
};

export const AccountLayout = () => (
  <div>
    <Outlet /> {/* Renders child routes */}
  </div>
);

export const StoreManagementLayout = () => {
  usePageTitle("Ayaboo | Store");
  return (
    <div>
      {/* <h1>Store Management Page</h1> */}
      <Outlet />
    </div>
  );
};

export const SellerManagementLayout = () => {
  usePageTitle("Ayaboo | Store");
  return (
    <div>
      {/* <h1>Store Management Page</h1> */}
      <Outlet />
    </div>
  );
};

export const SettingsLayout = () => (
  <div>
    <Outlet />
  </div>
);

export const CustomerLayout = () => (
  <div>
    <Outlet />
  </div>
);
