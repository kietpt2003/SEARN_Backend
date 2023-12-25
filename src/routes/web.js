import express from "express";
import { getAboutPage, getHomePage, getCRUD, postCRUD, displayCRUD } from "../controllers/homeController";

let router = express.Router();
let initWebRouter = (app) => {
    router.get('/', getHomePage);
    router.get('/about', getAboutPage);
    router.get('/crud', getCRUD);
    router.post('/post-crud', postCRUD);
    router.get('/get-crud', displayCRUD);
    return app.use('/', router);
}

export {
    initWebRouter
}