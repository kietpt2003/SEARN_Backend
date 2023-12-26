import express from "express";
import { getAboutPage, getHomePage, getCRUD, postCRUD, displayCRUD, editCRUD, putCRUD, deleteCRUD } from "../controllers/homeController";
import userController from "../controllers/userController"

let router = express.Router();
let initWebRouter = (app) => {
    router.get('/', getHomePage);
    router.get('/about', getAboutPage);
    router.get('/crud', getCRUD);
    router.post('/post-crud', postCRUD);
    router.get('/get-crud', displayCRUD);
    router.get('/edit-crud', editCRUD);
    router.post('/put-crud', putCRUD);
    router.get('/delete-crud', deleteCRUD);

    router.get('/api/login', userController.handleLogin);
    return app.use('/', router);
}

export {
    initWebRouter
}