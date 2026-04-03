import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// tokens
import palette from "./tokens/palette";

const createAppTheme = (themeMode = "dark") => {
    let theme = createTheme({
        palette: palette(themeMode),
    });

    theme = responsiveFontSizes(theme);

    return theme;
};

export default createAppTheme;
