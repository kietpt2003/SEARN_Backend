import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./config/viewEngine";
import { initWebRouter } from "./routes/web";
import dotenv from "dotenv";
dotenv.config();
// import cors from "cors"

import connectDB from "./config/connectDB";

let app = express();

// app.use(cors({
//     credentials: true, //Nếu axios có config yêu cầu credential thì cái này phải true còn k config thì true/false gì cũng dc
// }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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