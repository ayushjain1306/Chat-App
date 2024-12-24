import React, { useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, styled } from "@mui/material";
import { checkPassword, updatePassword, updateUsername } from "../../service/settingsAPI.js";
import { performLogout } from "../../service/accountWork.js";

const StyledDialogContentText = styled(DialogContentText)(({theme}) => ({
    width: "30vw",
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))

const StyledDialogContent = styled(DialogContent)(({theme}) => ({
    width: "30vw",
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))

const tdStyle = {
    cursor: "pointer",
    color: "rgb(9 141 220)",
    fontSize: "16.5px"
}

const AccountSettings = () => {
    const [open, setOpen] = useState(false);
    const [openAnother, setOpenAnother] = useState(false);
    const [openLog, setOpenLog] = useState(false);

    const handleClick = (value) => {
        if (value === "Username") {
            setOpen(true);
        }
        else if (value === "LogOut"){
            setOpenLog(true);
        }
        else {
            setOpenAnother(true);
        }
    }

    return (
        <div style={{ marginTop: "6vh" }}>
            <h4 className="h4">Account Settings</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={tdStyle} onClick={() => handleClick("Username")}>Change Your Username</td>
                    </tr>
                    <tr>
                        <td style={tdStyle} onClick={() => handleClick("Password")}>Reset Your Password</td>
                    </tr>
                    <tr>
                        <td style={tdStyle} onClick={() => handleClick("LogOut")}>Logout</td>
                    </tr>
                </tbody>
            </table>

            {
                open && <AnotherDialogBox open={open} setOpen={setOpen} value={"Username"} />
            }

            {
                openAnother && <DialogBox open={openAnother} setOpen={setOpenAnother} />
            }

            {
                openLog && <LogDialogBox open={openLog} setOpen={setOpenLog} />
            }
        </div>
    )
}

const DialogBox = ({ open, setOpen }) => {
    const [openAnother, setOpenAnother] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const handleClick = async() => {
        const result = await checkPassword(password);

        if (result === true){
            setOpenAnother(true);
        }
        else if (result === false) {
            setError("Wrong Password!");
        }
        else {
            setOpen(false);
            alert("Password Checking Failed. Try Again Later!");
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                Enter Old Password
            </DialogTitle>
            <DialogContent>
                <StyledDialogContentText>
                    <input type="password" className="form-control" placeholder="Enter your password" onChange={(e) => handleChange(e)} />
                    <p style={{color: "red", fontSize: "12px"}}>{error}</p>
                </StyledDialogContentText>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleClick()}>Next</button>
            </DialogActions>
            {
                openAnother && <AnotherDialogBox open={openAnother} setOpen={setOpenAnother} value="Password" setOpenAnother={setOpen} />
            }
        </Dialog>
    )
}

const AnotherDialogBox = ({ open, setOpen, value, setOpenAnother }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirm = (e) => {
        setConfirm(e.target.value);
    }

    const handleClick = async () => {
        if (value === "Username"){
            if (username === ""){
                return;
            }

            const result = await updateUsername(username);

            if (result === true){
                setOpen(false);
                alert("Username Updated Successfully.");
                window.location.href = "/"
            }
            else if (result === false){
                setError("Username Already Taken.");
            }
        }
        else {
            if (password === "" && confirm === ""){
                setPasswordError("")
                return;
            }
            else if (password !== confirm){
                setPasswordError("The passwords are not matched.");
                return;
            }

            const result = await updatePassword(password);

            if (result){
                setOpen(false);
                setOpenAnother(false);
                alert("Password Reset Successfully.");
            }
            else {
                setPasswordError("");
                alert("Failed to Reset your Password. Try Again Later!");
                setOpenAnother(false);
            }
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                {
                    value === "Username"
                        ?
                        "Change your Username"
                        :
                        "Change your Password"
                }
            </DialogTitle>
            <StyledDialogContent>
                {
                    value === "Username"
                        ?
                        <div>
                            <input type="text" className="form-control" placeholder="Enter your New Username" onChange={(e) => handleUsername(e)} />
                            <p style={{color: "red", fontSize: "12px"}}>{error}</p>
                        </div>
                        :
                        <div>
                            <label>New Password</label>
                            <input type="password" className="form-control" placeholder="Enter your Password" onChange={(e) => handlePassword(e)} />

                            <label style={{marginTop: "2vh"}}>Confirm your New Password</label>
                            <input type="password" className="form-control" placeholder="Confirm New Password" onChange={(e) => handleConfirm(e)} />
                            <p style={{color: "red", fontSize: "12px"}}>{passwordError}</p>
                        </div>
                }
            </StyledDialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleClick()}>Change</button>
            </DialogActions>
        </Dialog>
    )
}

const LogDialogBox = ({ open, setOpen }) => {

    const handleClick = async() => {
        const result = await performLogout();

        if (result){
            window.location.reload();
        }
        else {
            alert("Failed to Logout. Try Again Later!")
        }

        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                Logout Your Account
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are your sure you want to logout your account?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={() => setOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleClick()}>Logout</button>
            </DialogActions>
        </Dialog>
    )
}

export default AccountSettings;