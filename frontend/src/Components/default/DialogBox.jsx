import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, styled } from "@mui/material";
import searchPeople from "../../service/searchPeople.js";
import { AnotherLoader } from "../../Loader.jsx";
import profilePic from "../../images/profilePic.jpg";
import { PersonContext } from "../../context/secondPerson.jsx";
import { Close } from "@mui/icons-material";

const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
    width: "34vw",
    display: 'flex',
    justifyContent: "space-between",
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))

const noDivStyle = {
    textAlign: 'center',
    marginBottom: '2vh'
}

const imageStyle = {
    height: '6vh',
    width: "6vh",
    borderRadius: '50%',
    marginRight: "1.5vw"
}

const objectDiv = {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    margin: 'auto',
    marginBottom: '2vh',
    backgroundColor: "#e3e3e3",
    borderRadius: '5px',
    padding: "1vh 1vw",
    cursor: "pointer"
}

const DialogBox = ({ open, setOpen }) => {
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const abortControllerRef = useRef(null);
    const navigate = useNavigate();
    const { setSecondPerson } = useContext(PersonContext);

    const handleChange = async (e) => {
        setInput(e.target.value);

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        if (e.target.value === "") {
            setResult(null);
            setShow(false);
            setText("");
            return;
        }

        const controller = new AbortController();

        abortControllerRef.current = controller;

        setText("");
        setLoading(true);

        const response = await searchPeople(e.target.value, controller);

        setLoading(false);

        if (response && response.length > 0) {
            setText("");
            setShow(true);
            setResult(response);
        }
        else {
            setShow(false);
            setText("No Result Found.");
        }
    }

    const handleClick = (obj) => {
        setSecondPerson(obj);
        console.log(obj);
        navigate("chatting");
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>
                Find your Friends here
                <Close fontSize="large" onClick={() => handleClose()}/>
            </DialogTitle>
            <hr />
            <DialogContent>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search with username"
                        value={input}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </DialogContent>
            <hr />
            {
                loading && <AnotherLoader />
            }
            {
                text.length > 0
                    ?
                    <div style={noDivStyle}>
                        {text}
                    </div>
                    :
                    <div>
                        {
                            show &&
                            <div>
                                {
                                    result && result.map((obj) => {
                                        return (
                                            <div style={objectDiv} key={obj._id} onClick={() => handleClick(obj)}>
                                                <img src={obj.image ? obj.image : profilePic} alt="profile-pictures" style={imageStyle} />
                                                <p className="h5" style={{ fontSize: "20px", fontFamily: "cursive" }}>{obj.username}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
            }
        </Dialog>
    )
}

export default DialogBox;