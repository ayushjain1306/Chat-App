import BlockList from "../model/blockedSchema.js";
import Users from "../model/userSchema.js";
import Messages from "../model/messageSchema.js";

async function blockPerson(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { secondpersonid } = request.body;

        const secondPerson = await Users.findOne({ _id: secondpersonid }).select('name image');

        await Messages.deleteMany({ sender_id: user._id, reciever_id: secondpersonid, delete_status: {$ne: null} });

        await Messages.deleteMany({ sender_id: secondpersonid, reciever_id: user._id, delete_status: {$ne: null} });

        await Messages.updateMany({ sender_id: user._id, reciever_id: secondpersonid, delete_status: null }, { delete_status: user._id });

        await Messages.updateMany({ sender_id: secondpersonid, reciever_id: user._id, delete_status: null }, { delete_status: user._id });
        
        await BlockList.create({
            blocked_by: user._id,
            blocked_one: secondpersonid,
            blocked_person_name: secondPerson?.name,
            blocked_person_image: secondPerson?.image
        })

        return response.status(200).json({message: "The person has been blocked successfully."});
    }   
    catch (error){
        return response.status(500).json({message: error.message});
    } 
}

async function unblockPerson(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { id } = request.headers;

        await BlockList.deleteOne({blocked_by: user._id, blocked_one: id});

        return response.status(200).json({message: "The user has been unblocked successfully."})
    }   
    catch (error){
        return response.status(500).json({message: error.message});
    } 
}

async function getBlockedUsers(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const blockedUsers = await BlockList.find({blocked_by: user._id})

        return response.status(200).json(blockedUsers);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    blockPerson,
    unblockPerson,
    getBlockedUsers
}