import React, { useContext } from "react";
import { Box, Button, styled } from "@mui/material";
import profilePic from "../../images/profilePic.jpg";
import { UserContext } from "../../context/userContext";
import { performLogout } from "../../service/accountWork.js";

const StyledBox = styled(Box)(({theme}) => ({
    position: "absolute",
    bottom: "1vh",
    width: "15vw",
    height: "27vh",
    backgroundColor: "#e3e3e3",
    textAlign: "center",
    left: "4vw",
    borderRadius: "3px",
    [theme.breakpoints.down('sm')]: {
        zIndex: "5",
        width: "56vw",
        height: "18vh",
        left: '42vw',
        bottom: "73vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        zIndex: "5",
        width: "22vw",
        height: "19vh",
        left: '76vw',
        bottom: "73vh"
    }
}))

const StyledButton = styled(Button)(({theme}) => ({
    width: "12vw",
    marginTop: "2vh",
    marginBottom: "1.5vh",
    [theme.breakpoints.down('sm')]: {
        width: "28vw",
        marginRight: "10px"
    }
}))

const AnotherStyledButton = styled(Button)(({theme}) => ({
    width: "12vw",
    [theme.breakpoints.down('sm')]: {
        width: "20vw"
    }
}))

const imageStyle = {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    marginTop: "2vh"
}

const HamburgerMenu = ({setOpen}) => {
    const { user } = useContext(UserContext);

    const handleClick = async () => {
        const response = await performLogout();

        if (response){
            window.location.href = "/";
        }
        else {
            alert("Failed. Try Again Later!")
        }
    }
    
    return (
        <StyledBox>
            <img src={user?.image ? user?.image : profilePic} alt="profile-pic" style={imageStyle} /><br/>
            <StyledButton variant = "contained" onClick={() => handleClick()}>Log Out</StyledButton>
            <AnotherStyledButton variant = "contained" onClick={() => setOpen(false)}>Close</AnotherStyledButton>
        </StyledBox>
    )
}

export default HamburgerMenu;