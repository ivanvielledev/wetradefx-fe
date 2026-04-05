// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// react-router-dom
import { Link as RouterLink } from "react-router-dom";

//
import LoginForm from "./LoginForm";

// hooks
import useTitle from "../../../hooks/useTitle";

const LoginPage = () => {
    useTitle("WeTradeFX - Login");

    return (
        <Box
            sx={{
                flex: 1,
                maxWidth: 500,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: 4,
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" color="text.primary" fontWeight={600}>
                    Login to your account
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Stay connected with the community and access your workspace
                </Typography>
            </Box>

            {/* form */}
            <LoginForm />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    component={RouterLink}
                    to="forgot-password"
                    size="small"
                    sx={{ textTransform: "none" }}
                >
                    Forgot password?
                </Button>
            </Box>

            <Box
                sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 0.5,
                }}
            >
                <Typography variant="caption" color="text.secondary">
                    Don't have an account yet?
                </Typography>
                <Button
                    size="small"
                    variant="text"
                    component={RouterLink}
                    to="/register"
                    color="success"
                    sx={{ textTransform: "none" }}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;
