import axios from "axios";

const URL = "https://chat-app-server-psi-three.vercel.app";

async function getUserData() {
    try {
        const { data } = await axios.get(`${URL}/get-user-data`, { withCredentials: true });

        if (data){
            return data;
        }
    }
    catch(error){
        console.log(error);
    }
}

export {
    getUserData
}