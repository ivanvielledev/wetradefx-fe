import { useContext } from "react";
import { SignalContext } from "../contexts/SignalContextProvider";

const useSignal = () => {
    const signalContext = useContext(SignalContext);

    if (!signalContext) throw Error("SignalContext must be used inside SignalProvider");

    return signalContext;
};

export default useSignal;
