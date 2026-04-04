// urls
const baseApiUrl = import.meta.env.VITE_API_URL;
const tradesApiUrl = `${baseApiUrl}/trades`;

// get trade history
const getTradeHistoryApi = async () => {
    const response = await fetch(`${tradesApiUrl}/trades`, {
        credentials: "include",
    });

    const data = await response.json();
    return data;
};

export { getTradeHistoryApi };
