import React, { useState, createContext } from "react";

export const ChatContext = createContext(null);

const ChatsProvider = ({ children }) => {
    const [flag, setFlag] = useState(0);

    return (
        <ChatContext.Provider value={{ flag, setFlag }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatsProvider;