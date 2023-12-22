import express from "express";
import { getAboutPage, getHomePage } from "../controllers/homeController";

let router = express.Router();
let initWebRouter = (app) => {
    router.get('/', getHomePage);

    router.get('/about', getAboutPage);

    return app.use('/', router);
}

export {
    initWebRouter
}