// react
import { useEffect } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//
import GoBackButton from "../../../components/_root/Buttons/GoBackButton";

// data table
import CopyTradesHistoryTable from "./data/CopyTradesHistoryTable";

// hooks
import useAuth from "../../../hooks/useAuth";
import useTrade from "../../../hooks/useTrade";

// sockets
import { socket } from "../../../app/socket/socketClient";

const CopyTradesHomePage = () => {
    const { me } = useAuth();
    const { tradeHistory, getTradeHistory } = useTrade();

    const vip = me?.subscription?.plan === "vip" && me?.subscription?.status === "active";

    useEffect(() => {
        getTradeHistory();
    }, []);

    // socket events
    useEffect(() => {
        socket.on("new_mt5_signal", getTradeHistory);
        socket.on("modified_mt5_signal", getTradeHistory);
        socket.on("closed_mt5_signal", getTradeHistory);

        return () => {
            socket.off("new_mt5_signal", getTradeHistory);
            socket.off("modified_mt5_signal", getTradeHistory);
            socket.off("closed_mt5_signal", getTradeHistory);
        };
    }, [getTradeHistory]);

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 4 }}>
                <GoBackButton label="Go back to Dashboard" destination={`/d`} />
            </Box>

            {/* trades history */}
            {vip ? (
                <Box sx={{ flex: 1, py: 4 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="overline" fontWeight={700}>
                            Copy trade history
                        </Typography>

                        {/* trades table */}
                        <CopyTradesHistoryTable trades={tradeHistory} />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="overline" fontWeight={700}>
                        Subscription VIP tier required to enable copy trading services
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default CopyTradesHomePage;
