const express = require('express');
const app = express();
const BlogRoutes = require('./routes/BlogRoutes');
const UserRoutes = require('./routes/UserRoutes');
const { mongoose } = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv")
const {chats} = require("./data/data")
const connectDb = require("./config/db")
const userRoutes2 = require("./routes/userRoutes2")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")
dotenv.config()
app.use(cors());
connectDb()
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req , res) => {
    res.send("API is running")
})
// app.get('/api/chat', (req , res) => {
//     res.send(chats)
// })

app.use('/api/user' , userRoutes2);
app.use('/api/chat' , chatRoutes);
app.use('/api/message' , messageRoutes);
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use('/api/blogs', BlogRoutes);

app.use(notFound)
app.use(errorHandler)

app.get('/api/chat', (req , res) => {
  res.send(chats)
})

app.get("/api/chat/:id" , (req , res) => {
    const singleChat = chats.find((c) => {
        c._id === req.params.id
    })
    res.send(singleChat)
    console.log(singleChat)
})


const PORT = 5000

const server = app.listen(PORT , console.log("Server is running on port 5000"))

const io = require('socket.io')(server , {
    pingTimeOut : 70000,
    cors: {
        origin:"http://localhost:3000"
    }
});
io.on("connected" , (socket) => {
    console.log("connected to socket.io")

    socket.on("setup" , (userData) => {
        socket.join(userData._id);
        console.log(userData._id)
        socket.emit("connected");
    })

    socket.on("join chat" , (room) => {
        socket.join(room);
        console.log("User Joined Room: "+room);
    })

    socket.on("typing" , (room)=>{
        socket.in(room).emit('typing')
    })

    socket.on("stop typing" , (room)=>{
        socket.in(room).emit('stop typing')
    })

    server.on('new message' , (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received" , newMessageReceived)
        })
    })

    socket.off("setup" , ()=> {
        console.log("User Disconnected");
        socket.leave(userData._id);
    })
})


//mongoose.connect('mongodb://127.0.0.1:27017/blogsDB');

//app.use('http://localhost:5000/api/users', UserRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Listening on Server ${process.env.PORT}`);
// });
