// mui
import Box from "@mui/material/Box";

// react-router-dom
import { Outlet, Navigate } from "react-router-dom";

//
import PublicAppBar from "../../components/_public/AppBar/PublicAppBar";
import PublicFooter from "../../components/_public/Footers/PublicFooter";

// hooks
import useAuth from "../../hooks/useAuth";

const PublicLayout = () => {
    const { me } = useAuth();

    // fallback
    if (me) return <Navigate to="/d" replace={true} />;

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* appBar */}
            <PublicAppBar brand="WeTradeFX" />

            {/* content */}
            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Outlet />
            </Box>

            {/* footer */}
            <PublicFooter />
        </Box>
    );
};

export default PublicLayout;
