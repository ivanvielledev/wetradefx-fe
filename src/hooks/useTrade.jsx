import { useContext } from "react";
import { TradeContext } from "../contexts/TradeContextProvider";

const useTrade = () => {
    const tradeContext = useContext(TradeContext);

    if (!tradeContext) throw Error("TradeContext must be used inside TradeProvider");

    return tradeContext;
};

export default useTrade;
