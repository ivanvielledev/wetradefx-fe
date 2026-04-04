// react
import { useEffect, useMemo } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

//
import SignalDisplay from "./components/SignalDisplay";
import SignalHistory from "./components/SignalHistory";

// hooks
import useTitle from "../../../hooks/useTitle";
import useSignal from "../../../hooks/useSignal";

// socket
import { socket } from "../../../app/socket/socketClient";

const DashboardHomePage = () => {
    useTitle(`WeTradeFX`);

    const { signals, getSignals } = useSignal();

    const filteredSignals = useMemo(() => {
        if (!signals) return { openSignals: [] };

        return {
            openSignals: signals.filter(signal => signal.status === "open"),
        };
    }, [signals]);

    useEffect(() => {
        getSignals();
    }, []);

    // socket events
    useEffect(() => {
        socket.on("new_mt5_signal", getSignals);
        socket.on("modified_mt5_signal", getSignals);
        socket.on("closed_mt5_signal", getSignals);
        socket.on("modified_pnl_signal", getSignals);

        return () => {
            socket.off("new_mt5_signal", getSignals);
            socket.off("modified_mt5_signal", getSignals);
            socket.off("closed_mt5_signal", getSignals);
            socket.off("modified_pnl_signal", getSignals);
        };
    }, [getSignals]);

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, py: 4, display: "flex", flexDirection: "column" }}>
                {/* signals */}
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="overline" fontWeight={700}>
                            Live signals
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {filteredSignals["openSignals"].length === 0
                            ? "No open signals."
                            : filteredSignals["openSignals"].map(openSignal => (
                                  <SignalDisplay key={openSignal._id} signal={openSignal} />
                              ))}
                    </Grid>
                </Box>

                {/* signals data table */}
                <Box sx={{ flex: 1, py: 4 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="overline" fontWeight={700}>
                            Signal history
                        </Typography>

                        {/* signals table */}
                        <SignalHistory signals={signals} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardHomePage;
