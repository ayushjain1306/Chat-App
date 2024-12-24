import axios from "axios";

const URL = "https://chat-app-server-psi-three.vercel.app";

async function messageOptions(messageData, type){
    try {
        if (type === "delete"){
            await axios.delete(`${URL}/delete-message`, { 
                headers: { 
                    messageId: messageData.messageId
                },
                withCredentials: true
            });
        }
        else {
            await axios.post(`${URL}/report-message`, messageData, { withCredentials: true });
        }

        return true;
    }
    catch (error){
        return false;
    }
}

export default messageOptions;