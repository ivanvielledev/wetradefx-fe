// react
import { createContext, useState } from "react";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
    });

    return (
        <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export { SnackbarContext, SnackbarProvider };
