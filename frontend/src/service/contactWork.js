import axios from 'axios';

const URL = "http://localhost:8000";

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