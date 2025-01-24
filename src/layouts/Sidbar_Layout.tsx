import usePageTitle from "@/hooks/usePageTitle";
import { Outlet } from "react-router-dom";

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

  return (
    <div>
      {/* <h1>Store Management Page</h1> */}
      <Outlet />
    </div>
  );
};

export const SellerManagementLayout = () => {
  usePageTitle("Ayaboo | Seller");
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
