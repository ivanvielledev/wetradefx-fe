import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) throw Error("AuthContext must be used inside AuthProvider");

    return authContext;
};

export default useAuth;
