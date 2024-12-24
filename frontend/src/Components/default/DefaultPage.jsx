import React, { useState } from "react";
import DialogBox from "./DialogBox.jsx";

const headDiv = {
    width: "70vw",
    padding: "20px",
    height: "100vh"
}

const headParagraph = {
    textAlign: "center",
    marginTop: "25vh",
    color: "whitesmoke",
    marginBottom: "2.5vh",
    fontSize: "45px",
    fontFamily: "cursive"
}

const textPara = {
    textAlign: 'center',
    color: 'white',
    fontSize: '22px',
    fontFamily: 'cursive',
    marginBottom: "8vh"
}

const buttonStyle = {
    color: 'rgb(9 141 247)',
    border: '1px solid rgb(9 141 247)',
    fontSize: '18px'
}

const Default = () => {
    const [open, setOpen] = useState(false);

    return (
        <div style={headDiv}>
            <div style={{ textAlign: 'center' }}>
                <p className="h1" style={headParagraph}>Get Started</p>
                <p style={textPara}>Start searching people and chatting with them.</p>
                <button
                    type="button"
                    className="btn btn-light"
                    style={buttonStyle}
                    onClick={() => setOpen(true)}                
                >
                    Search for Friends
                </button>
            </div>

            {
                open && <DialogBox open={open} setOpen={setOpen} />
            }
        </div>
    )
}

export default Default;