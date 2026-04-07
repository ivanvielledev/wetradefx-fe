// react
import { useState, useEffect } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

//
import GoBackButton from "../../../../components/_root/Buttons/GoBackButton";

// hooks
import useAuth from "../../../../hooks/useAuth";
import useSnackbar from "../../../../hooks/useSnackbar";

// broker servers
const SERVERS = [
    "VantageInternational-Demo",
    "VantageInternational-Live",
    "VantageInternational-Live 1",
    "VantageInternational-Live 2",
    "VantageInternational-Live 3",
    "VantageInternational-Live 4",
    "VantageInternational-Live 5",
    "VantageInternational-Live 6",
    "VantageInternational-Live 7",
    "VantageInternational-Live 8",
    "VantageInternational-Live 9",
    "VantageInternational-Live 10",
    "VantageInternational-Live 11",
    "VantageInternational-Live 12",
    "VantageInternational-Live 13",
    "VantageInternational-Live 14",
    "VantageInternational-Live 15",
    "VantageInternational-Live 16",
    "VantageInternational-Live 17",
];

const MT5Page = () => {
    const { me, updateUserSubscription, getMe, mt5UpdateAccount, generateApiKey, userLoading } =
        useAuth();
    const { setSnackbar } = useSnackbar();

    const authorized = me?.globalRole === "superadmin" || me?.globalRole === "admin";

    const [mt5, setMt5] = useState({
        userId: null,
        login: "",
        password: "",
        server: "",
        riskPercentage: 1,
    });

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(prev => !prev);

    useEffect(() => {
        if (me) {
            const mt5Account = me?.mt5Account;

            setMt5({
                userId: me?._id,
                login: mt5Account.login || "",
                password: mt5Account.password || "",
                server: mt5Account.server || "",
                riskPercentage: mt5Account.riskPercentage || 1,
            });
        }
    }, [me]);

    // update mt5 account
    const handleUpdate = async e => {
        e.preventDefault();

        const { userId, login, password, server, riskPercentage } = mt5;

        const result = await mt5UpdateAccount({
            userId,
            login,
            password,
            server,
            riskPercentage,
        });

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

    // admin generate api key
    const handleGenerateApiKey = async e => {
        e.preventDefault();

        const result = await generateApiKey({ userId: me?._id });

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

    const subscribed =
        me?.subscription?.plan === "vip" ||
        me?.globalRole === "superadmin" ||
        me?.globalRole === "admin";

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 4 }}>
                <GoBackButton label="Go back to Dashboard" destination={`/d`} />
            </Box>

            <Container
                maxWidth="sm"
                sx={{
                    flex: 1,
                    width: "100%",
                    m: "auto",
                    py: 4,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {!subscribed && (
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

                {subscribed && (
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h6">MetaTrader5 Account</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Connect your MT5 account to enable copy trading
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                *All accounts are stored and heavily encrypted for the safety of the
                                users
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleUpdate}
                            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
                        >
                            <TextField
                                type="text"
                                fullWidth
                                autoComplete="off"
                                label="Login"
                                value={mt5.login}
                                onChange={e => {
                                    const val = e.target.value;
                                    // Only allow digits (prevents letters/symbols)
                                    if (val === "" || /^[0-9\b]+$/.test(val)) {
                                        setMt5(prev => ({ ...prev, login: Number(val) }));
                                    }
                                }}
                                helperText="MT5 Login e.g: 24648233"
                            />

                            <TextField
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                autoComplete="off"
                                label="Password"
                                value={mt5.password}
                                onChange={e =>
                                    setMt5(prev => ({ ...prev, password: e.target.value }))
                                }
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <IconButton onClick={toggleShowPassword} edge="end">
                                                {showPassword ? (
                                                    <VisibilityOutlinedIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        ),
                                    },
                                }}
                            />

                            <TextField
                                select
                                label="Server"
                                value={mt5.server}
                                onChange={e =>
                                    setMt5(prev => ({ ...prev, server: e.target.value }))
                                }
                            >
                                <MenuItem value="">
                                    <em>Select a server</em>
                                </MenuItem>

                                {SERVERS.map((server, index) => (
                                    <MenuItem key={index} value={server}>
                                        {server}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                type="number"
                                fullWidth
                                autoComplete="off"
                                label="Risk percentage"
                                value={mt5.riskPercentage}
                                onChange={e =>
                                    setMt5(prev => ({ ...prev, riskPercentage: e.target.value }))
                                }
                            />

                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" variant="contained">
                                    Save
                                </Button>
                            </Box>
                        </Box>

                        {/*  api key */}
                        {authorized && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    mt: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                        <Box>
                                            <Typography variant="overline">API_KEY: </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ wordBreak: "break-all" }}
                                            >
                                                {me?.apiKey || "{Generate API Key}"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={handleGenerateApiKey}
                                            >
                                                Generate new API_KEY
                                            </Button>
                                        </Box>
                                    </Box>

                                    <Typography variant="caption" color="text.disabled">
                                        *API_KEYS are unique per admin used for connecting your
                                        wetradefx account to third-party platforms
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default MT5Page;
