import { Box, Container, Typography, Divider } from "@mui/material";
import TermsComponent from "./components/TermsComponent";
import GoBackButton from "../../../components/_root/Buttons/GoBackButton";

const TERMS_DATA = [
    {
        header: "1. Nature of service",
        body: "WeTradeFX provides a platform for trading signals and automated copy-trading. We are an information service, not a financial brokerage or registered investment advisor.",
    },
    {
        header: "2. MT5 account connection and risk",
        body: "By connecting your MetaTrader 5 (MT5) account to WeTradeFX, you grant the platform permission to execute trades on your behalf.",
        items: [
            "No guarantees: Past performance is not indicative of future results.",
            "Execution risk: We are not responsible for slippage, latency, or technical failures occurring between our servers and the brokers.",
            "Total responsibility: You acknowledge that all trading involves the risk of total capital loss.",
        ],
    },
    {
        header: "3. Subscription and refunds",
        items: [
            "Access to copy-trading features requires a paid subscription.",
            "Refunds are generally not provided once a signal has been broadcast or a trade has been copied, as the value of the information has already been delivered.",
        ],
    },
    {
        header: "4. Limitation of liability",
        items: [
            "WeTradeFX, its developers, and affiliates shall not be liable for any financial losses, lost profits, or data breaches resulting from the use of our web app or other third-party integrations.",
        ],
    },
];

const TermsOfServicePage = () => {
    return (
        <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "background.default" }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <GoBackButton destination={-1} label="Go back" />

                <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant="h3" fontWeight={800} color="primary">
                        Terms of Service
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Last Updated: April 2026
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box component="section">
                    {TERMS_DATA.map((term, index) => (
                        <TermsComponent
                            key={index}
                            header={term.header}
                            body={term.body}
                            items={term.items}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default TermsOfServicePage;
