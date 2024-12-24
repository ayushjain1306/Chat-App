import React, { useContext } from "react";
import { Dialog, DialogContent, Typography, Button, DialogContentText, DialogActions, styled } from "@mui/material";
import messageOptions from "../../service/messageOptions.js";
import { SocketContext } from "../../context/socketContext.jsx";

const StyledTypo = styled(Typography)(({theme}) => ({
    cursor: "pointer",
    width: "15vw",
    textAlign: "center",
    marginBottom: "10px"
}))

const MessageDialog = ({ open, setOpen, setValue, setOpenNext }) => {

    const handleClick = (value) => {
        setValue(value);
        setOpenNext(true);
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <DialogContentText style={{color: "black"}}>
                    <StyledTypo onClick={() => handleClick("delete")}>Delete</StyledTypo>
                    <StyledTypo onClick={() => handleClick("report")}>Report</StyledTypo>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

const SecondMessageDialog = ({ open, setOpen, value, message }) => {
    const { socket } = useContext(SocketContext);

    const handleClick = async () => {
        const messageBody = {
            senderId: message.sender_id,
            recieverId: message.reciever_id,
            messageId: message._id
        }

        const result = await messageOptions(messageBody, value);
        setOpen(false);

        if (result){
            alert("Success.");

            socket && socket.emit("messageDeleteOrReport");
        }
        else {
            alert("Failed.")
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <DialogContentText>
                    {
                        value === "delete" ?
                        "Are you sure you want to delete this message? The message still remains at other's end."
                        :
                        "Are you sure you want to report the message?"
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color={value === "delete" ? "error" : "primary"} onClick={handleClick}>
                    {
                        value == "delete" ? "Delete" : "Report"
                    }
                </Button>
                <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export {
    MessageDialog,
    SecondMessageDialog
};