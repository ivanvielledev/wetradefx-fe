// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//
import GoBackButton from "../../components/_root/Buttons/GoBackButton";

// hooks
import useTitle from "../../hooks/useTitle";

const NotFoundPage = () => {
    useTitle("WeTradeFX - Page not found");

    return (
        <Box
            sx={{
                height: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h4" fontWeight={700}>
                Page not found: 404
            </Typography>
            <Typography variant="body2">The page you are looking for does not exist</Typography>

            <Box sx={{ my: 2 }}>
                <GoBackButton destination={"/"} label="Go back" />
            </Box>
        </Box>
    );
};

export default NotFoundPage;
