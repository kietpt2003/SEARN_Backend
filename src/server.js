import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./config/viewEngine";
import { initWebRouter } from "./routes/web";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"

import connectDB from "./config/connectDB";

let app = express();

app.use(cors({
    credentials: true,
    origin: true
}));

//config app
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRouter(app);

connectDB();

let port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})