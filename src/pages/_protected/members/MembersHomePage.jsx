// react
import { useEffect, useMemo, useState } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//
import GoBackButton from "../../../components/_root/Buttons/GoBackButton";

// data table
import MembersTable from "./data/MembersTable";

// hooks
import useAuth from "../../../hooks/useAuth";

// socket
import { socket } from "../../../app/socket/socketClient";

const MembersHomePage = () => {
    const { me, users, getUsers } = useAuth();

    const filtered = useMemo(() => {
        if (!users) return { admins: [], vip: [], members: [], applicants: [], banned: [] };

        return {
            admins: users.filter(user => user.globalRole !== "user" && user.status === "active"),
            vip: users.filter(
                user =>
                    user.globalRole === "user" &&
                    user.subscription.plan === "vip" &&
                    user.subscription.status === "active" &&
                    user.status === "active",
            ),
            members: users.filter(user => user.globalRole === "user" && user.status === "active"),
            applicants: users.filter(user => user.status === "pending"),
            banned: users.filter(user => user.status === "banned"),
        };
    }, [users]);

    useEffect(() => {
        getUsers();
    }, []);

    // socket events
    useEffect(() => {
        socket.on("new_user_status", getUsers);
        socket.on("new_user_globalRole", getUsers);
        socket.on("new_user_subscription", getUsers);

        return () => {
            socket.off("new_user_status", getUsers);
            socket.off("new_user_globalRole", getUsers);
            socket.off("new_user_subscription", getUsers);
        };
    }, [getUsers]);

    const [activeUsersTab, setActiveUsersTab] = useState(
        () => localStorage.getItem("activeUsersTab") || "admins",
    );

    const handleChangeTab = (e, newValue) => {
        setActiveUsersTab(newValue);
        localStorage.setItem("activeUsersTab", newValue);
    };

    const isSuper = me?.globalRole === "superadmin";
    const isAuthorized = me?.globalRole === "superadmin" || me?.globalRole === "admin";

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ mb: 4 }}>
                <GoBackButton label="Go back to Dashboard" destination={`/d`} />
            </Box>

            <Typography variant="overline">Members</Typography>

            <Tabs value={activeUsersTab} onChange={handleChangeTab} variant="scrollable">
                <Tab label="Admins" value="admins" />
                {isSuper && <Tab label="VIP" value="vip" />}
                <Tab label="Members" value="members" />
                {isAuthorized && <Tab label="Applicants" value="applicants" />}
                {isAuthorized && <Tab label="Banned" value="banned" />}
            </Tabs>

            {/* Render Table based on activeTab string */}
            <Box sx={{ pt: 2 }}>
                <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ mb: 1, display: "block" }}
                >
                    {filtered[activeUsersTab].length} total found
                </Typography>

                <MembersTable members={filtered[activeUsersTab]} />
            </Box>
        </Box>
    );
};

export default MembersHomePage;
