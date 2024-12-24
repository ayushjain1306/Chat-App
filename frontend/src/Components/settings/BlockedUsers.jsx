import React, { useState, useEffect } from "react";
import { getBlockedUsers } from "../../service/settingsAPI.js";
import { Typography, Button, Backdrop, CircularProgress, Box, styled } from "@mui/material";
import profilePicture from "../../images/profilePic.jpg";
import { unblockUser } from "../../service/settingsAPI.js";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const StyledBox = styled(Box)(({ theme }) => ({
    height: "96vh",
    margin: "2vh 2vw",
    width: "66vw",
    backgroundColor: "white",
    borderRadius: "3px",
    [theme.breakpoints.down('md')]: {
        margin: "0px",
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
    }
}))

const headingStyle = {
    paddingTop: "4vh",
    width: "88%",
    margin: "auto"
}

const BlockedUsers = () => {
    const [blockedUsers, setBlockedUsers] = useState(null);
    const [fetch, setFetch] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlockedUsers = async () => {
            const response = await getBlockedUsers();

            if (response) {
                setBlockedUsers(response);
            }
        }

        fetchBlockedUsers();
    }, [fetch]);

    const handleClick = async (id) => {
        setLoading(true);

        const result = await unblockUser(id);

        setLoading(false);

        if (result) {
            setFetch(fetch + 1);
        }
        else {
            alert("Failed. Try Again Later.");
        }
    }

    return (
        blockedUsers &&
        <StyledBox>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <h4 className="h2" style={headingStyle}><ArrowBack onClick={() => navigate("/settings")} style={{marginRight: "10px"}} />Blocked Users</h4>
            <hr style={{
                width: "88%",
                margin: "auto",
                marginTop: "2vh",
                border: "1px solid rgb(9 141 247)",
                padding: "0px",
                borderRadius: "10px"
            }} />

            <div>
                {
                    blockedUsers.length > 0 ?
                        <table className="table" style={{ width: "88%", margin: "auto", marginTop: "2vh" }}>
                            <tbody>
                                {
                                    blockedUsers?.map((user) => {
                                        return (
                                            <tr key={user._id}>
                                                <td style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={user?.blocked_person_image !== "" ? user.blocked_person_image : profilePicture} alt="profile-pic" style={{ height: "40px", borderRadius: "50%" }} />
                                                    <Typography style={{ marginLeft: "13px", fontSize: "18px" }}>{user?.blocked_person_name}</Typography>
                                                </td>
                                                {/* <td style={{width: "60%"}}></td> */}
                                                <td style={{ width: "30%", textAlign: "center" }}>
                                                    <Button variant="contained" color="warning" onClick={() => handleClick(user.blocked_one)}>Unblock</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <div>
                            <h6 className="h6" style={{
                                width: "88%",
                                margin: "auto",
                                marginTop: "5vh",
                                textAlign: "center",
                                color: "grey"
                            }}>No User is in your BlockList.</h6>
                        </div>
                }
            </div>
        </StyledBox>
    )
}

export default BlockedUsers;