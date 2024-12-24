import React, { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (userId){
            const socketInstance = io("https://chat-app-server-psi-three.vercel.app");

            socketInstance.emit("register", userId);

            setSocket(socketInstance);
        }
    }, [userId]);

    return (
        <SocketContext.Provider value={{ socket, userId, setUserId }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider };