import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContextProvider";

const useSnackbar = () => {
    const snackbarContext = useContext(SnackbarContext);

    if (!snackbarContext) throw new Error("SnackbarContext must be used inside SnackbarProvider");

    return snackbarContext;
};

export default useSnackbar;
