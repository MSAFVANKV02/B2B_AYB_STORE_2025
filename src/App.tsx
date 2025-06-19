import "@/assets/css/style.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { cn } from "./lib/utils";
import NavbarDrawer, { DrawerHeader } from "./components/navbar_/Navbar_Drawer";
import { Outlet, useLocation } from "react-router-dom";
import ThemProviderMui from "./providers/metrialUi/theme-provider";
import { useMediaQuery } from "@mui/material";
import { ModalProvider } from "./providers/context/context";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ReactQueyProvider from "./providers/react-quey";
import QueryLayout from "./layouts/queryLayout";
import { TooltipProvider } from "./components/ui/tooltip";
import { useTheme } from "./components/ui/theme";

export default function MiniDrawer() {
  const { i18n } = useTranslation();
  const query = new QueryClient();
  const {pathname} = useLocation();
  const { theme } = useTheme();

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language, i18n]);
  return (
    <div
      className={cn(`dark:bg-black`, {
        "debug-screens": import.meta.env.MODE === "development",
      })}
    >
      {/* bgcolor: "#F7F7F7" */}
      <ModalProvider>
        <Box
          sx={{
            display: "flex",
            bgcolor: theme === "dark" ? "#000000" : "#F7F7F7",
          }}
        >
          <CssBaseline />
          {/* side bar and headers includes ========= */}
          <NavbarDrawer />

          {/* side bar and headers includes ========= */}

          <ThemProviderMui>
            <Box
              component="main"
              sx={{
                flexGrow: isLargeScreen ? 1 : 0,
                width: "100%",
                p: isLargeScreen ? 2 : 1,

                maxWidth: "1800px",
                mx: pathname === "/settings/templates"?"": "auto",
                display: "flex", // ✅ added
                flexDirection: "column", // ✅ added
                minHeight: "100vh", // ✅ ensures full screen height\
                overflow:"auto",
                pb:"3rem"
              }}
            >
              <DrawerHeader />

              <ReactQueyProvider>
                <HydrationBoundary state={dehydrate(query)}>
                  <QueryLayout>
                    <TooltipProvider delayDuration={100}>
                      <Outlet />
                    </TooltipProvider>
                  </QueryLayout>
                </HydrationBoundary>
              </ReactQueyProvider>
            </Box>
          </ThemProviderMui>
        </Box>
      </ModalProvider>

      {/* === chat bot ====== */}
      {/* {window.location.pathname !== "/store/conversations" && <HelperIcon />} */}

      <div className="h-10 fixed bottom-0 bg-white border-t dark:bg-neutral-400/30 dark:text-neutral-300 text-xs w-full flex justify-end items-center px-3">
        <span className="select-none text-xs">
          <Trans>
            Copyright 2024 All Rights Are Reserved | © Ayaboo by Haash.Tech
          </Trans>
        </span>
      </div>
    </div>
  );
}
