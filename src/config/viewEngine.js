import express from "express"
import cors from "cors";

let configViewEngine = (app) => {
    app.use(cors());
    app.use(express.static("./src/public")); //config folder public
    app.set("view engine", "ejs"); //config using template ejs
    app.set("views", "./src/views"); //config view folder
}

export {
    configViewEngine
}