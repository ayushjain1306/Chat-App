import React, { useContext, useState } from "react";
import { Box, styled } from "@mui/material";
import { UserContext } from "../../context/userContext.jsx";
import profilePic from "../../images/profilePic.jpg";
import { addAddress, addState, addCity, addGender, addPincode, addImage, addBio } from "../../service/profileApi.js";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const StyledBox = styled(Box)(({ theme }) => ({
    width: "71vw",
    height: "100vh",
    padding: "20px",
    [theme.breakpoints.down('md')]: {
        width: "100vw"
    }
}))

const headPart = {
    paddingTop: "5vh",
    paddingBottom: "3vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: "auto",
    marginBottom: "2vh"
};

const imageStyle = {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    marginBottom: "0.5vh",
    border: "3px solid rgb(9 141 247)"
};

const divStyle = {
    color: "rgb(9 141 247)",
    fontSize: "13px",
    fontWeight: "bold",
    cursor: "pointer"
}

const ArrowBox = styled(Box)(({ theme }) => ({
    paddingLeft: "5vw",
    paddingTop: "2vh",
    [theme.breakpoints.up('md')]: {
        display: "none"
    }
}))

const Profile = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [genderEdit, setGenderEdit] = useState(false);
    const [stateEdit, setStateEdit] = useState(false);
    const [cityEdit, setCityEdit] = useState(false);
    const [addressEdit, setAddressEdit] = useState(false);
    const [pincodeEdit, setPincodeEdit] = useState(false);
    const [bioEdit, setBioEdit] = useState(false);
    const [gender, setGender] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [image, setImage] = useState(null);
    const [bio, setBio] = useState(null);

    const handleImage = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const formData = new FormData();

        formData.append('file', file);

        document.getElementById("loader").style.display = "block";

        const response = await addImage(formData);

        document.getElementById("loader").style.display = "none";

        if (response) {
            setImage(response);
        }
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const handleChangeState = (e) => {
        setState(e.target.value)
    }

    const handleChangePincode = (e) => {
        setPincode(e.target.value)
    }

    const handleChangeBio = (e) => {
        setBio(e.target.value);
    }

    const handleClick = async (key, value) => {
        if (key === "gender") {
            if (value === "" || value === null) {
                return;
            }
            let response = await addGender(value);
            if (response) {
                setGender(value);
                setGenderEdit(false);
            }
        }
        else if (key === "state") {
            if (value === "" || value === null) {
                return;
            }
            let response = await addState(value);
            if (response) {
                setState(value);
                setStateEdit(false);
            }
        }
        else if (key === "city") {
            if (value === "" || value === null) {
                return;
            }
            let response = await addCity(value);
            if (response) {
                setCity(value);
                setCityEdit(false);
            }
        }
        else if (key === "address") {
            if (value === "" || value === null) {
                return;
            }
            let response = await addAddress(value);
            if (response) {
                setAddress(value);
                setAddressEdit(false);
            }
        }
        else if (key === "bio") {
            if (value === "" || value === null) {
                return;
            }
            let response = await addBio(value);
            if (response) {
                setBio(value);
                setBioEdit(false);
            }
        }
        else {
            if (value === "" || value === null) {
                return;
            }
            let response = await addPincode(value);
            if (response) {
                setPincode(value);
                setPincodeEdit(false);
            }
        }
    }

    return (
        <StyledBox>
            <div style={{ backgroundColor: "white", height: "94vh", borderRadius: "3px", overflowY: "auto" }}>
                <ArrowBox>
                    <ArrowBack onClick={() => navigate("/")} />
                </ArrowBox>
                <div style={headPart}>
                    <input type="file" accept="image/*" id="profile-image-input" onChange={(e) => handleImage(e)} style={{ display: "none" }} />

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2vw" }}>
                        <img src={image ? image : user.image ? user.image : profilePic} style={imageStyle} alt="user-pic" />
                        {user.image || image ? <div style={divStyle} onClick={() => document.getElementById("profile-image-input").click()}>Change Image</div> : <div style={divStyle} onClick={() => document.getElementById("profile-image-input").click()}>Add Image</div>}
                    </div>
                    <div style={{ width: "50%" }}>
                        <p className="h3" style={{ margin: "0px" }}>{user?.name}</p>
                        <p className="h5" style={{ marginBottom: "10px" }}>@{user?.username}</p>
                        <div style={{ fontSize: "16px" }}>{bioEdit ? <div style={{ width: "70%", display: "flex" }}><input type="text" placeholder="Add Bio" className="form-control" onChange={(e) => handleChangeBio(e)} /> <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => handleClick("bio", bio)}>Add</button><button style={{ marginLeft: "10px" }} className="btn btn-secondary" onClick={() => setBioEdit(false)}>Cancel</button></div> : (bio ? <div>{bio}</div> : user.bio ? <div>{user.bio}</div> : <p style={divStyle} onClick={() => setBioEdit(true)}>Add your Bio</p>)}</div>
                    </div>
                </div>
                <div style={{ width: "80%", margin: "auto" }}>
                    <table className="table" style={{ textAlign: "center" }}>
                        <tbody>
                            <tr className="table">
                                <th scope="row">Email</th>
                                <td>{user?.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">Phone</th>
                                <td>{user?.phone}</td>
                            </tr>
                            <tr>
                                <th scope="row">Username</th>
                                <td>{user?.username}</td>
                            </tr>
                            <tr>
                                <th scope="row">Gender</th>
                                <td>{genderEdit ? <div style={{ width: "50%", margin: "auto", display: "flex" }}><select className="form-select" id="gender-select" onChange={(e) => handleClick("gender", e.target.value)}><option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option></select> <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => setGenderEdit(false)}>Cancel</button></div> : (user?.gender ? user?.gender : gender ? gender : <div style={divStyle} onClick={() => setGenderEdit(true)}>Add Gender</div>)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Address</th>
                                <td>{addressEdit ? <div style={{ width: "70%", margin: "auto", display: "flex" }}><input type="text" placeholder="Add Address" className="form-control" onChange={(e) => handleChangeAddress(e)} /> <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => handleClick("address", address)}>Add</button><button style={{ marginLeft: "10px" }} className="btn btn-secondary" onClick={() => setAddressEdit(false)}>Cancel</button></div> : (user?.address ? user?.address : address ? address : <div style={divStyle} onClick={() => setAddressEdit(true)}>Add Address</div>)}</td>
                            </tr>
                            <tr>
                                <th scope="row">City</th>
                                <td>{cityEdit ? <div style={{ width: "70%", margin: "auto", display: "flex" }}><input type="text" placeholder="Add City" className="form-control" onChange={(e) => handleChangeCity(e)} /> <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => handleClick("city", city)}>Add</button><button style={{ marginLeft: "10px" }} className="btn btn-secondary" onClick={() => setCityEdit(false)}>Cancel</button></div> : (user?.city ? user?.city : city ? city : <div style={divStyle} onClick={() => setCityEdit(true)}>Add City</div>)}</td>
                            </tr>
                            <tr>
                                <th scope="row">State</th>
                                <td>{stateEdit ? <div style={{ width: "70%", margin: "auto", display: "flex" }}><input type="text" placeholder="Add State" className="form-control" onChange={(e) => handleChangeState(e)} /> <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => handleClick("state", addState)}>Add</button><button style={{ marginLeft: "10px" }} className="btn btn-secondary" onClick={() => setStateEdit(false)}>Cancel</button></div> : (user?.state ? user?.state : state ? state : <div style={divStyle} onClick={() => setStateEdit(true)}>Add State</div>)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Pincode</th>
                                <td>{pincodeEdit ? <div style={{ width: "70%", margin: "auto", display: "flex" }}><input type="number" placeholder="Add Pincode" className="form-control" onChange={(e) => handleChangePincode(e)} maxLength={6} /> <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => handleClick("pincode", pincode)}>Add</button><button style={{ marginLeft: "10px" }} className="btn btn-secondary" onClick={() => setPincodeEdit(false)}>Cancel</button></div> : (user?.pincode && user?.pincode > 0 ? user?.pincode : pincode ? pincode : <div style={divStyle} onClick={() => setPincodeEdit(true)}>Add Pincode</div>)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </StyledBox>
    );
};

export default Profile;
