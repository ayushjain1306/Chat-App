import React, { useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { sendTextMessage, uploadMessageImage } from "../../service/sendMessage.js";
import { PersonContext } from "../../context/secondPerson.jsx";
import { ChatContext } from "../../context/chatsContext.jsx";
import getMessages from "../../service/getMessages.js";

const DialogBox = ({ open, setOpen, type, setMessages }) => {
    const [file, setFile] = useState(null);
    const { secondPerson } = useContext(PersonContext);
    const { flag, setFlag } = useContext(ChatContext);

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = async() => {
        if (!file){
            return;
        }

        const data = new FormData();

        data.append('file', file);

        document.getElementById("loader").style.display = "block";

        const imageURL = await uploadMessageImage(data);

        if (imageURL){
            const messageData = {
                reciever_id: secondPerson._id,
                message: imageURL,
                send_time: new Date(Date.now()),
                type: type
            }

            const result = await sendTextMessage(messageData);

            if (result){
                const response = await getMessages(secondPerson._id);

                if (response){
                    setMessages(response);
                    setFlag(flag+1);
                }
            }

            
        }

        document.getElementById('loader').style.display = "none"

        setOpen(false);
    }

    const handleChange = (e) => {
        const f = e.target.files[0];
        
        if (f){
            setFile(f)
        }
        else {
            setFile(null);
        }
    }

    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>
                {
                    type === "images" 
                    ?
                    "Select an Image"
                    :
                    "Select a Document"
                }
            </DialogTitle>
            <DialogContent>
                <div>
                    <input type="file" style={{marginTop: "5px"}} className="form-control" accept={type === "images" ? "image/*" : ".pdf, .doc, .docx, .xlsx, .xls, .txt"} onChange={(e) => handleChange(e)} />
                </div>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-secondary" onClick={() => handleClose()}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleClick()}>Send</button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox;