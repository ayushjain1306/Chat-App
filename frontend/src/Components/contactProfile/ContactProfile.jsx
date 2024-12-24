import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, Backdrop, CircularProgress, Button, styled } from "@mui/material";
import { PersonContext } from "../../context/secondPerson.jsx";
import { fetchContactDetails } from "../../service/contactWork.js";
import { useNavigate } from "react-router-dom";
import profileImage from "../../images/profilePic.jpg";
import { Circle, Block, ArrowBack } from "@mui/icons-material";
import { blockUser } from "../../service/settingsAPI.js";

const StyledBox = styled(Box)(({ theme }) => ({
    width: "71vw",
    height: "100vh",
    padding: "15px",
    [theme.breakpoints.down('md')]: {
        width: "100vw"
    }
}))

const AnotherStyledBox = styled(Box)(({ theme }) => ({
    position: "relative",
    textAlign: 'center'
}))

const OnlineBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '55%',
    bottom: "5%"
}))

const StyledImage = styled('img')(({ theme }) => ({
    borderRadius: "50%",
    width: "150px",
    height: "150px"
}))

const ContentBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    marginTop: "3vh"
}))

const UserTypo = styled(Typography)(({ theme }) => ({
    fontSize: '22px'
}))

const BioTypo = styled(Typography)(({ theme }) => ({
    fontSize: '18px'
}))

const InsideBox = styled(Box)(({ theme }) => ({
    height: "94vh",
    backgroundColor: "white",
    paddingTop: "5vh",
    borderRadius: '3px'
}))

const BlockBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    marginTop: "30vh"
}))

const ArrowBox = styled(Box)(({ theme }) => ({
    paddingLeft: "5vw",
    [theme.breakpoints.up('md')]: {
        display: "none"
    }
}))

const ContactProfile = () => {
    const [personData, setPersonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { secondPerson } = useContext(PersonContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!secondPerson) {
                navigate('/');
                return;
            }

            const result = await fetchContactDetails(secondPerson._id);

            if (result) {
                setPersonData(result);
            }
        }

        fetchData();
    }, []);

    const handleClick = async () => {
        setLoading(true);

        const result = await blockUser(secondPerson._id);

        setLoading(false);

        if (result) {
            navigate('/');
        }
        else {
            alert("Failed.");
        }
    }

    return (
        personData &&
        <StyledBox>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <InsideBox>
                <ArrowBox>
                    <ArrowBack onClick={() => navigate("/chatting")} />
                </ArrowBox>
                <AnotherStyledBox>
                    <StyledImage src={personData.image === "" ? profileImage : personData.image} alt="profile-pic" />
                    {
                        personData.online_status && <OnlineBox className="text-success"><Circle fontSize="large" /></OnlineBox>
                    }
                </AnotherStyledBox>

                <ContentBox>
                    <h4 className="h2">{personData.name}</h4>
                    <UserTypo>@{personData.username}</UserTypo>
                    <BioTypo>{personData.bio}</BioTypo>
                </ContentBox>
                <BlockBox>
                    <Button variant="contained" color="error" onClick={handleClick}><Block style={{marginRight: "10px"}} />Block User</Button>
                </BlockBox>
            </InsideBox>
        </StyledBox>
    )
}

export default ContactProfile;