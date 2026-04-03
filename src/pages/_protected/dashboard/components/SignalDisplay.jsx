// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const SignalDisplay = ({ signal }) => {
    return (
        <Grid key={signal._id} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Tooltip title={`signalId: ${signal._id}`}>
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 4,
                        boxShadow: 3,
                    }}
                >
                    <CardActionArea>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {/* symbol and position type */}
                                <Box sx={{ mb: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        {/* symbol */}
                                        <Box sx={{ pr: 2 }}>
                                            <Typography variant="h6" fontWeight={700}>
                                                {signal.symbol}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ flex: 1, textAlign: "right" }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight={600}
                                                color={
                                                    signal.action === "BUY" ? "success" : "error"
                                                }
                                            >
                                                {signal.action}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* price info */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box sx={{ flex: 1, display: "flex" }}>
                                        <Box sx={{ pr: 1 }}>
                                            <Typography variant="body1">Entry:</Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1">
                                                {signal.openPrice}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ flex: 1, display: "flex" }}>
                                        <Box sx={{ pr: 1 }}>
                                            <Typography variant="body1" color="error">
                                                SL:
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" color="error">
                                                {signal.slPrice}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ flex: 1, display: "flex" }}>
                                        <Box sx={{ pr: 1 }}>
                                            <Typography variant="body1" color="success">
                                                TP:
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" color="success">
                                                {signal.tpPrice}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Tooltip>
        </Grid>
    );
};

export default SignalDisplay;
