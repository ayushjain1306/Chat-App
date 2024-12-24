import Messages from "../model/messageSchema.js";
import Users from "../model/userSchema.js";
import BlockList from "../model/blockedSchema.js";

async function getMessages(request, response){
    try {
        const username = request.username;
        const recieverId = request.headers.recieverid;

        const sender = await Users.findOne({ username });

        const result = await BlockList.findOne({blocked_by: sender?._id, blocked_one: recieverId});

        if (result) {
            return response.status(402).json({message: "User has been blocked."});
        }

        if (sender){
            await Messages.updateMany({sender_id: recieverId, reciever_id: sender._id, delete_status: {$ne: sender._id}}, { read_status: true });
            const senderEnd = await Messages.find({sender_id: sender._id, reciever_id: recieverId, delete_status: {$ne: sender._id}});
            const recieverEnd = await Messages.find({sender_id: recieverId, reciever_id: sender._id, delete_status: {$ne: sender._id}});

            return response.status(200).json([...senderEnd, ...recieverEnd]);
        }
        else {
            return response.status(404).json({message: "User Not Found."});
        }
        
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export default getMessages;