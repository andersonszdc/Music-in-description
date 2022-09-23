import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes";
import cors from "cors";

const port = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.REDIRECT_URI,
};

const app = express();

app.use(cors(corsOptions));

app.use(router);

app.listen(port, () => console.log("🚀👨‍🚀 server running..."));
