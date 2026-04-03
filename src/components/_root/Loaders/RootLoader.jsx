import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const RootLoader = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Typography variant="h5" fontWeight={700}>
                WeTradeFX
            </Typography>
            <CircularProgress color="primary" />
            <Typography variant="caption">Loading your workspace...</Typography>
        </Box>
    );
};

export default RootLoader;
