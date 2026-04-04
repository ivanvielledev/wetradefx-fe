// react
import { useState } from "react";

// mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MUILink from "@mui/material/Link";
import TablePagination from "@mui/material/TablePagination";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

// react-router-dom
import { Link as RouterLink } from "react-router-dom";

// hooks
import useAuth from "../../../../hooks/useAuth";
import useSnackbar from "../../../../hooks/useSnackbar";

// utils
import { formatDate } from "../../../../utils/formatDate";

const MembersTable = ({ members }) => {
    const { me, updateUserStatus, updateUserGlobalRole, updateUserSubscription } = useAuth();
    const { setSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const visibleMembers = members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // status
    const handleUpdateUserStatus = async (e, userId, status) => {
        e.preventDefault();

        const result = await updateUserStatus({ userId, status });

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
    };

    // globalRole
    const handleUpdateUserGlobalRole = async (e, userId, globalRole) => {
        e.preventDefault();

        const result = await updateUserGlobalRole({ userId, globalRole });

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
    };

    const fullAccess = me?.globalRole === "superadmin" || me?.globalRole === "admin";

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    {/* headers */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Date Registered</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Mobile no.</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* body */}
                    <TableBody>
                        {visibleMembers.map(member => (
                            <TableRow key={member?._id} hover>
                                {/* created at */}
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        maxWidth: 150,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {formatDate(member.createdAt)}
                                </TableCell>

                                {/* username */}
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <MUILink
                                            component={RouterLink}
                                            to={`/u/${member?._id}`}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Avatar
                                                src={member?.avatar}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            {member?.username}

                                            {/* subscription badge */}
                                            {member?.globalRole === "superadmin" && (
                                                <Tooltip
                                                    title={`superadmin:${member?.username}`}
                                                    placement="bottom"
                                                >
                                                    <IconButton
                                                        size="small"
                                                        variant="text"
                                                        color="success"
                                                    >
                                                        <DeviceHubOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </MUILink>

                                        {/* subscription badge */}
                                        {member?.subscription?.plan === "vip" && (
                                            <Tooltip title={`VIP`} placement="bottom">
                                                <IconButton
                                                    size="small"
                                                    variant="text"
                                                    color="success"
                                                >
                                                    <VerifiedOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}

                                        {/* me badge */}
                                        {member?._id === me?._id && (
                                            <Tooltip title={`Me`} placement="bottom">
                                                <IconButton
                                                    size="small"
                                                    variant="text"
                                                    color="success"
                                                >
                                                    <AssignmentIndOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Box>
                                </TableCell>

                                {/* mobileNo */}
                                <TableCell
                                    sx={{
                                        maxWidth: 150,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {member.mobileNo}
                                </TableCell>

                                {/* role */}
                                <TableCell
                                    sx={{
                                        maxWidth: 150,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {member.globalRole}
                                </TableCell>

                                {/* status */}
                                <TableCell
                                    sx={{
                                        maxWidth: 150,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {member.status}
                                </TableCell>

                                {/* action */}
                                {me?.globalRole === "superadmin" && (
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            {/* create subscription */}
                                            {member?.subscription?.plan === "free" &&
                                                member?.subscription?.status === "new" && (
                                                    <Box sx={{ flexShrink: 1 }}>
                                                        <Tooltip
                                                            title="Approve subscription"
                                                            placement="bottom"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                variant="text"
                                                                color="success"
                                                                onClick={e =>
                                                                    handleUpdateUserSubscription(
                                                                        e,
                                                                        member?._id,
                                                                        "vip",
                                                                        "active",
                                                                    )
                                                                }
                                                            >
                                                                <GradeOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                )}

                                            {/* approve subscription */}
                                            {member?.subscription?.plan === "free" &&
                                                member?.subscription?.status === "pending" && (
                                                    <Box sx={{ flexShrink: 1 }}>
                                                        <Tooltip
                                                            title="Approve subscription"
                                                            placement="bottom"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                variant="text"
                                                                color="success"
                                                                onClick={e =>
                                                                    handleUpdateUserSubscription(
                                                                        e,
                                                                        member?._id,
                                                                        "vip",
                                                                        "active",
                                                                    )
                                                                }
                                                            >
                                                                <GradeOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                )}

                                            {/* demote */}
                                            {member?.globalRole === "admin" &&
                                                member?.status === "active" &&
                                                member?.status !== "banned" && (
                                                    <Box sx={{ flexShrink: 1 }}>
                                                        <Tooltip
                                                            title="Demote to member"
                                                            placement="bottom"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                variant="text"
                                                                color="error"
                                                                onClick={e =>
                                                                    handleUpdateUserGlobalRole(
                                                                        e,
                                                                        member?._id,
                                                                        "user",
                                                                    )
                                                                }
                                                            >
                                                                <ThumbDownOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                )}

                                            {/* promote */}
                                            {member?.globalRole === "user" &&
                                                member?.status === "active" &&
                                                member?.status !== "banned" && (
                                                    <Box sx={{ flexShrink: 1 }}>
                                                        <Tooltip
                                                            title="Promote to admin"
                                                            placement="bottom"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                variant="text"
                                                                color="success"
                                                                onClick={e =>
                                                                    handleUpdateUserGlobalRole(
                                                                        e,
                                                                        member?._id,
                                                                        "admin",
                                                                    )
                                                                }
                                                            >
                                                                <AdminPanelSettingsOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                )}

                                            {/* approve or reject*/}
                                            {member?.status === "pending" && (
                                                <>
                                                    <Box sx={{ flexShrink: 1 }}>
                                                        <Tooltip title="Approve" placement="bottom">
                                                            <IconButton
                                                                size="small"
                                                                variant="text"
                                                                color="success"
                                                                onClick={e =>
                                                                    handleUpdateUserStatus(
                                                                        e,
                                                                        member?._id,
                                                                        "active",
                                                                    )
                                                                }
                                                            >
                                                                <DoneOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>

                                                    <Box sx={{ flexShrink: 1 }}>
                                                        <Tooltip title="Reject" placement="bottom">
                                                            <IconButton
                                                                size="small"
                                                                variant="text"
                                                                color="error"
                                                                onClick={e =>
                                                                    handleUpdateUserStatus(
                                                                        e,
                                                                        member?._id,
                                                                        "new",
                                                                    )
                                                                }
                                                            >
                                                                <CloseOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </>
                                            )}

                                            {/* ban  */}
                                            {member?.globalRole !== "superadmin" &&
                                                member?.status !== "banned" &&
                                                member?.status !== "pending" &&
                                                member?.status !== "new" && (
                                                    <>
                                                        <Box sx={{ flexShrink: 1 }}>
                                                            <Tooltip title="Ban" placement="bottom">
                                                                <IconButton
                                                                    size="small"
                                                                    variant="text"
                                                                    color="error"
                                                                    onClick={e =>
                                                                        handleUpdateUserStatus(
                                                                            e,
                                                                            member?._id,
                                                                            "banned",
                                                                        )
                                                                    }
                                                                >
                                                                    <DoNotDisturbOnOutlinedIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </>
                                                )}
                                        </Box>
                                    </TableCell>
                                )}

                                {me?.globalRole === "admin" && (
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            {/* approve or reject*/}
                                            {member?.globalRole === "guest" &&
                                                member?.status === "pending" && (
                                                    <>
                                                        <Box sx={{ flexShrink: 1 }}>
                                                            <Tooltip
                                                                title="Approve"
                                                                placement="bottom"
                                                            >
                                                                <IconButton
                                                                    size="small"
                                                                    variant="text"
                                                                    color="success"
                                                                    onClick={e =>
                                                                        handleUpdateUserStatus(
                                                                            e,
                                                                            member?._id,
                                                                            "active",
                                                                        )
                                                                    }
                                                                >
                                                                    <DoneOutlinedIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>

                                                        <Box sx={{ flexShrink: 1 }}>
                                                            <Tooltip
                                                                title="Reject"
                                                                placement="bottom"
                                                            >
                                                                <IconButton
                                                                    size="small"
                                                                    variant="text"
                                                                    color="error"
                                                                    onClick={e =>
                                                                        handleUpdateUserStatus(
                                                                            e,
                                                                            member?._id,
                                                                            "new",
                                                                        )
                                                                    }
                                                                >
                                                                    <CloseOutlinedIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </>
                                                )}

                                            {/* ban  */}
                                            {member?.globalRole === "user" && (
                                                <>
                                                    <Box sx={{ flexShrink: 1 }}>
                                                        <Tooltip title="Ban" placement="bottom">
                                                            <IconButton
                                                                size="small"
                                                                variant="text"
                                                                color="error"
                                                                onClick={e =>
                                                                    handleUpdateUserStatus(
                                                                        e,
                                                                        member?._id,
                                                                        "banned",
                                                                    )
                                                                }
                                                            >
                                                                <DoNotDisturbOnOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    </TableCell>
                                )}

                                {/* member apply for subscription */}
                                {!fullAccess && (
                                    <TableCell>
                                        {/* if current user */}
                                        {me?._id === member?._id && (
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                {/* free subscribers */}
                                                {member?.subscription?.plan === "free" && (
                                                    <>
                                                        {/* apply for subscription */}
                                                        {member?.subscription?.status !==
                                                            "active" &&
                                                            member?.subscription?.status !==
                                                                "pending" && (
                                                                <Box sx={{ flexShrink: 1 }}>
                                                                    <Tooltip
                                                                        title="Apply for subscription"
                                                                        placement="bottom"
                                                                    >
                                                                        <IconButton
                                                                            size="small"
                                                                            variant="text"
                                                                            color="success"
                                                                            onClick={e =>
                                                                                handleUpdateUserSubscription(
                                                                                    e,
                                                                                    member?._id,
                                                                                    "free",
                                                                                    "pending",
                                                                                )
                                                                            }
                                                                        >
                                                                            <AddCardOutlinedIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            )}

                                                        {/* pending application */}
                                                        {member?.subscription?.status !==
                                                            "active" &&
                                                            member?.subscription?.status ===
                                                                "pending" && (
                                                                <>
                                                                    <Box sx={{ flexShrink: 1 }}>
                                                                        <Tooltip
                                                                            title="Pending subscription approval"
                                                                            placement="bottom"
                                                                        >
                                                                            <IconButton
                                                                                size="small"
                                                                                variant="text"
                                                                                color="text.secondary"
                                                                            >
                                                                                <HourglassBottomOutlinedIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Box>
                                                                </>
                                                            )}
                                                    </>
                                                )}
                                            </Box>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={members.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default MembersTable;
