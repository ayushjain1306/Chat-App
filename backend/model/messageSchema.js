import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    reciever_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    send_time: {
        type: Date,
        required: true
    },
    seen_time: {
        type: Date,
        default: null
    },
    message: {
        type: String,
        required: true
    },
    delivered_time: {
        type: Date,
        default: null
    },
    like_status: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: null
    },
    delete_status: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
    read_status: {
        type: Boolean,
        default: false
    }
});

const Messages = mongoose.model("messages", messageSchema);

export default Messages;