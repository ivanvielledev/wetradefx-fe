// react
import { createContext, useState, useEffect } from "react";

// api
import { getSignalsApi } from "../app/api/signalsApi";

const SignalContext = createContext();

const SignalProvider = ({ children }) => {
    const [signalLoading, setSignalLoading] = useState(true);
    const [signals, setSignals] = useState([]);

    // get signals
    const getSignals = async () => {
        try {
            const result = await getSignalsApi();

            if (!result?.success) setSignals([]);
            if (result?.success) setSignals(result?.data);

            return result;
        } catch (err) {
            setSignals([]);
            throw err.message;
        } finally {
            setSignalLoading(false);
        }
    };

    useEffect(() => {
        getSignals();
    }, []);

    return (
        <SignalContext.Provider value={{ signalLoading, signals, getSignals }}>
            {children}
        </SignalContext.Provider>
    );
};

export { SignalContext, SignalProvider };
