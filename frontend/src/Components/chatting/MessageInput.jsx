import React, { useState, useContext, useEffect } from "react";
import { Box, CircularProgress, styled } from "@mui/material";
import DialogBox from "./DailogBox.jsx";
import { PersonContext } from "../../context/secondPerson.jsx";
import { ChatContext } from "../../context/chatsContext.jsx";
import { sendTextMessage } from "../../service/sendMessage.js";
import getMessages from "../../service/getMessages.js";
import { CameraAlt, AttachFile, Send } from "@mui/icons-material";
import { SocketContext } from "../../context/socketContext.jsx";

const StyledDiv = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: "center",
    [theme.breakpoints.between('sm', 'md')]: {
        paddingTop: "2.5vh"
    }
}))

const FirstDiv = styled(Box)(({theme}) => ({
    width: "15%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
    [theme.breakpoints.down('md')]: {
        width: "20%"
    }
}))

const SecondDiv = styled(Box)(({theme}) => ({
    width: "75%",
    [theme.breakpoints.down('md')]: {
        width: "65%"
    }
}))

const ThirdDiv = styled(Box)(({theme}) => ({
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    [theme.breakpoints.down('md')]: {
        width: "15%"
    }
}))

const MessageInput = ({ setMessages }) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(null);
    const { secondPerson } = useContext(PersonContext);
    const { flag, setFlag } = useContext(ChatContext);
    const { socket, userId } = useContext(SocketContext);

    useEffect(() => {
        socket?.on("recieveMessage", (data) => {
            console.log(data);
            if (data.sender_id === secondPerson._id) {
                console.log(true);
                handleGetMessages();
            }
            else {
                console.log(false);
                setFlag(flag+1);
            }
        })

        socket?.on("deleteMessage", () => {
            handleGetMessages();
        })
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleGetMessages = async() => {
        const response = await getMessages(secondPerson._id);

        if (response){
            setMessages(response);
            setFlag(flag+1);
            setInput("");
        }
    }

    const handleClick = async() => {
        if (input === ""){
            return;
        }
        const messageData = {
            reciever_id: secondPerson._id,
            message: input,
            send_time: new Date(Date.now()),
            sender_id: userId
        }

        setLoading(true);

        const result = await sendTextMessage(messageData);

        setLoading(false);

        if (result){
            socket.emit("sendMessage", messageData);

            handleGetMessages();
        }
    }

    return (
        <StyledDiv>
            <FirstDiv>
                <CameraAlt fontSize="large" onClick={() => {setOpen(true); setType("images")}} />
                <AttachFile fontSize="large" onClick={() => {setOpen(true); setType("files")}} />
            </FirstDiv>
            <SecondDiv>
                <textarea
                    type="text"
                    className="form-control"
                    row='1'
                    value={input}
                    placeholder="Type your message here..."
                    onChange={handleChange}
                ></textarea>
            </SecondDiv>
            <ThirdDiv>
                {
                    loading ?
                    <CircularProgress color="inherit" />
                    :
                    <Send fontSize="large" onClick={handleClick} />
                }
            </ThirdDiv>
            {
                open && <DialogBox open={open} setOpen={setOpen} type={type} setMessages={setMessages} />
            }
        </StyledDiv>
    )
}

export default MessageInput;