// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PublicFooter = () => {
    // current year
    const yearNow = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
            }}
        >
            <Typography variant="body2">&copy; {yearNow}</Typography>
            <Typography variant="body2" fontWeight={700}>
                WeTradeFX.
            </Typography>
            <Typography variant="body2"> All rights reserved</Typography>
        </Box>
    );
};

export default PublicFooter;
