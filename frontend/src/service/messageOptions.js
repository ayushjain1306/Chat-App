import axios from "axios";

const URL = "http://localhost:8000";

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