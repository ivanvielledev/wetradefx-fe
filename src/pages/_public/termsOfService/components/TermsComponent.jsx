import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const TermsComponent = ({ header, body, items }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                {header}
            </Typography>

            {body && (
                <Typography variant="body1" sx={{ color: "text.primary", mb: 1 }}>
                    {body}
                </Typography>
            )}

            {items && (
                <List dense>
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            sx={{ display: "list-item", listStyleType: "disc", ml: 3, py: 0.25 }}
                        >
                            <ListItemText
                                primary={item}
                                primaryTypographyProps={{ variant: "body1" }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default TermsComponent;
