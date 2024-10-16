import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import {server, app} from "./socket/socket.js"

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then( ()=>{
    console.log("connected to MongoDB");
}).catch( (err)=>{
    console.log(err);
})

// const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("hello everyone");
});


// import routes

import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoute)
app.use("/api/users", userRoute)


server.listen(3000, () => {
  console.log("server is running " + PORT);
});


// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
