import axios from "axios";

const URL = "http://localhost:8000";

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