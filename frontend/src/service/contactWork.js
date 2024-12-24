import axios from 'axios';

const URL = "https://chat-app-server-psi-three.vercel.app";

async function fetchContactDetails(secondPersonId){
    try {
        const { data } = await axios.get(`${URL}/fetch-contact-details`, {
            headers: {
                id: secondPersonId
            },
            withCredentials: true
        });

        return data;
    }
    catch (error){
        return null;
    }
}

export {
    fetchContactDetails
}