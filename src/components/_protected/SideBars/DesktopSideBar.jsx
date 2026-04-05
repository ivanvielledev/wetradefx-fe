// mui
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

// main
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SignalWifi4BarOutlinedIcon from "@mui/icons-material/SignalWifi4BarOutlined";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// helper
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

//
import SideBarHeader from "./SideBarHeader";
import SideBarListItem from "./SideBarListItem";

const DesktopSideBar = ({ me, drawerOpen, drawerWidth, toggleDrawerOpen }) => {
    const admin = me?.globalRole === "superadmin" || me?.globalRole === "admin";

    // main nav list
    const MAIN_LIST = [
        {
            id: 0,
            title: `Home`,
            icon: <DashboardOutlinedIcon fontSize="small" />,
            to: `/d`,
        },
        ...(!admin
            ? [
                  {
                      id: 2,
                      title: "Signals",
                      icon: <SignalWifi4BarOutlinedIcon fontSize="small" />,
                      to: "/d/signals",
                  },
              ]
            : []),
        {
            id: 1,
            title: admin ? "Signals" : "Copy Trades",
            icon: admin ? (
                <SignalWifi4BarOutlinedIcon fontSize="small" />
            ) : (
                <ContentCopyOutlinedIcon fontSize="small" />
            ),
            to: admin ? `/d/signals` : `/d/copy-trades`,
        },
        {
            id: 3,
            title: "Members",
            icon: <PeopleAltOutlinedIcon fontSize="small" />,
            to: `/d/members`,
        },
        {
            id: 10,
            title: "MT5",
            icon: <TerminalOutlinedIcon fontSize="small" />,
            to: `/d/mt5`,
        },
    ];

    // helper nav list
    const HELPER_NAV_LIST = [
        {
            id: 1,
            title: `About`,
            icon: <InfoOutlinedIcon fontSize="small" />,
            to: `/d/about`,
        },
        // {
        //     id: 2,
        //     title: "Help",
        //     icon: <HelpOutlineOutlinedIcon fontSize="small" />,
        //     to: `/d/help`,
        // },
    ];

    return (
        <Drawer
            variant="permanent"
            open={drawerOpen}
            sx={theme => {
                const opened = {
                    width: drawerWidth,
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflowX: "hidden",
                };

                const closed = {
                    width: `calc(${theme.spacing(8)} + 1px)`,
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    overflowX: "hidden",
                };

                const drawerStyles = drawerOpen ? opened : closed;
                return {
                    width: drawerWidth,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                    ...drawerStyles,
                    "& .MuiDrawer-paper": drawerStyles,
                };
            }}
        >
            <SideBarHeader drawerOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} />

            {/* navigation */}
            <List dense sx={{ flex: 1, overflowX: "hidden", overflowY: "auto" }}>
                {MAIN_LIST.map(item => (
                    <SideBarListItem key={item.id} item={item} drawerOpen={drawerOpen} />
                ))}
            </List>

            <Divider />

            {/* about */}
            <List dense sx={{ overflowX: "hidden", overflowY: "auto" }}>
                {HELPER_NAV_LIST.map(item => (
                    <SideBarListItem key={item.id} item={item} drawerOpen={drawerOpen} />
                ))}
            </List>
        </Drawer>
    );
};

export default DesktopSideBar;
