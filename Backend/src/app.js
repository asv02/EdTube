const express = require("express");
const cors = require('cors')
const http = require("http");
const { Chat } = require('../modals/Chat')
const socket = require('socket.io');
const cookieParser = require("cookie-parser");
const connectDb = require('../config/database');

const authRouter = require("../routes/authRouter");
const userRouter = require("../routes/userRouter");
const chatRouter = require("../routes/ChatRouter")

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors(
  {
    origin: 'http://localhost:1234',
    credentials: true,
  }));

// Routes
app.use('/', authRouter)
app.use('/', userRouter)
app.use('/', chatRouter)

const server = http.createServer(app);
const io = socket(server,
  {
    cors:
    {
      origin: "http://localhost:1234"
    },
  });

io.on("connection", (socket) => {
  socket.on('joinchat', ({ userId, targetUserId }) => {
    console.log('userId->', userId, " ", 'targetUserId->', targetUserId)
    const roomId = [userId, targetUserId].sort().join('_');
    console.log('Room Joined->', roomId)
    socket.join(roomId)
  });

  socket.on('sendMessage', async ({ userId, targetUserId, text }) => {
    try {
      const roomId = [userId, targetUserId].sort().join('_');
      let chat = await Chat.findOne({
        participants: { $all: [userId, targetUserId] }
      })

      if (!chat) {
        chat = new Chat(
          {
            participants: [userId, targetUserId],
            messages: []
          })
      }
      console.log("need to added in chat->", { senderId: userId, text })
      chat.messages.push({ senderId: userId, text })
      await chat.save();
      io.to(roomId).emit('receiveMessage', { userId, targetUserId, text });

    }
    catch (err) {
      console.log('Error in saving message', err.message)
    }
  });

  socket.on('disconnect', () => { })
})

connectDb().then(() => {
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})
  .catch((err) => {
    console.log("There is problem listening to server", err.message);
  })
