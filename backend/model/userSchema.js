import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    profile_type: {
        type: String,
        default: "Public"
    },
    online_status: {
        type: Boolean,
        default: false
    }
});

const Users = mongoose.model("users", userSchema);

export default Users;