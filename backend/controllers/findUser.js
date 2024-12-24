import Messages from "../model/messageSchema.js";
import Users from "../model/userSchema.js";
import BlockList from "../model/blockedSchema.js";

async function findUserDetails(request, response){
    try {
        const user = await Users.findOne({username: request.username});

        const username = request.headers.username;

        const result = await Users.find({ username: { $regex: username, $options: 'i' } }, "name username image");

        const filteredResult = result.filter(obj => obj.username !== request.username);

        const newResult = await Promise.all(filteredResult.map(async(element) => {
            const check = await BlockList.findOne({blocked_by: user._id, blocked_one: element._id});

            if (check) {
                return null;
            }
            else {
                return element;
            }
        }))

        const finalResult = newResult.filter((element) => element !== null);

        if (result){
            return response.status(200).json(finalResult);
        }
        else {
            return response.status(404).json({message: "No User Found"});
        }
    }
    catch(error){
        return response.status(500).json({message: error.message});
    }
}

async function fetchContactDetails(request, response) {
    try {
        const result = await Users.findOne({ _id: request.headers.id }).select("name username online_status image bio");

        return response.status(200).json(result);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export {
    findUserDetails,
    fetchContactDetails
}