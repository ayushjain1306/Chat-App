import Chats from "../model/chatSchema.js";
import Messages from "../model/messageSchema.js";
import Users from "../model/userSchema.js";
import BlockList from "../model/blockedSchema.js";

async function getChats(request, response){
    try {
        const username = request.username;

        const user = await Users.findOne({ username });

        if (!user){
            return response.status(404).json("User Not Found.");
        }

        const senderEnd = await Chats.find({ person1: user._id });
        const recieverEnd = await Chats.find({ person2: user._id });

        const result = [...senderEnd, ...recieverEnd];

        for (let i = 0; i< result.length; i++){
            const element = result[i];

            if (element.person1.equals(user._id)){
                const secondPerson = await Users.findOne({ _id: element.person2 });

                const messages = await Messages.find({ reciever_id: user._id, sender_id: element.person2, read_status: false })

                const newElement = {
                    _id: secondPerson ? secondPerson._id : element.person2,
                    name: secondPerson ? secondPerson.name : "App User",
                    username: secondPerson?.username,
                    image: secondPerson?.image,
                    online_status: secondPerson ? secondPerson.online_status : false,
                    last_time: element.last_time,
                    last_mes: element.last_mes.length > 20 ? element.last_mes.substring(0, 20) + "..." : element.last_mes,
                    unread_mes: messages.length
                }

                result[i] = newElement;
            }
            else {
                const secondPerson = await Users.findOne({ _id: element.person1 });

                const messages = await Messages.find({ reciever_id: user._id, sender_id: element.person1, read_status: false })

                const newElement = {
                    _id: secondPerson ? secondPerson._id : element.person1,
                    name: secondPerson ? secondPerson.name: "App User",
                    username: secondPerson?.username || "",
                    image: secondPerson?.image || "",
                    online_status: secondPerson ? secondPerson.online_status : false,
                    last_time: element.last_time,
                    last_mes: element.last_mes.length > 20 ? element.last_mes.substring(0, 20) + "..." : element.last_mes,
                    unread_mes: messages.length
                }

                result[i] = newElement;
            }
        }

        const newResult = await Promise.all(result.map(async (element) => {
            const temp = await BlockList.findOne({blocked_by: user._id, blocked_one: element._id});

            if (temp) {
                return null;
            }

            const variable = await BlockList.findOne({blocked_by: element._id, blocked_one: user._id});
            
            if (variable) {
                element.name = "App User";
                element.username = "";
                element.image = "";
                element.online_status = false;
            }

            return element;
        }))

        const finalResult = newResult.filter((element) => element !== null);

        return response.status(200).json(finalResult);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function deleteAllChats(request, response) {
    try {
        const username = request.username;

        const user = await Users.findOne({username: username});

        if (!user) {
            return response.status(404).json({message: "User Not Found."});
        }

        const { secondpersonid } = request.headers;

        await Messages.deleteMany({ sender_id: user._id, reciever_id: secondpersonid, delete_status: {$ne: null} });

        await Messages.deleteMany({ sender_id: secondpersonid, reciever_id: user._id, delete_status: {$ne: null} });

        await Messages.updateMany({ sender_id: user._id, reciever_id: secondpersonid, delete_status: null }, { delete_status: user._id });

        await Messages.updateMany({ sender_id: secondpersonid, reciever_id: user._id, delete_status: null }, { delete_status: user._id });
        
        return response.status(200).json({message: "Chat Deleted Successfully."});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export {
    getChats,
    deleteAllChats
}