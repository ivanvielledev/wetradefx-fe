// mui
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

// react-router-dom
import { Link as RouterLink } from "react-router-dom";

import companyLogo from "../../../assets/wetradefx.jpg";

const AboutPage = () => {
    return (
        <Box
            role="tabpanel"
            id="members-tabpanel-0"
            aria-labelledby="comm_settings-tabpanel-0"
            sx={{ flex: 1, pt: 5 }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="text.disabled">
                    Company information
                </Typography>
            </Box>

            {/* company logo */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <Avatar src={companyLogo} sx={{ width: 120, height: 120 }} />

                <Typography variant="h6" fontWeight={700}>
                    WeTradeFX
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    WeTradeFX is a community for modern traders.
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    We provider automated and real-time signal broadcasts for all of our members.
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Fully automated copy trading is also available for our VIP subscribers.
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 800,
                    width: "100%",
                    m: "0 auto",
                    mt: 2,
                }}
            >
                <Divider sx={{ my: 2 }} />

                {/* social links */}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="overline" color="text.disabled">
                        Social Links
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            width: "100%",
                            gap: 1.5,
                            mt: 1.5,
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="overline" color="primary">
                                Facebook: https://facebook.com
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="overline" color="success">
                                Telegram: https://t.me
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="overline" color="text.secondary">
                                Discord: https://discord.gg
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutPage;
