import Messages from "../model/messageSchema.js";
import Users from "../model/userSchema.js";
import nodemailer from "nodemailer";

async function deleteMessage(request, response){
    try {
        const user = await Users.findOne({username: request.username});

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const { messageid } = request.headers;

        const message = await Messages.findOne({_id: messageid});

        if (message.delete_status){
            await Messages.deleteOne({_id: messageid});
        }
        else {
            await Messages.updateOne({_id: messageid}, {delete_status: user._id});
        }

        return response.status(200).json({message: "Message Deleted Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function reportMessage(request, response){
    try {
        const user = await Users.findOne({ username: request.username });

        if (!user){
            return response.status(404).json({message: "User Not Found."});
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const { messageId, senderId, recieverId } = request.body;

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "Message Reported",
            text: `MessageId: ${messageId}, SenderId: ${senderId}, ReceiverId: ${recieverId}, ReportBy: ${user._id}`
        }

        await transporter.sendMail(mailOptions);

        return response.status(200).json({message: "Message Reported Successfully."});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export {
    deleteMessage,
    reportMessage
}