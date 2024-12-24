import React, { useState } from "react";
import { performLogin } from "../../service/accountWork.js";
import { useNavigate } from "react-router-dom";
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

const LoginDiv = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    height: "80vh",
    width: "55%",
    borderRadius: "3px",
    [theme.breakpoints.down('md')]: {
        width: "70%",
        height: "50vh"
    }
}))

const ErrorDiv = styled(Box)(({theme}) => ({
    color: "red",
    fontSize: "11px"
}))

const HeadText = styled('h4')(({theme}) => ({
    textAlign: "center",
    fontSize: "25px",
    paddingTop: "4vh",
    paddingBottom: "4vh",
    [theme.breakpoints.down('sm')]: {
        paddingTop: "3vh",
        paddingBottom: "2vh"
    }
}))

const StyledButton = styled(Button)(({theme}) => ({
    width: "70%",
    [theme.breakpoints.down('sm')]: {
        width: "80%",
    }
}))

const initialData = {
    username: "",
    password: ""
}

const LoginWork = ({ setLogin }) => {
    const [input, setInput] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value});
    }

    const handleClick = async(e) => {
        e.preventDefault();

        document.getElementById("username-error-login").innerText = "";
        document.getElementById("password-error-login").innerText = "";

        if (input.username === ""){
            document.getElementById("username-error-login").innerText = "This field cannot be empty.";
            return;
        }

        if (input.password === ""){
            document.getElementById("password-error-login").innerText = "This field cannot be empty.";
            return;
        }

        setLoading(true);

        const result = await performLogin(input);
        
        setLoading(false);

        if (result === "Username Not Found."){
            document.getElementById("username-error-login").innerText = "Username Not Found.";
        }
        else if (result === "Incorrect Password"){
            document.getElementById("password-error-login").innerText = "Incorrect Password.";
        }
        else {
            document.getElementById("username-error-login").innerText = "";
            document.getElementById("password-error-login").innerText = "";

            if (!result){
                alert("Failed to log in. Try Again Later!");
            }

            if (result === "Login Successful."){
                navigate("/");
            }
        }

    }

    const handleClickAnother = (e) => {
        e.preventDefault();
        setLogin(false);
    }

    return (
        <HeadDiv>
            <Backdrop
                sx={(theme) => ({color: "#fff", zIndex: theme.zIndex.drawer + 1})}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <LoginDiv>
                <HeadText>Login</HeadText>

                <form style={{width: "80%", margin: "auto", textAlign: "center"}}>
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
                        <ErrorDiv id="username-error-login"></ErrorDiv>
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
                        <ErrorDiv id="password-error-login"></ErrorDiv>
                    </div>

                    <StyledButton style={{marginTop: "2vh", fontWeight: "bold"}} type="submit" variant="contained" color="primary" onClick={(e) => handleClick(e)}>Log In</StyledButton>
                    <StyledButton style={{marginTop: "3vh", fontWeight: "bold"}} variant="outlined" color="warning" onClick={(e) => handleClickAnother(e)} >Don't have an account</StyledButton>
                </form>
            </LoginDiv>
        </HeadDiv>
    )
}

export default LoginWork;