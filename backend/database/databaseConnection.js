import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;

async function createConnection() {
    try {
        await mongoose.connect(MONGO_URL);

        console.log("Database Connected Successfully.");
    }
    catch (error){
        console.log(error);
    }
}

export default createConnection;