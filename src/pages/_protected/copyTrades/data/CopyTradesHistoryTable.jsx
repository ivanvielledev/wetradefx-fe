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

const CopyTradesHistoryTable = ({ trades }) => {
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
                        {trades.map(trade => (
                            <TableRow key={trade._id}>
                                {/* created at */}
                                <TableCell sx={{ minWidth: 180 }}>
                                    {formatDate(trade.createdAt)}
                                </TableCell>
                                {/* ticket */}
                                <TableCell>{trade.ticket}</TableCell>
                                <TableCell>{trade.symbol}</TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            trade.action === "BUY" ? "success.main" : "error.main",
                                    }}
                                >
                                    {trade.action}
                                </TableCell>
                                <TableCell>{trade.volume}</TableCell>
                                <TableCell>{trade.entryPrice}</TableCell>
                                <TableCell>{trade.slPrice}</TableCell>
                                <TableCell>{trade.tpPrice}</TableCell>
                                <TableCell>{trade.closePrice}</TableCell>
                                <TableCell
                                    sx={{
                                        color: trade.profit
                                            ? "success.main"
                                            : trade.loss
                                              ? "error.main"
                                              : "text.secondary",
                                    }}
                                >
                                    {(trade.profit || trade.loss || 0.0).toFixed(2)}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            trade.status === "open"
                                                ? "primary.main"
                                                : "text.disabled",
                                    }}
                                >
                                    {trade.status}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            trade.reason === "tp"
                                                ? "success.main"
                                                : trade.reason === "sl"
                                                  ? "error.main"
                                                  : "text.disabled",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {trade.reason?.toUpperCase()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CopyTradesHistoryTable;
