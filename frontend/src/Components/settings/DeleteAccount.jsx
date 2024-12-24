import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, styled } from "@mui/material";
import { checkPassword, deleteAccount } from "../../service/settingsAPI.js";
import { useNavigate } from "react-router-dom";
import { AnotherLoader } from "../../Loader.jsx";

const StyledDialogContent = styled(DialogContent)(({theme}) => ({
    width: "30vw",
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))

const DeleteAccount = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h4 className="h4">Delete Account</h4>
            <div style={{marginTop: "2vh"}}>
                <div>By Deleting your account, you understand that all of your data, including messages, files, and profile information, will be permanently deleted. Click this button to permanently delete your account.</div>
                <button className="btn btn-danger" style={{marginTop: "3vh"}} onClick={() => setOpen(true)}>Delete Account</button>
            </div>

            {
                open && <AnotherDialogBox open={open} setOpen={setOpen} />
            }
        </div>
    )
}

const DialogBox = ({ open, setOpen, setAnotherOpen }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const result = await deleteAccount();
        setLoading(false);
        if (result){
            navigate("/");
        }
        else {
            setOpen(false);
            setAnotherOpen(false);
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <DialogContentText style={{color: "black"}}>
                    This step cannot be reversed. Please click the button again to confirm.
                </DialogContentText>
            </DialogContent>
            {
                loading && <AnotherLoader />
            }
            <DialogActions>
                <button className="btn btn-primary" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => handleClick()}>Delete Account</button>
            </DialogActions>
        </Dialog>
    )
}

const AnotherDialogBox = ({ open, setOpen }) => {
    const [password, setPassword] = useState("");
    const [anotherOpen, setAnotherOpen] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const handleClick = async () => {
        if (password === ""){
            return;
        }

        const result = await checkPassword(password);

        if (result === true){
            setAnotherOpen(true);
            setError("");
        }
        else if (result === false){
            setError("Wrong Password!");
        }
        else {
            setOpen(false);
            alert("Failed. Try Again Later!");
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                Enter Password
            </DialogTitle>
            <StyledDialogContent>
                <DialogContentText>
                    <input className="form-control" type="password" placeholder="Enter your password" onChange={(e) => handleChange(e)} />
                    <p style={{color: "red", fontSize: "12px" }}>{error}</p>
                </DialogContentText>
            </StyledDialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleClick()}>Check</button>
            </DialogActions>

            {
                anotherOpen && <DialogBox open={anotherOpen} setOpen={setAnotherOpen} setAnotherOpen={setOpen} />
            }
        </Dialog>
    )
}

export default DeleteAccount;