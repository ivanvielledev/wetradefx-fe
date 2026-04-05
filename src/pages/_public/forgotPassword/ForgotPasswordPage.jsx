// react
import { useState } from "react";

// mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUILink from "@mui/material/Link";

// react-router-dom
import { Link as RouterLink } from "react-router-dom";

// hooks
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";

const ForgotPasswordPage = () => {
    const { forgotPassword, userLoading } = useAuth();
    const { setSnackbar } = useSnackbar();
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleResetRequest = async e => {
        e.preventDefault();

        const result = await forgotPassword({ email });

        if (!result?.success) {
            setSnackbar({
                open: true,
                message: result?.error,
                severity: "error",
            });

            setSubmitted(false);

            return;
        }

        setSnackbar({
            open: true,
            message: result?.message,
            severity: "success",
        });

        setSubmitted(true);
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
            }}
        >
            <Container maxWidth="xs">
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Forgot Password?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Enter your email address and we'll send you a link to reset your password.
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {submitted ? (
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h6" color="success.main" gutterBottom>
                            Check your inbox! 📧
                        </Typography>
                        <Typography variant="body2">
                            If an account exists with the email you provided, you will receive a
                            reset link shortly.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {/* Your Existing TextField and Button here */}
                        <Button
                            onClick={handleResetRequest}
                            disabled={userLoading || !email}
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: "bold",
                            }}
                        >
                            {userLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </>
                )}

                <Box sx={{ mt: 2, textAlign: "center" }}>
                    <MUILink component={RouterLink} to="/" variant="body2" underline="hover">
                        Back to Login
                    </MUILink>
                </Box>
            </Container>
        </Box>
    );
};

export default ForgotPasswordPage;
