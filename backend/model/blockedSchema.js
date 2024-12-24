import mongoose from "mongoose";

const blockedSchema = new mongoose.Schema({
    blocked_by: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    blocked_one: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    blocked_person_name: {
        type: String,
        default: true
    },
    blocked_person_image: {
        type: String,
        default: ""
    }
});

const BlockList = mongoose.model("blocklist", blockedSchema);

export default BlockList;