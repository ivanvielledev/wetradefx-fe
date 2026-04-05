// react
import { createContext, useState, useEffect } from "react";

// users api
import {
    getUsersApi,
    getMeApi,
    getUserByIdApi,
    getUserByApiKeyApi,
    updateUserApi,
    removeAvatarApi,
    generateApiKeyApi,
    mt5UpdateAccountApi,
    updateUserStatusApi,
    updateUserGlobalRoleApi,
    updateUserSubscriptionApi,
} from "../app/api/usersApi";

// auth api
import {
    loginByEmailApi,
    registerByEmailApi,
    logoutApi,
    forgotPasswordApi,
} from "../app/api/authApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [me, setMe] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    // get users
    const getUsers = async () => {
        try {
            const result = await getUsersApi();

            if (!result?.success) setUsers([]);
            if (result?.success) setUsers(result?.data);

            return result;
        } catch (err) {
            setUsers([]);
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // get me
    const getMe = async () => {
        try {
            const result = await getMeApi();

            if (!result?.success) setMe(null);
            if (result?.success) setMe(result?.data);

            return result;
        } catch (err) {
            setUser(null);
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // get user by id
    const getUserById = async ({ userId }) => {
        try {
            const result = await getUserByIdApi({ userId });

            if (!result?.success) setUser(null);
            if (result?.success) setUser(result?.data);

            return result;
        } catch (err) {
            setUser(null);
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // get user by api key
    const getUserByApiKey = async ({ apiKey }) => {
        try {
            const result = await getUserByApiKeyApi({ apiKey });

            if (!result?.success) setUser(null);
            if (result?.success) setUser(result.data);

            return result;
        } catch (err) {
            setUser(null);
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    // login by email
    const loginByEmail = async ({ username, password }) => {
        try {
            const result = await loginByEmailApi({ username, password });

            if (!result?.success) setMe(null);
            if (result?.success) setMe(result?.data);

            return result;
        } catch (err) {
            setUser(null);
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // register by email
    const registerByEmail = async ({ email, username, mobileNo, password }) => {
        try {
            const result = await registerByEmailApi({ email, username, mobileNo, password });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // logout
    const logout = async () => {
        try {
            const result = await logoutApi();

            if (result?.success) setMe(null);

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // update user
    const updateUser = async ({
        userId,
        avatar,
        email,
        username,
        mobileNo,
        displayName,
        firstName,
        middleName,
        lastName,
    }) => {
        try {
            const result = await updateUserApi({
                userId,
                avatar,
                email,
                username,
                mobileNo,
                displayName,
                firstName,
                middleName,
                lastName,
            });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // remove avatar
    const removeAvatar = async ({ userId }) => {
        try {
            const result = await removeAvatarApi({ userId });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // generate api key
    const generateApiKey = async ({ userId }) => {
        try {
            const result = await generateApiKeyApi({ userId });

            return result;
        } catch (err) {
        } finally {
            setUserLoading(false);
        }
    };

    // mt5 account
    const mt5UpdateAccount = async ({ userId, login, password, server }) => {
        try {
            const result = await mt5UpdateAccountApi({
                userId,
                login,
                password,
                server,
            });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // update user status
    const updateUserStatus = async ({ userId, status }) => {
        try {
            const result = await updateUserStatusApi({
                userId,
                status,
            });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // update user globalRole
    const updateUserGlobalRole = async ({ userId, globalRole }) => {
        try {
            const result = await updateUserGlobalRoleApi({
                userId,
                globalRole,
            });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // update user subscription
    const updateUserSubscription = async ({ userId, plan, status }) => {
        try {
            const result = await updateUserSubscriptionApi({
                userId,
                plan,
                status,
            });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    // fogot password
    const forgotPassword = async ({ email }) => {
        try {
            const result = await forgotPasswordApi({ email });

            return result;
        } catch (err) {
            throw err.message;
        } finally {
            setUserLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                userLoading,
                me,
                user,
                users,
                getUsers,
                getMe,
                getUserById,
                getUserByApiKey,
                loginByEmail,
                registerByEmail,
                logout,
                updateUser,
                removeAvatar,
                generateApiKey,
                mt5UpdateAccount,
                updateUserStatus,
                updateUserGlobalRole,
                updateUserSubscription,
                forgotPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
