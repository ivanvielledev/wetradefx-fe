import { useState } from "react";
import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
    InputAdornment,
    IconButton,
    LinearProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, LockResetOutlined } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";

const ResetPasswordPage = () => {
    const { resetToken } = useParams();
    const { userLoading, resetPassword } = useAuth();
    const { setSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setSnackbar({
                open: true,
                message: "Passwords do not match",
                severity: "warning",
            });
        }

        const result = await resetPassword({ resetToken, password });

        if (!result?.success) {
            return setSnackbar({
                open: true,
                message: result?.error || "Reset failed",
                severity: "error",
            });
        }

        setSnackbar({
            open: true,
            message: "Password updated successfully!",
            severity: "success",
        });

        navigate("/", { replace: true });
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                p: 3,
                bgcolor: "background.default",
            }}
        >
            <Container maxWidth="xs">
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <LockResetOutlined sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Set New Password
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please enter your new password below to regain access to your WeTradeFX
                        account.
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleResetPassword}>
                    <TextField
                        fullWidth
                        required
                        label="New Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        required
                        label="Confirm New Password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        error={confirmPassword !== "" && password !== confirmPassword}
                        helperText={
                            confirmPassword !== "" && password !== confirmPassword
                                ? "Passwords do not match"
                                : ""
                        }
                        sx={{ mb: 3 }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={userLoading || !password || password !== confirmPassword}
                        sx={{
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                    >
                        {userLoading ? "Updating..." : "Update Password"}
                    </Button>
                </Box>

                {userLoading && <LinearProgress sx={{ mt: 2, borderRadius: 2 }} />}
            </Container>
        </Box>
    );
};

export default ResetPasswordPage;
