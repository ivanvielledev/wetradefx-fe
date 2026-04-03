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

// react-router-dom
import { useParams, Link as RouterLink } from "react-router-dom";

// hooks
import useAuth from "../../../hooks/useAuth";

const ProfilePage = () => {
    const { userId } = useParams();
    const { me, user, getUserById } = useAuth();

    const handleGetUser = async ({ userId }) => {
        await getUserById({ userId });
    };

    useEffect(() => {
        if (userId) {
            handleGetUser({ userId });
        }
    }, [userId]);

    // avatar url
    const avatarUrl = user?.avatar ? user?.avatar : undefined;

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
                    <Avatar
                        src={avatarUrl}
                        sx={{
                            width: 120,
                            height: 120,
                        }}
                    >
                        <Typography variant="h6" fontWeight={700}>
                            {user?.username?.charAt(0).toUpperCase()}
                        </Typography>
                    </Avatar>

                    <Typography>{user?.displayName ?? "Set display name"}</Typography>
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
                            <Typography variant="overline">{user?.email}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Box>
                            <Typography variant="overline">Username: </Typography>
                        </Box>

                        <Box>
                            <Typography variant="overline">{user?.username}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Box>
                            <Typography variant="overline">MobileNo: </Typography>
                        </Box>

                        <Box>
                            <Typography variant="overline">{user?.mobileNo}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ flex: 1, maxWidth: 800, width: "100%", m: "0 auto", p: 4 }}>
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
                        label="Display name"
                        variant="standard"
                        value={user?.displayName ?? " "}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    {/* first name */}
                    <TextField
                        type="text"
                        fullWidth
                        label="First name"
                        variant="standard"
                        value={user?.firstName ?? " "}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    {/* middle name */}
                    <TextField
                        type="text"
                        fullWidth
                        label="Middle name"
                        variant="standard"
                        value={user?.middleName ?? " "}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    {/* last name */}
                    <TextField
                        type="text"
                        fullWidth
                        label="Last name"
                        variant="standard"
                        value={user?.lastName ?? " "}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Box>

                {/* actions */}
                {me?._id === user?._id && (
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                        <Button size="large" component={RouterLink} to={`/u/${user._id}/update`}>
                            Update
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;
