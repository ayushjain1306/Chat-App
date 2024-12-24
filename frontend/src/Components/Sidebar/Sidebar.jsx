import React, { useState } from "react";
import { styled, Box } from "@mui/material";
import HeadPart from "./HeadPart.jsx";
import ChatPart from "./ChatPart.jsx";

const StyledDiv = styled(Box)(({theme}) => ({
    backgroundColor: "whitesmoke",
    height: "100vh",
    width: "25vw",
    [theme.breakpoints.down('md')]: {
        height: "90vh",
        width: "95%",
        margin: "auto",
        borderTopLeftRadius: "3px",
        borderTopRightRadius: "3px"
    }
}))

const SideContent = () => {
    const [chats, setChats] = useState([]);

    return (
        <StyledDiv>
            <HeadPart chats={chats} />
            <ChatPart chats={chats} setChats={setChats} />
        </StyledDiv>
    )
}

export default SideContent;