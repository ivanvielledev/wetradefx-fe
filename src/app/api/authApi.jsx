// urls
const baseApiUrl = import.meta.env.VITE_API_URL;
const authApiUrl = `${baseApiUrl}/auth`;

// login by email
const loginByEmailApi = async ({ username, password }) => {
    console.log(baseApiUrl);
    const response = await fetch(`${authApiUrl}/login-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
};

// register by email
const registerByEmailApi = async ({ email, username, mobileNo, password }) => {
    const response = await fetch(`${authApiUrl}/register-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, mobileNo, password }),
    });
    const data = await response.json();
    return data;
};

// logout
const logoutApi = async () => {
    const response = await fetch(`${authApiUrl}/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

// forgot password
const forgotPasswordApi = async ({ email }) => {
    const response = await fetch(`${authApiUrl}/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
};

// reset password
const resetPasswordApi = async ({ resetToken, password }) => {
    const response = await fetch(`${authApiUrl}/reset-password/${resetToken}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    });

    const data = await response.json();
    return data;
};

export { loginByEmailApi, registerByEmailApi, logoutApi, forgotPasswordApi, resetPasswordApi };
