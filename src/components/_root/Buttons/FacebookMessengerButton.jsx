// mui
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

import ChatIcon from "@mui/icons-material/Chat";

//
const facebookMessengerUrl = import.meta.env.VITE_FACEBOOK_MESSENGER_URL;

const FacebookMessengerButton = () => {
    const openMessenger = () => {
        // This deep-links to your specific FB page
        window.open(facebookMessengerUrl, "_blank");
    };

    return (
        <Tooltip title="Chat with WeTradeFX Support" placement="left">
            <Fab
                color="primary"
                aria-label="chat"
                onClick={openMessenger}
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    bgcolor: "#0084FF", // Messenger Blue
                    "&:hover": {
                        bgcolor: "#0073e6",
                    },
                }}
            >
                <ChatIcon />
            </Fab>
        </Tooltip>
    );
};

export default FacebookMessengerButton;
