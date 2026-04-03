// react
import { useEffect } from "react";

// mui
import Box from "@mui/material/Box";

// react-router-dom
import { Outlet } from "react-router-dom";

//
import GlobalSnackbar from "../../components/_root/Alerts/GlobalSnackbar";
import RootLoader from "../../components/_root/Loaders/RootLoader";

import useAuth from "../../hooks/useAuth";
import { socket } from "../../app/socket/socketClient";

const RootLayout = () => {
    const { userLoading, me } = useAuth();

    useEffect(() => {
        if (me) socket.connect();

        return () => socket.disconnect();
    }, [me]);

    // loader
    if (userLoading) return <RootLoader />;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* global snackbar */}
            <GlobalSnackbar
                origin={{ vertical: "bottom", horizontal: "right" }}
                hideDuration={4000}
            />

            <Outlet />
        </Box>
    );
};

export default RootLayout;
