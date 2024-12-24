import axios from "axios";

const URL = "https://chat-app-server-psi-three.vercel.app";

async function checkPassword(password) {
    try {
        const {data} = await axios.post(`${URL}/check-password`, {password}, { withCredentials: true });

        return data;
    }
    catch (error){
        if (error.response.data.message === "Incorrect Password."){
            return false;
        }
        else {
            console.log(error);
        }
    }
}

async function deleteAccount() {
    try {
        await axios.delete(`${URL}/delete-account`, { withCredentials: true });

        return true;
    }
    catch (error){
        console.log(error);
        alert("Failed to delete account.")
        return false;
    }
}

async function getBlockedUsers(){
    try {
        const { data } = await axios.get(`${URL}/get-blocked-users`, { withCredentials: true });

        return data;
    }
    catch (error){
        console.log(error);
    }
}

async function updateUsername(newUsername) {
    try {
        await axios.put(`${URL}/change-username`, { newUsername }, { withCredentials: true })

        return true;
    }
    catch(error){
        if (error.response.data.message === "Username Not Available."){
            return false;
        }
        console.log(error);
    }
}

async function updatePassword(newPassword){
    try {
        await axios.put(`${URL}/change-password`, { newPassword }, { withCredentials: true });

        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function blockUser(secondPersonId){
    try {
        await axios.post(`${URL}/block-person`, { secondpersonid: secondPersonId }, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function unblockUser(secondPersonId){
    try {
        await axios.delete(`${URL}/unblock-person`, {
            headers: {
                id: secondPersonId
            },
            withCredentials: true
        });

        return true;
    }
    catch(error) {
        return false;
    }
}

export {
    checkPassword,
    deleteAccount,
    getBlockedUsers,
    updateUsername,
    updatePassword,
    blockUser,
    unblockUser
}