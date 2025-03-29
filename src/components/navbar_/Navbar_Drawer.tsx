import React from "react";
import NavigationList from "./navigation";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import MuiDrawer from "@mui/material/Drawer";
import Logo from "./Logo";
import { useLocation, useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse"; // Import Collapse
import NavAppBar from "./Appbar";
import { useWindowWidth } from "@react-hook/window-size";

const drawerWidth = 290;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0, // Set width to 0 when collapsed
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "0.1rem", // equivalent to py-4 in Tailwind
  paddingBottom: "1rem", // equivalent to py-4 in Tailwind
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  // zIndex: theme.zIndex.drawer + 2,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#000", // Black background
      color: "#fff", // White text color (optional)
      // zIndex: theme.zIndex.drawer + 2,
    },
    "& .MuiListItemIcon-root": {
      color: "#2B90EC", // Icon color
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#000", // Black background
      color: "#fff", // White text color (optional)
    },
    "& .MuiListItemIcon-root": {
      color: "#2B90EC", // Icon color
    },
  }),
}));

export default function NavbarDrawer() {
  // const { currentAdmin } = useAppSelector((state)=>state.admin);
  const onlyWidth = useWindowWidth();

  const { navigationItems } = NavigationList();
  const theme = useTheme();
  const [open, setOpen] = React.useState(()=>{
    return onlyWidth > 1024;
  });
  const [collapseStates, setCollapseStates] = React.useState<{
    [key: number]: boolean;
  }>({}); // Track collapse state
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const pathname = location.pathname.replace("/admin/", "");

  //   alert(pathname)

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setCollapseStates({});
  };

  // const handleCollapseToggle = (index: number) => {
  //   setOpen(true);

  //   setCollapseStates((prev) => ({
  //     ...prev,
  //     [index]: !prev[index], // Toggle collapse state for this index
  //   }));
  // };
  const handleCollapseToggle = (index: number) => {
    setOpen(true);

    setCollapseStates((prev) => {
      // Collapse all other items except the clicked one
      const newCollapseStates = Object.keys(prev).reduce((acc, key) => {
        acc[parseInt(key)] =
          parseInt(key) === index ? !prev[parseInt(key)] : false;
        return acc;
      }, {} as { [key: number]: boolean });

      return {
        ...newCollapseStates,
        [index]: !prev[index], // Toggle the selected collapse
      };
    });
  };

  const handleNavigation = (segment: string | undefined) => {
    if (segment) {
      setCollapseStates({});
      navigate(segment); // Navigate to the specified segment
    }
  };

  return (
    <>
      {/* App bar here */}
      <NavAppBar
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1E1E1E", // Black background
            color: "#fff", // White text color (optional)
          },
          "& .MuiListItemIcon-root": {
            color: "#2B90EC", // Icon color
          },
        }}
      >
        <DrawerHeader className="">
          <Logo />
          {open && (
            <>
              <div className="">
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon className="text-white" />
                  )}
                </IconButton>
              </div>
            </>
          )}
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          {navigationItems.map((item, index) => {
            // console.log(item.segment);
            // console.log(pathname);

            if (item.isChild) {
              return (
                <React.Fragment key={index}>
                  <ListItemButton
                    onClick={() => handleCollapseToggle(index)}
                    sx={{
                      color: pathname.startsWith(item.segment)
                        ? "#fff"
                        : "gray",
                      bgcolor: pathname.startsWith(item.segment) ? "black" : "",
                      primaryTypographyProps: {
                        fontSize: "15px", // Adjust child item font size
                      },
                      borderRadius: "10px",
                      mx: open ? "10px" : "",
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: "15px", // Adjust child item font size
                        // Optional: Change text color
                      }}
                    />
                    {collapseStates[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={collapseStates[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children?.map((child, childIndex) => (
                        <ListItemButton
                          key={childIndex}
                          sx={{ pl: 4 }}
                          onClick={() => handleNavigation(child.segment)}
                        >
                          {child.segment === pathname ? (
                            <label className="radio-button">
                              <input
                                id={`option-${childIndex}`} // Use unique IDs for each input
                                name="radio-group"
                                type="radio"
                                // checked
                                checked={child.segment === pathname}
                              />
                              <span className="radio-checkmark"></span>
                            </label>
                          ) : (
                            <label className="radio-button">
                              <input
                                id={`option-${childIndex}`} // Use unique IDs for each input
                                name="radio-group"
                                type="radio"
                              />
                              <span className="radio-checkmark"></span>
                            </label>
                          )}

                          <ListItemText
                            primaryTypographyProps={{
                              fontSize: "0.75rem",
                              color:
                                child.segment === pathname ? "#fff" : "gray",
                            }}
                            primary={child.title}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            } else {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={
                    {
                      // backgroundColor:
                      //   item.segment === pathname
                      //     ? "#818080cc"
                      //     : "undefined,opacity: 0.8", // Use undefined instead of false
                    }
                  }
                >
                  <ListItemButton
                    onClick={() => handleNavigation(item.segment)}
                    sx={{
                      backgroundColor:
                        item.segment === pathname
                          ? "black"
                          : "undefined,opacity: 0.8",
                      mx: open ? "10px" : "",
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        display: open || isLargeScreen ? "block" : "none",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        display: open || isLargeScreen ? "block" : "none",
                        color: item.segment === pathname ? "#fff" : "gray",
                      }}
                      primaryTypographyProps={{
                        fontSize: "15px", // Adjust font size for non-child items
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            }
          })}
        </List>
      </Drawer>
    </>
  );
}
