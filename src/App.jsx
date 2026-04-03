//
import { AppThemeProvider } from "./contexts/AppThemeContextProvider";
import { SnackbarProvider } from "./contexts/SnackbarContextProvider";
import { AuthProvider } from "./contexts/AuthContextProvider";
import AppRouter from "./app/routes/AppRouter";

function App() {
    return (
        <AppThemeProvider>
            <SnackbarProvider>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </SnackbarProvider>
        </AppThemeProvider>
    );
}

export default App;
