import axios from "axios";

const URL = "https://chat-app-server-psi-three.vercel.app";

async function getMessages(id, page){
    const headers = {
        recieverId: id
    }
    try {
        const { data } = await axios.get(`${URL}/get-messages`, {
            headers,
            withCredentials: true
        });

        return data;
    }
    catch (error){
        console.log(error);
    }
}

export default getMessages;