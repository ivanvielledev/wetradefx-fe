import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import useSnackbar from "../../../hooks/useSnackbar";

const GlobalSnackbar = ({ origin = { vertical, horizontal }, hideDuration }) => {
    const { snackbar, setSnackbar } = useSnackbar();

    const handleCloseSnackbar = e => {
        if (e === "clickaway") return;

        setSnackbar(prev => ({
            ...prev,
            open: false,
        }));
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: origin.vertical, horizontal: origin.horizontal }}
            open={snackbar.open}
            autoHideDuration={hideDuration}
            onClose={handleCloseSnackbar}
        >
            <Alert
                onClose={handleCloseSnackbar}
                severity={snackbar.severity || "info"}
                variant="filled"
                elevation={4}
                sx={theme => ({
                    color: theme.palette.getContrastText(
                        theme.palette[snackbar.severity || "info"].main,
                    ),
                })}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
