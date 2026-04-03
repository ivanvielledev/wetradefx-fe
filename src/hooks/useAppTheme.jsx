import { useContext } from "react";
import { AppThemeContext } from "../contexts/AppThemeContextProvider";

const useAppTheme = () => {
    const appThemeContext = useContext(AppThemeContext);

    if (!appThemeContext) throw Error("AppThemeContext must be used inside AppThemeProvider");

    return appThemeContext;
};

export default useAppTheme;
