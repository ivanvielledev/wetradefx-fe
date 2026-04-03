// react
import { createContext, useState, useMemo } from "react";

// mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import createAppTheme from "../app/theme/createAppTheme";

const AppThemeContext = createContext();

const AppThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "dark");
    const [drawerOpen, setDrawerOpen] = useState(
        () => JSON.parse(localStorage.getItem("drawerOpen")) ?? true,
    );

    // toggle theme mode
    const toggleThemeMode = () => {
        const newThemeMode = themeMode === "dark" ? "light" : "dark";

        setThemeMode(newThemeMode);
        localStorage.setItem("themeMode", newThemeMode);
    };

    // toggle drawer open
    const toggleDrawerOpen = () => {
        setDrawerOpen(prev => {
            const newDrawerOpen = !prev;

            localStorage.setItem("drawerOpen", newDrawerOpen);
            return newDrawerOpen;
        });
    };

    const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);

    return (
        <AppThemeContext.Provider
            value={{ themeMode, toggleThemeMode, drawerOpen, toggleDrawerOpen }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
};

export { AppThemeContext, AppThemeProvider };
