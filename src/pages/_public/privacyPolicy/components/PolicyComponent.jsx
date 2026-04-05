import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const PolicyComponent = ({ header, body, items }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                {header}
            </Typography>

            {/* render body text if provided */}
            {body && (
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
                    {body}
                </Typography>
            )}

            {/* render a list if items are provided */}
            {items && (
                <List dense sx={{ pl: 1 }}>
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            sx={{ display: "list-item", listStyleType: "disc", ml: 2, py: 0.5 }}
                        >
                            <ListItemText
                                primary={item}
                                primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default PolicyComponent;
