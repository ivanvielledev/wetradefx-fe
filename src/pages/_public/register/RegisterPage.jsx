import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUILink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import RegisterForm from "./RegisterForm";

import useTitle from "../../../hooks/useTitle";

const RegisterPage = () => {
    useTitle("WeTradeFX - Register");

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
                    Create an account
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Join and build a trading community and get access to trading signals
                </Typography>
            </Box>

            {/* form */}
            <RegisterForm />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="caption" color="text.secondary">
                    By creating an account, I agree to{" "}
                    <MUILink component={RouterLink} to="/terms-of-service">
                        Terms of service
                    </MUILink>{" "}
                    and{" "}
                    <MUILink component={RouterLink} to="/privacy-policy">
                        Privacy policy
                    </MUILink>
                </Typography>
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
                    Already have an account?
                </Typography>
                <Button
                    size="small"
                    variant="text"
                    component={RouterLink}
                    to="/"
                    sx={{ textTransform: "none" }}
                >
                    Get started
                </Button>
            </Box>
        </Box>
    );
};

export default RegisterPage;
