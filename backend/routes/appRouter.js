import express from "express";
import userAuth from "../middleware/userAppAuth.js";
import multer from "multer";

import { performLogin, performSignup, performLogout } from "../controllers/accountController.js";
import { getUserDetails } from "../controllers/userController.js";
import { findUserDetails } from "../controllers/findUser.js";
import { sendTextMessage, uploadMessageImage } from "../controllers/sendMessageController.js";
import getMessages from "../controllers/getMessages.js";
import { getChats } from "../controllers/chatsController.js";
import { addImage, addAddress, addCity, addGender, addPincode, addState, addBio, updateAddress } from "../controllers/credentialController.js";
import { updatePassword, updateUsername, deleteAccount } from "../controllers/accountSettingsController.js";
import { checkPassword } from "../controllers/checkPassword.js";
import { blockPerson, unblockPerson, getBlockedUsers } from "../controllers/blockController.js";
import { deleteMessage } from "../controllers/messagesController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get("/", (request, response) => {
    response.send("Hello from Server.");
})

// Login/Signup/Logout
router.post('/login', (request, response, next) => {request.app = true; next();}, performLogin);
router.post('/signup', performSignup);
router.delete('/logout', performLogout);

// User Data
router.get('/get-user-data', userAuth, getUserDetails);

// New Friend Creation
router.get('/search-user', userAuth, findUserDetails);

// Messages related routes
router.post('/send-message', userAuth, sendTextMessage);
router.post('/upload-image-message', userAuth, upload.single("file"), uploadMessageImage)
router.get('/get-messages', userAuth, getMessages);
router.delete('/delete-message', userAuth, deleteMessage);

// Routes related to Chats
router.get('/get-chats', userAuth, getChats);

// Routes related to user profile.
router.post('/add-image', userAuth, upload.single("file"), addImage)
router.post(`/add-gender`, userAuth, addGender)
router.post(`/add-address`, userAuth, addAddress)
router.post(`/add-pincode`, userAuth, addPincode)
router.post(`/add-state`, userAuth, addState)
router.post(`/add-city`, userAuth, addCity)
router.post('/add-bio', userAuth, addBio)
router.post('/update-address', userAuth, updateAddress)

// Routes related to settings
router.post('/check-password', userAuth, checkPassword);
router.put('/change-username', userAuth, updateUsername);
router.put('/change-password', userAuth, updatePassword);
router.post('/block-person', userAuth, blockPerson);
router.delete('/unblock-person', userAuth, unblockPerson);
router.delete("/delete-account", userAuth, deleteAccount);
router.get('/get-blocked-users', userAuth, getBlockedUsers);

export default router;