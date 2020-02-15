import React, { Fragment } from "react";
import clsx from "clsx";
import LeftMenu from "../Loop/LeftMenu";
// CORE & STYLES
import {
  Menu,
  MenuItem,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../../App.css";
import { store } from "../../store/store"
// ICONS
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import WarningIcon from "@material-ui/icons/Warning";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SimCardIcon from '@material-ui/icons/SimCard';
import { withRouter } from "react-router-dom";

const drawerWidth = 240;
const listIcon = [
  {
    name: "Dashboard",
    value: <DashboardIcon />
  },
  {
    name: "Transactions",
    value: <LocalAtmIcon />
  },
  {
    name: "Product",
    value: <SimCardIcon />
  },
  {
    name: "Report",
    value: <WarningIcon />
  },
];
const listIconBottom = [
  {
    name: "Logout",
    value: <ExitToAppIcon />
  }
];
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#306855"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1,
    fontFamily: "antipasto_prodemibold",
    fontSize: "2.5em",
    letterSpacing: "1.1px"
  },
  wrapBar: {
    flexGrow: 1
  },
  greeting: {
    fontFamily: "antipasto_prodemibold",
    marginRight: "0.5em"
  }
}));

function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Icon button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openIcon = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePages = pages => {
    pages = pages.toLowerCase();
    props.history.push(`/${pages}`);
  };
  const handleLogout = async () => {
    await store.setState({isFromLogout: true})
    await localStorage.removeItem("token");
    await store.setState({isLoggedIn: false})
    await props.history.push("/");
  };
  return (
    <Fragment>
      {/* AppBar */}
      <div className={classes.wrapBar}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" noWrap className={classes.title}>
              Tukulsa Admin
            </Typography>
            {/* icon button */}
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography variant="h6" className={classes.greeting}>
                  Halooohh
                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={openIcon}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* EOF App bar */}
      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <img
            src={require("../../images/tukulsalogo-bg-none.png")}
            alt="Tukulsa"
            width="80%"
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <LeftMenu
            listIcon={listIcon}
            changePages={handleChangePages}
            {...props}
          />
        </List>
        <Divider />
        <List>
          <LeftMenu
            listIcon={listIconBottom}
            changePages={handleChangePages}
            handleLogout={handleLogout}
            {...props}
          />
        </List>
      </Drawer>
      {/* EOF Drawer */}
    </Fragment>
  );
}

export default withRouter(MiniDrawer);
