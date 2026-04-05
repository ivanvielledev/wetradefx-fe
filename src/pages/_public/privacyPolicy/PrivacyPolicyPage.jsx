import { Box, Container, Typography, Divider } from "@mui/material";
import GoBackButton from "../../../components/_root/Buttons/GoBackButton";
import PolicyComponent from "./components/PolicyComponent";

const POLICIES = [
    {
        header: "1. Information we collect",
        items: [
            "Identity Data: Mobile number (10-digit), full name, and email address.",
            "Trading Data: MT5 account numbers and necessary credentials to facilitate automated copy trading.",
            "Technical Data: Log data, IP addresses, and device information for security monitoring.",
        ],
    },
    {
        header: "2. How we use your data",
        items: [
            "Service Delivery: Real-time signal broadcasting via Web App and Telegram.",
            "Automation: Seamless trade execution on your connected MT5 accounts.",
            "Security: Verification of identity and prevention of unauthorized access to financial data.",
        ],
    },
    {
        header: "3. Data storage and security",
        items: [
            "Encryption: All MT5 credentials are encrypted at rest. We never store master passwords in plain text.",
            "Essential Sharing: Data is only shared with verified service providers (Telegram API, hosting, etc.) and never sold to third parties.",
        ],
    },
    {
        header: "4. Consumer rights",
        body: "You may disconnect your MT5 account or request account deletion at any time through the WeTradeFX dashboard or by contacting our support team directly.",
    },
];

const PrivacyPolicyPage = () => {
    return (
        <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "background.default" }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <GoBackButton destination={-1} label="Go back" />

                <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant="h3" fontWeight={800} color="primary">
                        Privacy Policy
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Last Updated: April 2026
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box component="section">
                    {POLICIES.map((policy, index) => (
                        <PolicyComponent
                            key={index}
                            header={policy.header}
                            body={policy.body}
                            items={policy.items}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default PrivacyPolicyPage;
