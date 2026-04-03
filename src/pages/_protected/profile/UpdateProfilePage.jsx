// react
import { useState, useEffect } from "react";

// mui
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";

// react-router-dom
import { useParams, Link as RouterLink } from "react-router-dom";

// hooks
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";

const UpdateProfilePage = () => {
    const { userId } = useParams();
    const { me, updateUser, getUserById, getMe, removeAvatar } = useAuth();
    const { setSnackbar } = useSnackbar();

    // user states
    const [fields, setFields] = useState({
        avatar: "",
        email: "",
        username: "",
        mobileNo: "",
        displayName: "",
        firstName: "",
        middleName: "",
        lastName: "",
    });

    const handleSetUser = async () => {
        if (me) {
            const result = await getUserById({ userId });

            if (!result?.success) return;

            const fetched = result?.data;

            setFields({
                avatar: fetched?.avatar || "",
                email: fetched?.email || "",
                username: fetched?.username || "",
                mobileNo: fetched?.mobileNo || "",
                displayName: fetched?.displayName || "",
                firstName: fetched?.firstName || "",
                middleName: fetched?.middleName || "",
                lastName: fetched?.lastName || "",
            });
        }
    };

    useEffect(() => {
        handleSetUser();
    }, [me, userId]);

    // preview states
    const [preview, setPreview] = useState("");

    const handleFileChange = e => {
        const file = e.target.files[0];

        if (file) {
            setFields(prev => ({ ...prev, avatar: file }));
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const handleClearAvatar = async e => {
        e.preventDefault();

        if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        } else if (fields.avatar) {
            const result = await removeAvatar({ userId });

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
        }

        setFields(prev => ({ ...prev, avatar: "" }));
    };

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleUpdateProfile = async e => {
        e.preventDefault();

        const { avatar, email, username, mobileNo, displayName, firstName, middleName, lastName } =
            fields;

        const result = await updateUser({
            userId,
            avatar,
            email,
            username,
            mobileNo,
            displayName,
            firstName,
            middleName,
            lastName,
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

        getMe();
    };

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* avatar */}
            <Box
                component={Paper}
                sx={{
                    maxWidth: 800,
                    width: "100%",
                    m: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 2,
                    p: 4,
                    borderRadius: 4,
                    boxShadow: 3,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            badgeContent={
                                <IconButton
                                    component="label"
                                    sx={{
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        "&:hover": { backgroundColor: "primary.dark" },
                                        width: 35,
                                        height: 35,
                                        border: "2px solid white",
                                    }}
                                >
                                    <PhotoCameraIcon sx={{ fontSize: 20 }} />
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleFileChange} // Your upload logic here
                                    />
                                </IconButton>
                            }
                        >
                            <Avatar
                                src={preview || fields.avatar}
                                sx={{ width: 120, height: 120, border: "2px solid #ddd" }}
                            />
                        </Badge>

                        {/* CLEAR BUTTON */}
                        {(preview || fields.avatar) && (
                            <IconButton
                                onClick={handleClearAvatar}
                                sx={{
                                    position: "absolute",
                                    top: -5,
                                    right: -5,
                                    backgroundColor: "error.main",
                                    color: "white",
                                    "&:hover": { backgroundColor: "error.dark" },
                                    width: 24,
                                    height: 24,
                                    border: "2px solid white",
                                    zIndex: 2, // Ensure it stays on top
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        )}
                    </Box>

                    <Typography>
                        {fields.displayName === "" ? "Set display name" : fields.displayName}
                    </Typography>
                </Box>

                {/* email, username, and mobile no */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        px: 1,
                        width: "100%",
                    }}
                >
                    <Typography variant="overline" color="text.disabled">
                        Contact information
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Box>
                            <Typography variant="overline">Email: </Typography>
                        </Box>

                        <Box>
                            <TextField
                                type="text"
                                variant="standard"
                                value={fields.email}
                                onChange={e =>
                                    setFields(prev => ({ ...prev, email: e.target.value }))
                                }
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Box>
                            <Typography variant="overline">Username: </Typography>
                        </Box>

                        <Box>
                            <TextField
                                type="text"
                                variant="standard"
                                value={fields.username}
                                onChange={e =>
                                    setFields(prev => ({ ...prev, username: e.target.value }))
                                }
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 15,
                                    },
                                }}
                                helperText={`${fields.username.length}/15 characters`}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Box>
                            <Typography variant="overline">MobileNo: </Typography>
                        </Box>

                        <Box>
                            <TextField
                                type="tel"
                                variant="standard"
                                autoComplete="off"
                                value={fields.mobileNo}
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
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* personal info */}
            <Box component="form" sx={{ flex: 1, maxWidth: 800, width: "100%", m: "0 auto", p: 4 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="overline" color="text.disabled">
                        Personal information
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {/* display name */}
                    <TextField
                        type="text"
                        fullWidth
                        autoComplete="off"
                        label="Display name (optional)"
                        variant="standard"
                        value={fields.displayName}
                        onChange={e =>
                            setFields(prev => ({ ...prev, displayName: e.target.value }))
                        }
                        slotProps={{
                            htmlInput: {
                                maxLength: 25,
                            },
                        }}
                        helperText={
                            me?.displayName
                                ? `${me?.displayName.length}/25 characters`
                                : `${fields.displayName.length}/25 characters`
                        }
                    />

                    {/* first name */}
                    <TextField
                        type="text"
                        fullWidth
                        autoComplete="off"
                        label="First name"
                        variant="standard"
                        value={fields.firstName}
                        onChange={e => setFields(prev => ({ ...prev, firstName: e.target.value }))}
                    />

                    {/* middle name */}
                    <TextField
                        type="text"
                        fullWidth
                        autoComplete="off"
                        label="Middle name"
                        variant="standard"
                        value={fields.middleName}
                        onChange={e => setFields(prev => ({ ...prev, middleName: e.target.value }))}
                    />

                    {/* last name */}
                    <TextField
                        type="text"
                        fullWidth
                        autoComplete="off"
                        label="Last name"
                        variant="standard"
                        value={fields.lastName}
                        onChange={e => setFields(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                </Box>

                {/* actions */}
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Button size="large" component={RouterLink} to={-1} color="text.secondary">
                        Cancel
                    </Button>

                    <Button
                        size="large"
                        variant="contained"
                        color="success"
                        onClick={handleUpdateProfile}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default UpdateProfilePage;
