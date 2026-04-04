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
    const { userLoading, me, getMe, logout } = useAuth();

    useEffect(() => {
        if (!me) return;

        socket.connect();

        socket.on("connect_error", async err => {
            if (err.message === "TOKEN_EXPIRED") {
                console.log("Socket token expired. Refreshing...");

                try {
                    await getMe();

                    // manually connect socket again after refreshing token
                    socket.connect();
                } catch (err) {
                    console.error("Session expired. Logging out...");
                    await logout();
                }
            }
        });

        return () => {
            socket.off("connect_error");
            socket.disconnect();
        };
    }, [me, getMe]);

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
