import React, { useContext, useState } from "react";
import { Box, styled } from "@mui/material";
import profilePic from "../../images/profilePic.jpg";
import { PersonContext } from "../../context/secondPerson.jsx";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled(Box)(({theme}) => ({
    paddingTop: "2.5vh",
    paddingLeft: "1.5vw",
    paddingRight: "1.5vw",
    paddingBottom: "1.5vh",
    height: "20vh"
}))

const SearchDivStyle = styled(Box)(({theme}) => ({
    backgroundColor: "#e3e3e3",
    position: "absolute",
    width: "22%",
    top: "15vh",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
        width: "60%",
        top: "24.5vh"
    },
    [theme.breakpoints.between("sm", "md")]: {
        width: "40%",
        top: "21vh"
    }
}))

const HeadPart = ({ chats }) => {
    const [input, setInput] = useState("");
    const [filteredChats, setFilteredChats] = useState([]);
    const { setSecondPerson } = useContext(PersonContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput(e.target.value);

        if (e.target.value === "") {
            setFilteredChats([]);
        }
        else {
            setFilteredChats(chats.filter((chat) => chat.username.includes(e.target.value)));
        }
    }

    const handleClick = (chat) => {
        setSecondPerson({
            _id: chat?._id,
            name: chat?.name,
            username: chat?.username,
            image: chat?.image,
            online_status: chat?.online_status
        });

        setInput("");

        navigate("/chatting");
    }

    return (
        <StyledDiv>
            <h5 style={{ textAlign: "center", marginBottom: "3.5vh" }}>Chats</h5>

            <div className="input-group mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Find your chats here"
                    value={input}
                    onChange={(e) => handleChange(e)}
                />
                <button className="btn btn-primary" type="button" id="button-addon2">Search</button>
            </div>
            {
                input !== "" &&
                (
                    filteredChats.length > 0
                        ?
                        <SearchDivStyle>
                            {
                                filteredChats.map((chat) => {
                                    return (
                                        <div style={{
                                            display: "flex",
                                            padding: "10px",
                                            cursor: "pointer"
                                        }} onClick={() => handleClick(chat)}>
                                            <img src={chat.image ? chat.image : profilePic}  style={{borderRadius: "50%", height: "7vh", width: "7vh"}} alt="profile-pic" />
                                            <div style={{marginLeft: "9px"}}>
                                                <h6 className="h6" style={{marginBottom: "4px"}}>{chat.name}</h6>
                                                <p style={{margin: 0}}>{chat.username}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </SearchDivStyle>
                        :
                        <SearchDivStyle>
                            <p style={{marginTop: "10px", textAlign: "center"}}>No Chat Found.</p>
                        </SearchDivStyle>
                )
            }
        </StyledDiv>
    )
}

export default HeadPart;