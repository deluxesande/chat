const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Set up cors
app.use(
    cors({
        origin: true,
    })
);
app.use(express.json());
app.use("/chats/", require("./routes/chats"));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },
});

io.on("connection", (socket) => {
    socket.on("join_room", (room) => {
        socket.join(room);
    });

    socket.on("send_message", (data) => {
        socket.broadcast.to(data.room).emit("received_message", data.message);
    });
});

const PORT = 3000 | process.env.PORT;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        server.listen(PORT, () =>
            console.log(`Server running on port ${PORT}...`)
        );
    } catch {
        console.log(error);
    }
};

startServer();
