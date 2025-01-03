import axios from "axios";

const URL = "https://chat-app-server-psi-three.vercel.app";

async function sendTextMessage(data){
    try {
        await axios.post(`${URL}/send-message`, data, { withCredentials: true });

        return true;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

async function uploadMessageImage(data){
    try {
        const result = await axios.post(`${URL}/upload-image-message`, data, { withCredentials: true });

        console.log(result);

        return result.data
    }
    catch(error){
        console.log(error);
    }
}

export {
    sendTextMessage,
    uploadMessageImage
};