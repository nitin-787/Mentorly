import express ,{ Express,Request,Response } from "express";
import cors from  "cors";
import  cookieParser  from "cookie-parser";

const app:Express=express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL, 
    credentials: true
  }
));
app.use(express.json());
app.use(cookieParser());


app.get("/",(req:Request,res:Response)=>{
  res.status(200).json({ message: "SkillBridge API is running" });
})


export  default app;