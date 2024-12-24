import axios from "axios";

const URL = 'http://localhost:8000';

async function performLogin(data){
    try {
        await axios.post(`${URL}/login`, data, { withCredentials: true });

        return "Login Successful.";
    }
    catch (error){
        if (error?.response?.data?.message === "Username not found."){
            return "Username Not Found.";
        }
        else if (error?.response?.data?.message === "Incorrect password"){
            return "Incorrect Password";
        }
        else {
            console.log(error?.response?.data?.message);
        }
    }
}

async function performSignup(data){
    try {
        const response = await axios.post(`${URL}/signup`, data);

        if (response){
            alert("Account Created Successfully.");
            window.location.reload();
        }
    }
    catch (error){
        if (error?.response?.data?.message === "Email not available."){
            return "Email Already exists.";
        }
        else if (error?.response?.data?.message === "Username not available."){
            return "Username Already exists.";
        }
        else if (error?.response?.data?.message === "Phone Number not available."){
            return "Phone Number Already exists.";
        }
    }
}

async function performLogout() {
    try {
        await axios.delete(`${URL}/logout`, { withCredentials: true });

        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export {
    performLogin,
    performSignup,
    performLogout
};