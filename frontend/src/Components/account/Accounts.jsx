import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import LoginWork from "./Login.jsx";
import SignUpWork from "./Signup.jsx";
import accountImage from "../../images/accountImage.jpeg";

const StyledDiv = styled(Box)(({theme}) => ({
    backgroundColor: "rgb(9 141 247)",
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
        flexDirection: "column"
    }
}))

const ImageDiv = styled(Box)(({theme}) => ({
    width: "50%",
    textAlign: "center",
    [theme.breakpoints.down('md')]: {
        width: "100%",
        height: "40%",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    }
}))

const Image = styled('img')(({theme}) => ({
    height: "60vh",
    width: "80%",
    [theme.breakpoints.down('md')]: {
        height: "35vh",
        marginTop: "2vh"
    }
}))

const AccountWork = () => {
    const [login, setLogin] = useState(true);

    return (
        <StyledDiv>
            <ImageDiv>
                <Image src={accountImage} alt="account" />
            </ImageDiv>
            {
                login ? <LoginWork login={login} setLogin={setLogin} /> : <SignUpWork login={login} setLogin={setLogin} />
            }
        </StyledDiv>
    )
}

export default AccountWork;