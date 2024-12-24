import axios from "axios";

const URL = "https://chat-app-server-psi-three.vercel.app";

async function searchPeople(searchInput, controller){
    try {
        const headers = {
            "Username": searchInput
        };

        const { data } = await axios.get(`${URL}/search-user`, {
            headers,
            signal: controller.signal,
            withCredentials: true
        });

        return data;
    }
    catch (error){
        console.log(error);
    }
}

export default searchPeople;