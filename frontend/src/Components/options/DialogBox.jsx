import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from "@mui/material";

const DialogBox = ({ open, setOpen, key }) => {
    console.log(key);
    const head = key?.charAt(0).toUpperCase() + key?.substring(1);

    const handleClick = () => {

    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                {`Add ${head}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={() => handleClick()}>Add</button>
                <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox;