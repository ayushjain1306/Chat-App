import Users from "../model/userSchema.js";
import bucket from "../firebase/firebaseConfig.js";
import BlockList from "../model/blockedSchema.js";
import Messages from "../model/messageSchema.js";
import Chats from "../model/chatSchema.js";

async function updateUsername(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { newUsername } = request.body;

        const newUser = await Users.findOne({username: newUsername});

        if (newUser){
            return response.status(409).json({message: "Username Not Available."});
        }

        await Users.updateOne({"_id": user._id}, {username: newUsername});

        return response.status(200).json({message: "Username Updated Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function updatePassword(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { newPassword } = request.body;

        await Users.updateOne({"_id": user._id}, {newPassword});

        return response.status(200).json({message: "Password Updated Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function updateProfileType(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { profileType } = request.body;

        await Users.updateOne({"_id": user._id}, {profile_type: profileType});

        return response.status(200).json({message: "Profile Type Updated Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function deleteAccount(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        await Users.deleteOne({"_id": user._id});

        await Messages.deleteMany({sender_id: user._id});

        await Messages.deleteMany({reciever_id: user._id});

        await Chats.deleteMany({person1: user._id});

        await Chats.deleteMany({person2: user._id});

        if (user.image !== ""){
            const parts = user.image.split("/");

            const filename = parts[parts.length-1];

            const file = bucket.file(filename);

            await file.delete();
        }

        await BlockList.deleteMany({blocked_by: user._id});

        await BlockList.deleteMany({blocked_one: user._id});

        response.clearCookie("token");

        return response.status(200).json({message: "Profile Type Updated Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    updateUsername,
    updatePassword,
    updateProfileType,
    deleteAccount
}