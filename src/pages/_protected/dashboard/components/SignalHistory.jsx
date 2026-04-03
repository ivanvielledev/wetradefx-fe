// mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// utils
import { formatDate } from "../../../../utils/formatDate";

const SignalHistory = ({ signals }) => {
    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    {/* headers */}
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 180 }}>Date</TableCell>
                            <TableCell>Ticket</TableCell>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Order Type</TableCell>
                            <TableCell>Lot Size</TableCell>
                            <TableCell>Entry price</TableCell>
                            <TableCell>SL price</TableCell>
                            <TableCell>TP price</TableCell>
                            <TableCell>Close price</TableCell>
                            <TableCell>PnL</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Reason</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* body */}
                    <TableBody>
                        {signals.map(signal => (
                            <TableRow key={signal._id}>
                                {/* created at */}
                                <TableCell sx={{ minWidth: 180 }}>
                                    {formatDate(signal.createdAt)}
                                </TableCell>
                                {/* ticket */}
                                <TableCell>{signal.ticket}</TableCell>
                                <TableCell>{signal.symbol}</TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            signal.action === "BUY" ? "success.main" : "error.main",
                                    }}
                                >
                                    {signal.action}
                                </TableCell>
                                <TableCell>{signal.volume}</TableCell>
                                <TableCell>{signal.openPrice}</TableCell>
                                <TableCell>{signal.slPrice}</TableCell>
                                <TableCell>{signal.tpPrice}</TableCell>
                                <TableCell>{signal.closePrice}</TableCell>
                                <TableCell>
                                    {(signal.profit || signal.loss || 0.0).toFixed(2)}
                                </TableCell>
                                <TableCell>{signal.status}</TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            signal.reason === "tp"
                                                ? "success.main"
                                                : signal.reason === "sl"
                                                  ? "error.main"
                                                  : "text.disabled",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {signal.reason?.toUpperCase()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default SignalHistory;
