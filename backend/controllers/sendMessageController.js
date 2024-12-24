import Messages from "../model/messageSchema.js";
import Users from "../model/userSchema.js";
import Chats from "../model/chatSchema.js";
import bucket from "../firebase/firebaseConfig.js";

async function sendTextMessage(request, response){
    try {
        const data = request.body;
        const username = request.username;
        
        const userData = await Users.findOne({username});

        if (!userData){
            return response.status(404).json({message: "User Not Found."});
        }

        const senderId = userData._id;
        const recieverId = data.reciever_id;

        const senderEnd = await Chats.findOne({person1: senderId, person2: recieverId});
        const recieverEnd = await Chats.findOne({person1: recieverId, person2: senderId});

        if (senderEnd === null && recieverEnd === null){
            await Chats.create({person1: senderId, person2: recieverId, last_time: new Date(Date.now()), last_mes: data.message});
        }
        else {
            if (senderEnd){
                await Chats.updateOne({_id: senderEnd._id}, {last_time: new Date(Date.now()), last_mes: data.message});
            }
            else {
                await Chats.updateOne({_id: recieverEnd._id}, {last_time: new Date(Date.now()), last_mes: data.message});
            }
        }

        const messageData = {...data, sender_id: userData._id};

        await Messages.create(messageData);

        return response.status(200).json({message: "Message Added Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function uploadMessageImage(request, response){
    try {
        if (!request.file){
            return response.status(404).json({message: "File Not Found."});
        }

        const filename = Date.now() + "-" + request.file.originalname;

        const blob = bucket.file(filename);

        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: request.file.mimetype
            }
        })

        blobStream.on("error", (error) => {
            response.status(500).json({message: error.message});
        })

        blobStream.on("finish", async() => {
            await blob.makePublic();

            const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            response.status(200).json(url);
        })

        blobStream.end(request.file.buffer);
    }
    catch (error){
        console.log(error);
        return response.status(500).json({message: error.message});
    }
}

export {
    sendTextMessage,
    uploadMessageImage
}