import axios from "axios";

const URL = "http://localhost:8000";

async function addImage(imageData){
    try {
        const { data } = await axios.post(`${URL}/add-image`, imageData, { withCredentials: true });

        return data;
    }
    catch (error){
        console.log(error);
        return null;
    }
}

async function addGender(gender){
    try {
        await axios.post(`${URL}/add-gender`, {gender}, {withCredentials: true});

        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function addAddress(address){
    try {
        await axios.post(`${URL}/add-address`, {address}, {withCredentials: true});
        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function addCity(city){
    try {
        await axios.post(`${URL}/add-city`, {city}, {withCredentials: true});
        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function addState(state){
    try {
        await axios.post(`${URL}/add-state`, {state}, {withCredentials: true});
        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function addPincode(pincode){
    try {
        await axios.post(`${URL}/add-pincode`, {pincode}, {withCredentials: true});
        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function addBio(bio){
    try {
        await axios.post(`${URL}/add-bio`, {bio}, {withCredentials: true});
        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function updateAddress(address){
    try {
        await axios.put(`${URL}/update-address`, {address}, {withCredentials: true});
        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export {
    addImage,
    addGender,
    addAddress,
    addCity,
    addState,
    addPincode,
    addBio,
    updateAddress
}