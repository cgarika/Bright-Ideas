import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { Server } from 'socket-io';

//import our middleware and dbconnect function
import dbConnect from "./config/mongoose.config.js";
import UserRouter from "./routes/user.routes.js";
import PostRouter from "./routes/post.route.js";
import LikeRouter from "./routes/like.route.js";

//pull in environment variables
dotenv.config();

//make an instance of our express service
const app = express();
const PORT = 8000;

//attach middleware to our express instance
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", UserRouter);
app.use("/api", PostRouter);
app.use("/api", LikeRouter);

//establish a connection to MongoDB
dbConnect();

//turn everything on and listen for requests
app.listen(PORT, () => {
  console.log(`Listing on ${PORT}`);
});


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const io = new Server(server, {
  cors:{
      orgin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true
  }
})


let users = [];
let messages = []
io.on('connection', (socket) => {
  console.log('Connected ID: ', socket.id);

  socket.on('new_user', (data) => {
      users.push(data);
      io.emit('users_in_chat', users)
  })

  socket.on('message', (data) => {
      messages.push(data);
      io.emit('messages', messages)
  })

})