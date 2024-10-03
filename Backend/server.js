import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then( ()=>{
    console.log("connected to MongoDB");
}).catch( (err)=>{
    console.log(err);
})

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("hello everyone");
});

app.listen(3000, () => {
  console.log("server is running " + PORT);
});
