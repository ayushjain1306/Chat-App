import React, { useState, useContext } from "react";
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, DialogContentText, Backdrop, CircularProgress } from "@mui/material";
import { blockUser } from "../../service/settingsAPI.js";
import { clearChat } from "../../service/getChats.js";
import { SocketContext } from "../../context/socketContext.jsx";
import { useNavigate } from "react-router-dom";

const ChatDialog = ({ open, setOpen, secondPersonId }) => {
    const [loading, setLoading] = useState(false);
    const { socket } = useContext(SocketContext);
 
    const handleDelete = async () => {
        setLoading(true);

        const result = await clearChat(secondPersonId);

        setLoading(false);

        setOpen(false);

        if (result) {
            socket?.emit("messageDeleteOrReport");
            alert("Success");
        }
        else {
            alert("Failed.");
        }
    }

    const handleClose = () => setOpen(false);

    return (
        <Dialog open={open} onClose={handleClose}>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle>
                Clear Chat
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete your chat? This will delete your all messages and files.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

const BlockDialog = ({ open, setOpen, secondPersonId }) => {
    const [loading, setLoading] = useState(false);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
 
    const handleBlock = async () => {
        setLoading(true);

        const result = await blockUser(secondPersonId);

        setLoading(false);

        setOpen(false);

        if (result) {
            alert("Success.");
            navigate('/')
            socket?.emit("user-blocked");
        }
        else {
            alert("Failed.")
        }
    }

    const handleClose = () => setOpen(false);

    return (
        <Dialog open={open} onClose={handleClose}>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle>
                Block Person
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to block the person? It will delete all your chat with him.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleBlock}>Block</Button>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export {
    ChatDialog,
    BlockDialog
};