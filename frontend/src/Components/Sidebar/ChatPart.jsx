import React, { useState, useEffect, useContext } from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getChats from "../../service/getChats.js";
import { PersonContext } from "../../context/secondPerson.jsx";
import { ChatContext } from "../../context/chatsContext.jsx";
import { AnotherLoader } from "../../Loader.jsx";
import profilePic from "../../images/profilePic.jpg";
import { SocketContext } from "../../context/socketContext.jsx";
import {  Circle } from "@mui/icons-material";

const StyledDiv = styled(Box)(({theme}) => ({
    height: "70vh",
    overflowY: "auto",
    padding: "0vh 2vw 1vh 2vw"
}))

const StyledImage = styled('img')(({theme}) => ({
    borderRadius: "50%",
    height: "7vh",
    width: "7vh"
}))

const NoChatDiv = styled(Box)(({theme}) => ({
    textAlign: "center",
    fontSize: "13px",
    color: "grey"
}))

const StyledSpan = styled('span')(({theme}) => ({
    backgroundColor: "rgb(9 141 247)",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "5px",
    borderRadius: "50%",
    height: "30px",
    width: "30px"
}))

const ChatPart = ({ chats, setChats }) => {
    const [loading, setLoading] = useState(false);
    const { flag } = useContext(ChatContext);
    const { setSecondPerson } = useContext(PersonContext);
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        if (socket) {
            socket.on("recieveMessage", () => {
                console.log("hello");
                findChats();
            });

            socket.on("onlineStatusUpdated", (secondPersonId) => {
                findChats();
            });

            socket.on("userDisconnected", (secondPersonId) => {
                findChats();
            });

            socket.on("userBlockedReload", () => {
                findChats();
            });
        }
    }, []);

    const findChats = async () => {
        setLoading(true);
        const result = await getChats();

        if (result) {
            result.sort((a, b) => a.last_time - b.last_time);
            setChats(result);
        }
        setLoading(false);
    }

    useEffect(() => {
        findChats();
    }, [flag]);

    const handleClick = (chat) => {
        setSecondPerson({
            _id: chat?._id,
            name: chat?.name,
            username: chat?.username,
            image: chat?.image,
            online_status: chat?.online_status
        })

        setChats(chats.map((element) => {
            if (element._id === chat._id){
                element.unread_mes = 0;
            }

            return element;
        }))
        navigate("/chatting")
    }

    return (
        loading ?
            <AnotherLoader />
            :
            chats?.length > 0
                ?
                <StyledDiv>
                    <table className="table">
                        <tbody>
                            {
                                chats.map((chat) => {
                                    return (
                                        <tr key={chat._id} style={{cursor: "pointer"}} onClick={() => handleClick(chat)}>
                                            <td style={{width: "20%", position: "relative"}} className="text-success">
                                                <StyledImage src={chat.image ? chat.image : profilePic} alt="profile" />
                                                {chat.online_status && <span style={{position: 'absolute', bottom: "8px", right: "8px", fontSize: "13px"}}><Circle fontSize="inherit"/></span>}
                                            </td>
                                            <td style={{width: "70%"}}>
                                                <div>
                                                    <p className="h6" style={{fontSize: "17px", marginBottom: "3px", padding: "0px"}}>{chat?.name}</p>
                                                    <p style={{fontSize: "14px", padding: "0px", margin: "0px", color: "grey"}}>{chat?.last_mes}</p>
                                                </div>
                                            </td>
                                            <td style={{width: "10%", verticalAlign: "middle"}}>
                                                {
                                                    chat.unread_mes > 0 &&
                                                    <StyledSpan>
                                                        { chat.unread_mes }
                                                    </StyledSpan>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </StyledDiv>
                :
                <NoChatDiv>
                    You haven't chatted yet.
                </NoChatDiv>
    )
}

export default ChatPart;