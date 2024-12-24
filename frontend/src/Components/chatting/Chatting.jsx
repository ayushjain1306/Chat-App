import React, { useContext, useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import { PersonContext } from "../../context/secondPerson.jsx";
import { useNavigate } from "react-router-dom";
import profilePicture from "../../images/profilePic.jpg";
import MessageInput from "./MessageInput.jsx";
import Messages from "./Messages.jsx";
import getMessages from "../../service/getMessages.js";
import { SocketContext } from "../../context/socketContext.jsx";
import { Circle, MoreVert, ArrowBack } from "@mui/icons-material";
import { ChatDialog, BlockDialog } from "./OptionsDialog.jsx";

const StyledDiv = styled(Box)(({theme}) => ({
    margin: "2vh 2vw",
    border: "2px solid white",
    height: "96vh",
    width: "66vw",
    [theme.breakpoints.down('md')]: {
        width: "100vw",
        height: "100vh",
        margin: "0px",
        border: "0px",
        paddingTop: "1px"
    }
}))

const HeadDiv = styled(Box)(({theme}) => ({
    width: "96%",
    margin: "2vh 2% 0vh 2%",
    height: "10vh",
    backgroundColor: "white",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center"
}))

const FirstDiv = styled(Box)(({theme}) => ({
    display: "flex",
    width: "50%",
    alignItems: "center"
}))

const SecondDiv = styled(Box)(({theme}) => ({
    display: "flex",
    width: "50%",
    justifyContent: "right",
    paddingRight: "20px"
}))

const StyledImage = styled('img')(({theme}) => ({
    borderRadius: "50%",
    height: "7vh",
    marginLeft: "2vw",
    width: "7vh"
}))

const StyledMessageDiv = styled(Box)(({theme}) => ({
    height: "10vh", 
    marginBottom: "2vh", 
    width: "96%", 
    marginLeft: "2%",
    marginRight: "2%",
}))

const MenuDiv = styled(Box)(({theme}) => ({
    position: "absolute",
    top: "90px",
    right: "60px",
    backgroundColor: "white",
    borderRadius: "3px",
    padding: "12px 15px 12px 15px",
    textAlign: "center",
    boxShadow: "0px 0px 8px 3px rgb(0,0,0,0.2)",
    [theme.breakpoints.down('sm')]: {
        top: "83px",
        right: "10px"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        top: "130px",
        right: "20px"
    }
}))

const StyledArrowBack = styled(ArrowBack)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}))

const StyledMessageBox = styled(Box)(({theme}) => ({
    height: "72vh",
    marginLeft: "2%",
    marginRight: "2%",
    [theme.breakpoints.down('md')]: {
        height: '76vh',
        paddingTop: "10px",
        paddingBottom: "15px"
    }
}))

const Chatting = () => {
    const { secondPerson, setSecondPerson } = useContext(PersonContext);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [openBlock, setOpenBlock] = useState(false);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        if (socket){
            socket.on("onlineStatusUpdated", (secondPersonId) => {
                if (secondPersonId === secondPerson._id){
                    setSecondPerson({...secondPerson, online_status: true});
                }
            })

            socket.on("userDisconnected", (secondPersonId) => {
                if (secondPersonId === secondPerson._id){
                    setSecondPerson({...secondPerson, online_status: false});
                }
            })
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async() => {
            const result = await getMessages(secondPerson._id);

            setMessages(result);
        }

        if (!secondPerson){
            navigate("/");
        }
        else {
            fetchMessages();
        }
        
    }, [secondPerson, navigate]);

    return (
        secondPerson && <div>
            <StyledDiv>
                <HeadDiv>
                    <FirstDiv>
                        <StyledArrowBack fontSize="large" onClick={() => navigate("/")} />
                        <StyledImage src={secondPerson?.image? secondPerson?.image : profilePicture} alt="profile" />
                        <div style={{paddingLeft: "1.5vw"}}>
                            <h5 style={{fontSize: "20px", marginBottom: "4px"}}>{secondPerson?.name}</h5>
                            <div style={{display: 'flex', alignItems: "center"}}>
                                <h6 style={{fontSize: "15px"}}>@{secondPerson?.username}</h6>
                                {
                                    secondPerson.online_status &&
                                    <h6 style={{fontSize: "15px", marginLeft: "10px", color: "green", display: "flex", alignItems: "center"}}>
                                        <span style={{fontSize: "10px", marginRight: "5px"}}>
                                            <Circle fontSize="inherit" />
                                        </span>
                                        Online
                                    </h6>
                                }
                            </div>
                        </div>
                    </FirstDiv>
                    <SecondDiv>
                        <MoreVert id="moreOptions" fontSize="large" style={{cursor: "pointer"}} onClick={() => setOpen(!open)} />
                    </SecondDiv>
                </HeadDiv>
                <StyledMessageBox>
                    {messages && messages.length > 0 ? <Messages messages={messages} /> : <div></div>}
                </StyledMessageBox>
                <StyledMessageDiv>
                    <MessageInput setMessages={setMessages} />
                </StyledMessageDiv>
            </StyledDiv>

            {
                open && 
                <MenuDiv>
                    <ul style={{padding: "0px", margin: "0px"}}>
                        <li style={{listStyleType: "none", margin: "3px", cursor: "pointer"}} onClick={() => navigate('/chatting/contact-profile')}>View Profile</li>
                        <li style={{listStyleType: "none", margin: "3px", cursor: "pointer"}} onClick={() => setOpenChat(true)}>Clear Chat</li>
                        <li style={{listStyleType: "none", margin: "3px", cursor: "pointer"}} onClick={() => setOpenBlock(true)}>Block</li>
                    </ul>
                </MenuDiv>
            }

            {
                openChat && <ChatDialog open={openChat} setOpen={setOpenChat} secondPersonId={secondPerson._id} />
            }

            {
                openBlock && <BlockDialog open={openBlock} setOpen={setOpenBlock} secondPersonId={secondPerson._id} />
            }
        </div>
    )
}

export default Chatting;