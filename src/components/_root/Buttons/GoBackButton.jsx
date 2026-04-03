import Button from "@mui/material/Button";

import { Link as RouterLink } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Tooltip } from "@mui/material";

const GoBackButton = ({ label, destination }) => {
    return (
        <Tooltip title={label} placement="bottom">
            <Button
                component={RouterLink}
                to={!destination ? -1 : destination}
                size="small"
                startIcon={<ArrowBackOutlinedIcon fontSize="small" />}
                color="text.secondary"
            >
                {label}
            </Button>
        </Tooltip>
    );
};

export default GoBackButton;
