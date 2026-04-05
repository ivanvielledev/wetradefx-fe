// react
import { useState } from "react";

// mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

// utils
import { formatDate } from "../../../../utils/formatDate";

const SignalHistory = ({ signals }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const visibleSignals = signals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                        {visibleSignals.map(signal => {
                            const pnlValue = signal.profit || signal.loss || 0;
                            const sign = pnlValue > 0 ? "+" : "";
                            const pnlColor =
                                pnlValue > 0
                                    ? "success.main"
                                    : pnlValue < 0
                                      ? "error.main"
                                      : "text.secondary";

                            const statusColor =
                                signal.status === "open" ? "primary.main" : "text.disabled";

                            const reasonColor =
                                signal.reason === "tp"
                                    ? "success.main"
                                    : signal.reason === "sl"
                                      ? "error.main"
                                      : "text.disabled";

                            return (
                                <TableRow key={signal._id} hover>
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
                                                signal.action === "BUY"
                                                    ? "primary.main"
                                                    : "error.main",
                                        }}
                                    >
                                        {signal.action}
                                    </TableCell>
                                    <TableCell>{signal.volume}</TableCell>
                                    <TableCell>{signal.openPrice}</TableCell>
                                    <TableCell>{signal.slPrice}</TableCell>
                                    <TableCell>{signal.tpPrice}</TableCell>
                                    <TableCell>{signal.closePrice}</TableCell>
                                    <TableCell sx={{ color: pnlColor }}>
                                        {(signal.profit || signal.loss || 0.0).toFixed(2)}
                                    </TableCell>
                                    <TableCell sx={{ color: statusColor }}>
                                        {signal.status}
                                    </TableCell>
                                    <TableCell sx={{ color: reasonColor, fontWeight: "bold" }}>
                                        {signal.reason?.toUpperCase()}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={signals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default SignalHistory;
