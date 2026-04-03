// mui
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MUILink from "@mui/material/Link";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// react-router-dom
import { Link as RouterLink } from "react-router-dom";

const SideBarHeader = ({ brand, drawerOpen, toggleDrawerOpen }) => {
    return (
        <Box
            sx={theme => ({
                display: "flex",
                justifyContent: drawerOpen ? "flex-end" : "center",
                alignItems: "center",
                p: theme.spacing(0, 1),
                ...theme.mixins.toolbar,
                overflowX: "hidden",
            })}
        >
            {drawerOpen && (
                <MUILink
                    component={RouterLink}
                    to="/dashboard"
                    sx={{
                        fontSize: { xs: 16, lg: 24 },
                        fontWeight: 700,
                        color: "text.primary",
                        textDecoration: "none",
                        opacity: drawerOpen ? 1 : 0,
                        transition: theme =>
                            theme.transitions.create("opacity", {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.shortest,
                            }),
                    }}
                >
                    {brand}
                </MUILink>
            )}

            <IconButton onClick={toggleDrawerOpen}>
                {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </Box>
    );
};

export default SideBarHeader;
