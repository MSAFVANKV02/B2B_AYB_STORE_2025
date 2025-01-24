// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { isAuthenticated } from "./IsAuthenticated";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const isLogged = isAuthenticated();
//   const { pathname } = useLocation();

//   const loginUser = {
//     "_id": "2",
//     "name": "Jane Doe",
//     "email": "jane@gmail.com",
//     "password": "12345",
//     "role": "admin",
//     "pages": ["/products/add-new", "/products/all"], // Example pages user has access to
//   };

//   if (!isLogged) {
//     // Redirect to login if user is not authenticated
//     return <Navigate to="/login" replace />;
//   }
//   if (pathname === "/login" && isLogged ) {
//     // Redirect to login if user is not authenticated
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (loginUser.role === "admin") {
//     // Admin has access to everything
//     return <>{children}</>;
//   }

//     // Redirect to dashboard if logged in and accessing "/" or "/login"
//     if (pathname === "/login" || pathname === "/") {
//       return <Navigate to="/dashboard" replace />;
//     }

//   // Helper function to check if the user has access to the current route or its exact path
//   const hasAccess = (path: string) => {
//     // Only allow exact matches of path
//     if (path === "/settings/user-strict") {
//       return true; // Allow users to access this specific page (no need to add it to "pages" array)
//     }
//     return loginUser.pages.includes(path);
//   };

//   // If the user doesn't have access to the current path, redirect to the dashboard
//   if (!hasAccess(pathname)) {
//     // Log to see the redirect behavior
//     // console.log("Redirecting to /settings/user-management because of access restrictions");
//     return <Navigate to="/settings/user-strict" replace />;
//   }

//   // Allow authenticated users to access protected routes
//   return <>{children}</>;
// };

// export default ProtectedRoute;
// =================================================================
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./IsAuthenticated";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCurrentAdminSlices } from "@/redux/actions/adminSlice";
import { Get_Current_Admins_Api } from "@/services/auth/route";
import PreloaderPage from "@/preloader-page";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogged = isAuthenticated();
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { currentAdmin } = useAppSelector((state) => state.admin);
  const location = useLocation(); // Access the current location
  const { pathname } = location;

  // const loginUser = {
  //   _id: "2",
  //   name: "Jane Doe",
  //   email: "jane@gmail.com",
  //   password: "12345",
  //   role: "admin",
  //   pages: ["/products/add-new", "/products/all"], // Example pages user has access to
  // };

  // console.log(currentAdmin,'currentAdmin');

  useEffect(() => {
    if (isLogged) {
      fetchCurrentAdminDetails();
    }
  }, []);

  const fetchCurrentAdminDetails = async () => {
    try {
      const res = await Get_Current_Admins_Api();
      if (res.status === 200) {
        dispatch(setCurrentAdminSlices(res.data.admin));
      }
    } catch (error) {
      console.error("Error fetching current admin details:", error);
    } finally {
      setLoading(false); // Stop loading once the process completes
    }
  };

  if (isLogged && loading) {
    return (
      <div>
        <PreloaderPage />
      </div>
    );
  }

  // Redirect unauthenticated users to the login page
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect logged-in users from the login page to the dashboard
  if (pathname === "/login") {
    return <Navigate to="/dashboard" replace />;
  }

  // Admins have unrestricted access
  if (currentAdmin?.role === "admin") {
    return <>{children}</>;
  }

  // Helper function to check if the user has access to the current route
  const hasAccess = (path: string) => {
    if (path === "/settings/user-strict") {
      return true; // Allow access to this specific page
    }
    return currentAdmin?.pages.includes(path); // Check against user's allowed pages
  };

  // Redirect users without access to the current route
  if (!hasAccess(pathname)) {
    return <Navigate to="/settings/user-strict" replace />;
  }

  // Allow access to protected routes for authenticated users
  return <>{children}</>;
};

export default ProtectedRoute;
