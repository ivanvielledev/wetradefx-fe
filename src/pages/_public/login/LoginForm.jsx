import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";

const LoginForm = () => {
    const { userLoading, loginByEmail, logout } = useAuth();
    const { setSnackbar } = useSnackbar();

    const [fields, setFields] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState("");

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const { username, password } = fields;

        const result = await loginByEmail({ username, password });

        if (!result?.success) {
            setSnackbar({
                open: true,
                message: result?.error,
                severity: "error",
            });

            return;
        }

        // banned users
        if (result?.data?.status === "banned") {
            setSnackbar({
                open: true,
                message: "User is banned from the company",
                severity: "error",
            });

            await logout();

            return;
        }

        setSnackbar({
            open: true,
            message: result?.message,
            severity: "success",
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
            <TextField
                inputRef={emailRef}
                fullWidth
                autoComplete="off"
                type="text"
                label="Email / Username"
                value={fields.username}
                onChange={e => setFields(prev => ({ ...prev, username: e.target.value }))}
            />

            <TextField
                type={showPassword ? "text" : "password"}
                fullWidth
                autoComplete="off"
                label="Password"
                value={fields.password}
                onChange={e => setFields(prev => ({ ...prev, password: e.target.value }))}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
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

            <Box sx={{ my: 2 }}>
                <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    type="submit"
                    loading={userLoading}
                    loadingIndicator="Verifying account..."
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;
