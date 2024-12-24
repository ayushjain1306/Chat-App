import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SECURITY_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://chat-application-38095.appspot.com"
})

const bucket = admin.storage().bucket();

export default bucket;