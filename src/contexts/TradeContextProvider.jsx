// react
import { useEffect, useState, createContext } from "react";

// api
import { getTradeHistoryApi } from "../app/api/tradesApi";

const TradeContext = createContext();

const TradeProvider = ({ children }) => {
    const [tradeLoading, setTradeLoading] = useState(true);
    const [tradeHistory, setTradeHistory] = useState([]);

    // get trade history
    const getTradeHistory = async () => {
        try {
            const result = await getTradeHistoryApi();

            if (!result?.success) setTradeHistory([]);
            if (result?.success) setTradeHistory(result?.data);

            return result;
        } catch (err) {
            setTradeHistory([]);
            throw err.message;
        } finally {
            setTradeLoading(false);
        }
    };

    useEffect(() => {
        getTradeHistory();
    }, []);

    return (
        <TradeContext.Provider value={{ tradeLoading, tradeHistory, getTradeHistory }}>
            {children}
        </TradeContext.Provider>
    );
};

export { TradeContext, TradeProvider };
