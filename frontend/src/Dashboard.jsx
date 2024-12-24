import React, { useState, useEffect, useContext } from "react";
import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideContent from "./Components/Sidebar/Sidebar.jsx";
import OptionsBar from "./Components/options/OptionsBar.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserData } from "./service/userData.js";
import { UserContext } from "./context/userContext.jsx";
import { Add } from "@mui/icons-material";
import DialogBox from "./Components/default/DialogBox.jsx";
import { SocketContext } from "./context/socketContext.jsx";

const StyledDiv = styled(Box)(({theme}) => ({
    backgroundColor: "rgb(9 141 247)",
    height: "100vh",
    width: "100vw"
}))

const OptionsDiv = styled(Box)(({theme}) => ({

}))

const SideDiv = styled(Box)(({theme}) => ({

}))

const OutletDiv = styled(Box)(({theme}) => ({

}))

const PlusDiv = styled(Box)(({theme}) => ({
    backgroundColor: "rgb(9 141 247)",
    color: "white",
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    position: "fixed",
    bottom: "40px",
    right: "40px",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}))

const Dashboard = () => {
    const navigate = useNavigate();
    const [pathName, setPathName] = useState("");
    const [open, setOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { setUserId } = useContext(SocketContext);
    const location = useLocation();

    useEffect(() => {
        setPathName(location.pathname);
    }, [location.pathname, window.innerWidth]);

    useEffect(() => {
        const validateUser = async() => {
            const userData = await getUserData();
    
            if (!userData){
                navigate("/account");
            }
            else {
                setUserId(userData._id);
                setUser(userData);
            }
        }
        validateUser();
    }, [navigate, setUser]);

    return (
        user && pathName !== "" && <StyledDiv style={{display: window.innerWidth < 900 ? "block" : "flex"}}>
            <OptionsDiv style={{display: (location.pathname !== "/" && window.innerWidth < 900) ? "none": "block"}}>
                <OptionsBar />
            </OptionsDiv>
            <SideDiv style={{display: (location.pathname !== "/" && window.innerWidth < 900) ? "none": "block"}}>
                <SideContent />
            </SideDiv>
            <OutletDiv style={{display: (location.pathname === "/" && window.innerWidth < 900) ? "none": "block"}}>
                <Outlet />
            </OutletDiv>
            <PlusDiv style={{display: (location.pathname !== "/" && window.innerWidth < 900) && "none"}} onClick={() => setOpen(true)}>
                <Add />
            </PlusDiv>

            {
                open && <DialogBox open={open} setOpen={setOpen} />
            }
        </StyledDiv>
    )
}

export default Dashboard;