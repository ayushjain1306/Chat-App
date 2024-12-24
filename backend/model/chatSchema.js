import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    person1: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    person2: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    last_time: {
        type: Date,
        required: true
    },
    last_mes: {
        type: String,
        required: true
    }
})

const Chats = mongoose.model("chats", chatSchema);

export default Chats;