import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import createConnection from "./database/databaseConnection.js";
import router from "./routes/router.js";
import AppRouter from "./routes/appRouter.js";
import { Server } from "socket.io";
import http from "http";
import { onlineStatus } from "./controllers/userController.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);
app.use('/app', AppRouter);

const PORT = process.env.PORT || 8000;

createConnection();

const userRecord = {};

io.on('connection', (socket) => {
    socket.on("register", (userId) => {
        userRecord[userId] = socket.id;

        onlineStatus(true, userId).then((result) => result && io.emit("onlineStatusUpdated", userId));
    })

    socket.on("sendMessage", (data) => {
        const recieverSocketId = userRecord[data.reciever_id];

        console.log(recieverSocketId);

        if (recieverSocketId){
            io.to(recieverSocketId).emit("recieveMessage", data);
        }
    })

    socket.on("messageDeleteOrReport", () => {
        io.to(socket.id).emit("deleteMessage");
    })

    socket.on("user-blocked", () => {
        io.to(socket.id).emit("userBlockedReload");
    })

    socket.on("disconnect", () => {
        for (const [userId, socketId] of Object.entries(userRecord)){
            if (socketId === socket.id){
                delete userRecord[userId];
                onlineStatus(false, userId).then((result) => result && io.emit("userDisconnected", userId));
                break;
            }
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
})