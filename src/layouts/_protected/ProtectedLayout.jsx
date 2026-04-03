// mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// react-router-dom
import { Outlet, Navigate } from "react-router-dom";

//
import DashboardAppBar from "../../components/_protected/AppBar/DashboardAppBar";
import DesktopSideBar from "../../components/_protected/SideBars/DesktopSideBar";
import MobileSideBar from "../../components/_protected/SideBars/MobileSideBar";
import UnverifiedComponent from "../../components/_protected/UnverifiedComponent";

// providers
import { SignalProvider } from "../../contexts/SignalContextProvider";

// hooks
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useAuth from "../../hooks/useAuth";
import useAppTheme from "../../hooks/useAppTheme";

const ProtectedLayout = () => {
    const { me } = useAuth();

    const { drawerOpen, toggleDrawerOpen } = useAppTheme();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    const drawerWidth = 240;

    const applicant = me?.status === "pending" || me?.status === "new";

    if (!me) return <Navigate to="/" replace={true} />;

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: "column", md: "row" } }}>
            {/* desktop sidebar */}
            {!isMdDown && (
                <DesktopSideBar
                    drawerWidth={drawerWidth}
                    drawerOpen={drawerOpen}
                    toggleDrawerOpen={toggleDrawerOpen}
                />
            )}

            {/* mobile sidebar */}
            {isMdDown && (
                <MobileSideBar
                    drawerWidth={drawerWidth}
                    drawerOpen={drawerOpen}
                    toggleDrawerOpen={toggleDrawerOpen}
                />
            )}

            {/* content */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* app bar */}
                <DashboardAppBar toggleDrawerOpen={toggleDrawerOpen} />

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        maxWidth:
                            drawerOpen && !isMdDown ? `calc(100vw - ${drawerWidth}px)` : "100vw",
                    }}
                >
                    {/* main content */}
                    <Container
                        maxWidth="xl"
                        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                    >
                        {applicant && <UnverifiedComponent />}

                        {!applicant && (
                            <SignalProvider>
                                <Outlet />
                            </SignalProvider>
                        )}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default ProtectedLayout;
