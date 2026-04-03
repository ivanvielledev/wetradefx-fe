const formatDate = utcStr => {
    const date = new Date(utcStr);

    return new Intl.DateTimeFormat("en-PH", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Manila",
    }).format(date);
};

export { formatDate };
