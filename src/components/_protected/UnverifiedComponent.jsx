// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MUILink from "@mui/material/Link";
import Button from "@mui/material/Button";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

// hooks
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";

const UnverifiedComponent = () => {
    const { me, getMe, userLoading, updateUserStatus } = useAuth();
    const { setSnackbar } = useSnackbar();

    const handleApply = async e => {
        e.preventDefault();

        const result = await updateUserStatus({ userId: me?._id, status: "pending" });

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
            message: "Application submitted",
            severity: "success",
        });

        await getMe();
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="overline" fontWeight={700}>
                        Complete verification requirements to have full access to your dashboard.
                    </Typography>
                </Box>

                <Typography variant="overline">Requirements:</Typography>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {/* step 1 */}
                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
                        <Typography variant="body1">
                            1. Register trading account with our partner broker{" "}
                            <b>Vantage Markets</b>:
                        </Typography>
                        <MUILink href="https://vigco.co/la-com-inv/ivanvielled" target="_blank">
                            https://vigco.co/la-com-inv/ivanvielled
                        </MUILink>

                        <Typography variant="caption" color="text.secondary">
                            *Complete the registration and verification process (estimate time: 5 -
                            30minutes)
                        </Typography>
                    </Box>

                    {/* step 2 */}
                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
                        <Typography variant="body1">
                            2. Minimum deposit of $100 is required after creating an account with
                            the broker
                        </Typography>
                    </Box>

                    {/* step 3 */}

                    <Box sx={{ mb: 4, display: "flex", flexDirection: "column" }}>
                        <Typography variant="body1">
                            3. Click the button below and wait for admin approval
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleApply}
                        loading={userLoading}
                        startIcon={me?.status === "pending" ? <CheckOutlinedIcon /> : undefined}
                        disabled={me?.status === "pending"}
                    >
                        {me?.status === "pending" ? "Applied" : "Apply"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default UnverifiedComponent;
