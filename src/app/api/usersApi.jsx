const baseApiUrl = import.meta.env.VITE_API_URL;
const usersApiUrl = `${baseApiUrl}/users`;

// get users
const getUsersApi = async () => {
    const response = await fetch(`${usersApiUrl}/users`, {
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

// get me
const getMeApi = async () => {
    const response = await fetch(`${usersApiUrl}/me`, {
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

// get user by id
const getUserByIdApi = async ({ userId }) => {
    const response = await fetch(`${usersApiUrl}/${userId}`, {
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

// get user by api key
const getUserByApiKeyApi = async ({ userId, apiKey }) => {
    const response = await fetch(`${usersApiUrl}/${userId}/apiKey`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
    });

    const data = await response.json();
    return data;
};

// update user profile
const updateUserApi = async ({
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
    const formData = new FormData();

    if (avatar) {
        formData.append("avatar", avatar);
    }

    formData.append("email", email);
    formData.append("username", username);
    formData.append("mobileNo", mobileNo);
    formData.append("displayName", displayName);
    formData.append("firstName", firstName);
    formData.append("middleName", middleName);
    formData.append("lastName", lastName);

    const response = await fetch(`${usersApiUrl}/${userId}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
    });

    const data = await response.json();
    return data;
};

// remove avatar
const removeAvatarApi = async ({ userId }) => {
    const response = await fetch(`${usersApiUrl}/${userId}/avatar`, {
        method: "PATCH",
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

// generate api key
const generateApiKeyApi = async ({ userId }) => {
    const response = await fetch(`${usersApiUrl}/${userId}/apiKey`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

// mt5 account validate
const mt5UpdateAccountApi = async ({ userId, login, password, server }) => {
    const response = await fetch(`${usersApiUrl}/${userId}/mt5`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ login, password, server }),
    });

    const data = await response.json();
    return data;
};

// update user status
const updateUserStatusApi = async ({ userId, status }) => {
    const response = await fetch(`${usersApiUrl}/${userId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
    });

    const data = await response.json();
    return data;
};

// update user globalRole
const updateUserGlobalRoleApi = async ({ userId, globalRole }) => {
    const response = await fetch(`${usersApiUrl}/${userId}/globalRole`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ globalRole }),
    });

    const data = await response.json();
    return data;
};

// update user subscription
const updateUserSubscriptionApi = async ({ userId, plan, status }) => {
    const response = await fetch(`${usersApiUrl}/${userId}/subscriptions`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ plan, status }),
    });

    const data = await response.json();
    return data;
};

export {
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
};
