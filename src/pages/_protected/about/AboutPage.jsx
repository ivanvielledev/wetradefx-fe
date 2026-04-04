// mui
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MUILink from "@mui/material/Link";

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

            {/* company logo and name */}
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
                <Typography variant="caption" color="text.secondary">
                    A premier trading membership platform dedicated to bridging the gap between
                    professional strategy and retail execution. We provide high-precision, real-time
                    broadcasts of expert trading signals and a seamless, fully automated copy
                    trading infrastructure. By combining institutional-grade market analysis with
                    user-centric automation, WeTradeFX empowers traders of all levels to mirror
                    proven success and navigate the global markets with confidence.
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
                                Facebook:{" "}
                                <MUILink
                                    href="https://www.facebook.com/profile.php?id=61576789650930"
                                    target="_blank"
                                >
                                    https://www.facebook.com/wetradefx
                                </MUILink>
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
