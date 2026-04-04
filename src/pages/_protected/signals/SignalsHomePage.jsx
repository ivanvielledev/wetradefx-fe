// react
import { useState, useEffect } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//
import GoBackButton from "../../../components/_root/Buttons/GoBackButton";
import SignalHistory from "../dashboard/components/SignalHistory";

// hooks
import useSignal from "../../../hooks/useSignal";

// socket
import { socket } from "../../../app/socket/socketClient";

const SignalsHomePage = () => {
    const { signals, getSignals } = useSignal();

    useEffect(() => {
        getSignals();
    }, []);

    // socket events
    useEffect(() => {
        socket.on("new_mt5_signal", getSignals);
        socket.on("modified_mt5_signal", getSignals);
        socket.on("closed_mt5_signal", getSignals);

        return () => {
            socket.off("new_mt5_signal", getSignals);
            socket.off("modified_mt5_signal", getSignals);
            socket.off("closed_mt5_signal", getSignals);
        };
    }, [getSignals]);

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 4 }}>
                <GoBackButton label="Go back to Dashboard" destination={`/d`} />
            </Box>

            {/* signals history */}
            <Box sx={{ flex: 1, py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="overline" fontWeight={700}>
                        Signal history
                    </Typography>

                    {/* trades table */}
                    <SignalHistory signals={signals} />
                </Box>
            </Box>
        </Box>
    );
};

export default SignalsHomePage;
