import axios from "axios";

const URL = "http://localhost:8000";

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