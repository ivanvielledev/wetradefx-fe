// mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MUILink from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

// react-router-dom
import { Link as RouterLink } from "react-router-dom";

// hooks
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";

const DashboardAppBar = ({ toggleDrawerOpen }) => {
    const { me, logout } = useAuth();
    const { setSnackbar } = useSnackbar();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    const handleLogout = async e => {
        e.preventDefault();

        const result = await logout();

        if (!result?.success) {
            setSnackbar({
                open: true,
                message: result?.error,
                severity: "error",
            });

            return;
        }

        setSnackbar({
            open: true,
            message: result?.message,
            severity: "success",
        });
    };

    return (
        <AppBar position="sticky">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: isMdDown ? "space-between" : "flex-end",
                    alignItems: "center",
                }}
            >
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
                    {isMdDown && (
                        <IconButton onClick={toggleDrawerOpen}>
                            <MenuOutlinedIcon />
                        </IconButton>
                    )}

                    <MUILink
                        component={RouterLink}
                        to="/d"
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "text.primary",
                            textDecoration: "none",
                        }}
                    >
                        WeTradeFX
                    </MUILink>
                </Box>

                {/* actions */}
                <Box sx={{ display: "flex", gap: 1 }}>
                    {/* user */}
                    {!isMdDown && (
                        <MUILink
                            component={RouterLink}
                            to={`/u/${me?._id}`}
                            sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: 1.5,
                                color: "primary.main",
                                textDecoration: "none",
                            }}
                        >
                            <Avatar src={me?.avatar}>
                                <Typography variant="body1" fontWeight={700}>
                                    {me?.username?.charAt(0).toUpperCase()}
                                </Typography>
                            </Avatar>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography variant="caption">{me?.username}</Typography>
                                <Typography variant="caption">{me?.email}</Typography>
                            </Box>
                        </MUILink>
                    )}

                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                    {/* logout */}
                    <Tooltip title="Logout" placement="bottom">
                        <IconButton onClick={handleLogout} color="error">
                            <ExitToAppOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardAppBar;
