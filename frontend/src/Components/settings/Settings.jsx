import React from "react";
import { Box, styled } from "@mui/material";
import AccountSettings from "./AccountSettings";
import PrivacySettings from "./PrivacySettings";
import DeleteAccount from "./DeleteAccount";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const StyledBox = styled(Box)(({theme}) => ({
    overflowY: "auto",
    height: "96vh",
    margin: "2vh 2vw",
    width: "66vw",
    backgroundColor: "white",
    borderRadius: "3px",
    padding: "4vh 3vw",
    [theme.breakpoints.down('md')]: {
        margin: "0px",
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        padding: "4vh 6vw"
    }
}))

const ArrowBox = styled(Box)(({ theme }) => ({
    paddingBottom: "5vh",
    [theme.breakpoints.up('md')]: {
        display: "none"
    }
}))

const Settings = () => {
    const navigate = useNavigate();

    return (
        <StyledBox id="settings-div">
            <ArrowBox>
                <ArrowBack onClick={() => navigate("/")} />
            </ArrowBox>
            <h3 className="h3" style={{textAlign: "center"}}>Manage Your Profile Settings</h3>
            <AccountSettings />
            <PrivacySettings />
            <DeleteAccount />
        </StyledBox>
    )
}

export default Settings;