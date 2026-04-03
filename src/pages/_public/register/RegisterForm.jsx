import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";

const RegisterForm = () => {
    const { userLoading, registerByEmail } = useAuth();
    const { setSnackbar } = useSnackbar();

    const [fields, setFields] = useState({
        email: "",
        username: "",
        mobileNo: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState("");

    const emailRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, username, mobileNo, password, confirmPassword } = fields;

        if (password !== confirmPassword) {
            setSnackbar({
                open: true,
                message: "Passwords do not match",
                severity: "error",
            });
        } else {
            const result = await registerByEmail({ email, username, mobileNo, password });

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

            return navigate("/", { replace: true });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
            <TextField
                inputRef={emailRef}
                type="text"
                size="small"
                fullWidth
                color="success"
                autoComplete="off"
                label="Email address (required)"
                value={fields.email}
                onChange={e => setFields(prev => ({ ...prev, email: e.target.value }))}
            />

            <TextField
                type="text"
                size="small"
                fullWidth
                color="success"
                autoComplete="off"
                label="Username (required)"
                value={fields.username}
                onChange={e => setFields(prev => ({ ...prev, username: e.target.value }))}
                slotProps={{
                    htmlInput: {
                        maxLength: 15,
                    },
                }}
                helperText={`${fields.username.length}/15 characters`}
            />

            <TextField
                type="tel"
                size="small"
                fullWidth
                color="success"
                autoComplete="off"
                label="Mobile no."
                value={fields.mobileNo === "" ? "" : fields.mobileNo}
                onChange={e => {
                    const val = e.target.value;
                    // Only allow digits (prevents letters/symbols)
                    if (val === "" || /^[0-9\b]+$/.test(val)) {
                        setFields(prev => ({ ...prev, mobileNo: Number(val) }));
                    }
                }}
                slotProps={{
                    htmlInput: {
                        maxLength: 10,
                        inputMode: "numeric",
                    },
                }}
                helperText="e.g: 9957764460"
            />

            <TextField
                type={showPassword ? "text" : "password"}
                size="small"
                fullWidth
                color="success"
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

            <TextField
                type={showConfirmPassword ? "text" : "password"}
                size="small"
                fullWidth
                color="success"
                autoComplete="off"
                label="Confirm Password"
                value={fields.confirmPassword}
                onChange={e => setFields(prev => ({ ...prev, confirmPassword: e.target.value }))}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                                edge="end"
                            >
                                {showConfirmPassword ? (
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
                    color="success"
                    loading={userLoading}
                    loadingIndicator="Creating account..."
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default RegisterForm;
