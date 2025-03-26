import {
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { MenuIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FullViewScreen from "@/hooks/FullViewScreen";
import useNavigateClicks from "@/hooks/useClicks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NotificationBarSheet from "./Notification_Sheet";
import { Button } from "../ui/button";
import { makeToast } from "@/utils/toaster";

import { useAppSelector } from "@/redux/hook";
import { useModal } from "@/providers/context/context";
import { FullScreenSvg, GlobSvg } from "../icons/glob-icon";

type Props = {
  open: boolean;
  drawerWidth: number;
  title?: string;
  handleDrawerOpen: () => void;
  logo?: string;
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const languages = [
//   { label: "English",icon:"circle-flags:uk", value: "en" },
//   { label: "Hindi",icon:"emojione:flag-for-india", value: "hi" },
//   { label: "Arabic",icon:"emojione:flag-for-saudi-arabia", value: "ar" },
//   { label: "Malayalam",icon:"emojione:flag-for-india", value: "ml" },
// ];

export default function NavAppBar({
  open,
  drawerWidth,
  handleDrawerOpen,
}: Props) {
  // handle full screen mode ====
  const { handleFullScreen } = FullViewScreen();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { currentAdmin } = useAppSelector((state) => state.admin);
  const { handleLogout } = useModal();
  // const { i18n, t } = useTranslation();

  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };

  // click
  const { handleClick } = useNavigateClicks();

  // Clear cache function
  const handleClearCache = () => {
    if (window.caches) {
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => caches.delete(key)));
      });
    }
    localStorage.clear();
    sessionStorage.clear();
    makeToast("Cache cleared successfully!"); // Show success toast
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none", // Remove the shadow here
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        boxShadow: " rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        display: "flex",
        // borderBottom:"0.9px solid #4E4E4E"
      }}
      open={open}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          // borderBottom:"0.9px solid #4E4E4E"
        }}
      >
        <Toolbar>
          <div className="">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                marginLeft: isLargeScreen ? 5 : 0,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <Typography variant="h6" noWrap component="div">
            {/* <img src={MyLogo} alt="My Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
          </Typography>
        </Toolbar>

        {/* ======  navbar right side starts here =======
        ==================================================== */}

        <Box mr="1rem" display="flex" gap="" alignItems="center">
          {/* Full screen btn ======
            ========================== */}
            <Tooltip title="Full Screen">
            <div className="">
              <IconButton onClick={handleFullScreen}>
                {/* <Fullscreen /> */}
                <FullScreenSvg />
                {/* <Icon icon='iconamoon:screen-full' /> */}
              </IconButton>
            </div>
          </Tooltip>

      

          {/* Home btn ======
            ========================== */}

          <Tooltip title="home">
            <div className="">
              <IconButton onClick={() => handleClick("/dashboard")}>
                {/* <PublicOutlined /> */}
                <GlobSvg />
              </IconButton>
            </div>
          </Tooltip>

          {/* Notification btn ======
            ========================== */}

          <NotificationBarSheet />

          {/* Clear Cache Button */}
          <Tooltip title="Clear Cache">
            <div className="">
              <IconButton onClick={handleClearCache}>
                <img
                  src="/icons/clear-catche.svg"
                  alt="clear cache"
                  width={23}
                  height={23}
                />
                {/* <CleaningServicesIcon /> */}
              </IconButton>
            </div>
          </Tooltip>

          {/* User Details avatar and more settings =====
        ================================================ */}
          <Dialog>
            <DialogTrigger>
              <div className="flex gap-3 ml-5">
              <div className="flex flex-col text-start">
                <span className=" text-gray-700 text-sm">
                    {" "}
                    {currentAdmin?.name || currentAdmin?.emailId?.split("@")[0]}
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    {currentAdmin?.role}
                  </span>
                
                </div>
                {/* ====== */}
                 {/* ====== */}
                 <Avatar className="w-9 h-9">
                  <AvatarImage src="https://github.com/shadcn." />
                  <AvatarFallback className=" bg-bgSoft backdrop-blur-sm">
                  {currentAdmin?.name?.charAt(0) || "Seller"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  Logout from the application
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => {
                      // Cookie.remove("ad_b2b_tkn");
                      // window.location.href = "/login";  // Redirect to login page after logout
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* =============================== */}
        </Box>
      </Box>
    </AppBar>
  );
}
