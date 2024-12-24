import React, { useState } from "react";
import { performSignup } from "../../service/accountWork.js";
import { styled, Box, Button, Backdrop, CircularProgress } from "@mui/material";

const HeadDiv = styled(Box)(({theme}) => ({
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('md')]: {
        width: "100%",
        height: "60%"
    }
}))

const SignupDiv = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    height: "80vh",
    width: "55%",
    borderRadius: "3px",
    [theme.breakpoints.down('md')]: {
        width: "70%",
        height: "50vh",
        overflowY: "auto",
        paddingBottom: "3vh"
    }
}))

const HeadText = styled('h4')(({theme}) => ({
    fontFamily: "'Allura', cursive",
    textAlign: "center",
    fontSize: "20px",
    paddingTop: "2.5vh",
    paddingBottom: "2.5vh"
}))

const ErrorDiv = styled(Box)(({theme}) => ({
    color: "red",
    fontSize: "11px"
}))

const StyledButton = styled(Button)(({theme}) => ({
    width: "80%"
}))

const initialData = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: ""
}

const SignUpWork = ({ setLogin }) => {
    const [input, setInput] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value});
    }

    const handleClick = async(e) => {
        e.preventDefault();

        document.getElementById("name-error").innerText = "";
        document.getElementById("username-error").innerText = "";
        document.getElementById("password-error").innerText = "";
        document.getElementById("email-error").innerText = "";
        document.getElementById("phone-error").innerText = "";

        if (input.name === ""){
            document.getElementById("name-error").innerText = "This field cannot be empty.";
            return;
        }

        if (input.email === ""){
            document.getElementById("email-error").innerText = "This field cannot be empty.";
            return;
        }

        if (input.phone === ""){
            document.getElementById("phone-error").innerText = "This field cannot be empty.";
            return;
        }

        if (input.phone.length > 10 || input.phone.length < 10){
            document.getElementById("phone-error").innerText = "Phone must have only 10 digits.";
            return;
        }

        if (input.username === ""){
            document.getElementById("username-error").innerText = "This field cannot be empty.";
            return;
        }

        if (input.password === ""){
            document.getElementById("password-error").innerText = "This field cannot be empty.";
            return;
        }

        setLoading(true);

        const result = await performSignup(input);

        setLoading(false);

        if (result === "Email Already exists."){
            document.getElementById("email-error").innerText = "User with this email already exists.";
        }
        else if (result === "Username Already exists."){
            document.getElementById("username-error").innerText = "User with this username already exists.";
        }
        else if (result === "Phone Number Already exists."){
            document.getElementById("phone-error").innerText = "User with this phone number already exists.";
        }
        else {
            document.getElementById("username-error").innerText = "";
            document.getElementById("email-error").innerText = "";
            document.getElementById("phone-error").innerText = "";
        }
    }

    const handleClickAnother = (e) => {
        e.preventDefault();
        setLogin(true);
    }

    return (
        <HeadDiv>
            <Backdrop
                sx={(theme) => ({color: "#fff", zIndex: theme.zIndex.drawer + 1})}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <SignupDiv>
                <HeadText>Create your Account</HeadText>

                <form style={{ width: "80%", margin: "auto", textAlign: "center" }}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Name"
                            id="name"
                            value={input.name}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <ErrorDiv id="name-error"></ErrorDiv>
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your Email Address"
                            id="email"
                            value={input.email}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <ErrorDiv id="email-error"></ErrorDiv>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Phone Number"
                            id="phone"
                            value={input.phone}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <ErrorDiv id="phone-error"></ErrorDiv>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            id="username"
                            value={input.username}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <ErrorDiv id="username-error"></ErrorDiv>
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            id="password"
                            value={input.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <ErrorDiv id="password-error"></ErrorDiv>
                    </div>

                    <StyledButton style={{fontWeight: "bold"}} variant="contained" color="primary" type="submit" onClick={handleClick}>Create Account</StyledButton>
                    <StyledButton style={{marginTop: "3vh", fontWeight: "bold"}} variant="outlined" color="warning" onClick={handleClickAnother}>Already have an Account</StyledButton>
                </form>
            </SignupDiv>
        </HeadDiv>
    )
}

export default SignUpWork;