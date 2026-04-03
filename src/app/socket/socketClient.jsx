import { io } from "socket.io-client";

const baseServerUrl = import.meta.env.VITE_SERVER_URL;

const socket = io(baseServerUrl, {
    withCredentials: true,
    autoConnect: false,
    transports: ["polling", "websocket"],
    reconnection: true,
});

export { socket };
