// mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MUILink from "@mui/material/Link";

// react-router-dom
import { Link as RouterLink } from "react-router-dom";

const PublicAppBar = ({ brand }) => {
    return (
        <AppBar elevation={0} position="sticky" sx={{ bgcolor: "background.default" }}>
            <Toolbar>
                <MUILink
                    component={RouterLink}
                    to="/"
                    sx={{ fontSize: 24, color: "text.primary", textDecoration: "none" }}
                >
                    {brand}
                </MUILink>
            </Toolbar>
        </AppBar>
    );
};

export default PublicAppBar;
