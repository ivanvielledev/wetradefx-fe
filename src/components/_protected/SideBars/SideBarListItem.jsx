// mui
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

// react-router-dom
import { NavLink } from "react-router-dom";

// hooks
import useAuth from "../../../hooks/useAuth";

const SideBarListItem = ({ item, drawerOpen }) => {
    const { me } = useAuth();

    const authorized = me?.status === "active";

    return (
        <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip title={item.title} placement="right" disableHoverListener={drawerOpen}>
                <ListItemButton
                    component={NavLink}
                    to={item.to}
                    end={item.id === 0}
                    sx={{
                        minHeight: 48,
                        px: 2.5,
                        justifyContent: drawerOpen ? "initial" : "center",
                        "&.active": {
                            color: "primary.main",
                        },
                    }}
                    disabled={!authorized}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            justifyContent: "center",
                            mr: drawerOpen ? 3 : "auto",
                            color: "inherit",
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.title}
                        sx={{
                            opacity: drawerOpen ? 1 : 0,
                            whiteSpace: "nowrap",
                            transition: theme =>
                                theme.transitions.create("opacity", {
                                    easing: theme.transitions.easing.sharp,
                                    duration: theme.transitions.duration.shortest,
                                }),
                        }}
                    />
                </ListItemButton>
            </Tooltip>
        </ListItem>
    );
};

export default SideBarListItem;
