const baseApiUrl = import.meta.env.VITE_API_URL;
const signalsApiUrl = `${baseApiUrl}/signals`;

// get signals
const getSignalsApi = async () => {
    const response = await fetch(`${signalsApiUrl}/signals`, {
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

export { getSignalsApi };
