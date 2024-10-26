import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";


//import our middleware and dbconnect function
import dbConnect from "./config/mongoose.config.js";
import UserRouter from "./routes/user.routes.js";
/*import PostRouter from "./routes/post.route.js";
import LikeRouter from "./routes/like.route.js"; */

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
/*app.use("/api", PostRouter);
app.use("/api", LikeRouter); */

//establish a connection to MongoDB
dbConnect();

//turn everything on and listen for requests
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


