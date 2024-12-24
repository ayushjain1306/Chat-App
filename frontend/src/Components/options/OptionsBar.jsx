import React, { useContext, useState } from "react";
import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import smallLogo from "../../images/smallLogo.png";
import profilePic from "../../images/profilePic.jpg";
import { UserContext } from "../../context/userContext.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
import { Person, Settings } from "@mui/icons-material";

const HeadDiv = styled(Box)(({theme}) => ({
    backgroundColor: "inherit",
    height: "100vh",
    width: "4vw",
    [theme.breakpoints.down('md')]: {
        width: "100vw",
        height: "10vh",
        display: 'flex'
    }
}))

const NewLink = styled(Link)(({theme}) => ({
    fontSize: "43px",
    color: "white",
    [theme.breakpoints.down('md')]: {
        marginLeft: "10px",
        fontSize: "35px"
    }
}))

const UpperDiv = styled(Box)(({theme}) => ({
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
        flexDirection: "row",
        height: "10vh",
        width: "50%",
        paddingLeft: "10px"
    }
}))

const LowerDiv = styled(Box)(({theme}) => ({
    height: "10vh",
    textAlign: "center",
    [theme.breakpoints.down('md')]: {
        width: "50%",
        display: 'flex',
        alignItems: "center",
        justifyContent: "right",
        paddingRight: "10px"
    }
}))

const LogoStyle = styled('img')(({theme}) => ({
    height: "8vh",
    marginTop: "2vh",
    [theme.breakpoints.down('md')]: {
        marginTop: "0vh"
    }
}))

const personImage = {
    height: "48px",
    borderRadius: "50%",
    width: "48px",
    padding: "5px",
    marginTop: "1.5vh",
    cursor: "pointer"
}

const ProfileImage = styled('img')(({theme}) => ({
    height: "43px",
    width: "43px",
    borderRadius: "50%",
    marginTop: "1vh",
    marginBottom: "1vh",
    position: "relative",
    cursor: "pointer",
    [theme.breakpoints.down('md')]: {
        height: "48px",
        width: "48px"
    }
}))

const settingImage = {
    height: "48px",
    width: "48px",
    borderRadius: "50%",
    padding: "5px",
    position: "relative",
    marginTop: "1.5vh",
    cursor: "pointer"
}

const OptionsBar = () => {
    const [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <HeadDiv>
            <UpperDiv>
                <Link to="/"><LogoStyle src={smallLogo} alt="logo" /></Link>
                <NewLink to="/your-profile"><Person fontSize="inherit" color="inherit" /></NewLink>
                <NewLink to="/settings"><Settings fontSize="inherit" color="inherit" /></NewLink>
            </UpperDiv>
            <LowerDiv>
                <ProfileImage src={user.image ? user.image : profilePic} alt="profilePic" onClick={() => setOpen(true)} />
            </LowerDiv>
            {
                open && <HamburgerMenu setOpen={setOpen} />
            }
        </HeadDiv>
    )
}

export default OptionsBar;