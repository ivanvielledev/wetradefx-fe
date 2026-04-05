// react
import { useEffect } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

//
import GoBackButton from "../../../components/_root/Buttons/GoBackButton";

// data table
import CopyTradesHistoryTable from "./data/CopyTradesHistoryTable";

// hooks
import useAuth from "../../../hooks/useAuth";
import useTrade from "../../../hooks/useTrade";
import useSnackbar from "../../../hooks/useSnackbar";

// sockets
import { socket } from "../../../app/socket/socketClient";

const CopyTradesHomePage = () => {
    const { me, userLoading, updateUserSubscription, getMe } = useAuth();
    const { tradeHistory, getTradeHistory } = useTrade();
    const { setSnackbar } = useSnackbar();

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

    // subscriptions
    const handleUpdateUserSubscription = async (e, userId, plan, status) => {
        e.preventDefault();

        const result = await updateUserSubscription({ userId, plan, status });

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

        await getMe();
    };

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
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="overline" fontWeight={700}>
                        Subscription VIP tier required to enable copy trading services
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            onClick={e =>
                                handleUpdateUserSubscription(e, me?._id, "free", "pending")
                            }
                            loading={userLoading}
                            startIcon={
                                me?.subscription?.status === "pending" ? (
                                    <CheckOutlinedIcon />
                                ) : undefined
                            }
                            disabled={me?.subscription?.status === "pending"}
                        >
                            {me?.subscription?.status === "pending"
                                ? "Applied for vip subscription"
                                : "Apply for vip subscription"}
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default CopyTradesHomePage;
