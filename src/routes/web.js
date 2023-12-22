import express from "express";
import { getAboutPage, getHomePage, getCRUD, postCRUD } from "../controllers/homeController";

let router = express.Router();
let initWebRouter = (app) => {
    router.get('/', getHomePage);
    router.get('/about', getAboutPage);
    router.get('/crud', getCRUD);
    router.post('/post-crud', postCRUD);
    return app.use('/', router);
}

export {
    initWebRouter
}