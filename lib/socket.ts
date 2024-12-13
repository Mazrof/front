import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
// Initialize socket connection
export const initializeSocket = () => {
    if (!socket) {
        socket = io(`${process.env.NEXT_SERVER_IP}`, { withCredentials: true });

        socket.on("connect", () => {
            console.log("Socket connected:", socket?.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    }
    return socket;
};

// Disconnect socket
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect(); // Disconnects the socket
        socket = null; // Sets the socket reference to null
    }
};

// Get existing socket instance
export const getSocket = () => socket;
