import axios from "axios";

const URL = "https://chat-app-server-psi-three.vercel.app";

async function getChats(){
    try {
        const { data } = await axios.get(`${URL}/get-chats`, { withCredentials: true });

        return data;
    }
    catch(error) {
        console.log(error);
    }
}

export async function clearChat(secondPersonId) {
    try {
        await axios.delete(`${URL}/clear-chat`, { 
            headers: {
                secondpersonid: secondPersonId
            },
            withCredentials: true
        })

        return true;
    }
    catch(error) {
        return false;
    }
}

export default getChats;