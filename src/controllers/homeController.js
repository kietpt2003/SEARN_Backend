import db from "../models/index";
import { createNewUser, getAllUsers } from "../services/CRUDService";

let getHome = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log('test: ', data);
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getAboutPage = (req, res) => {
    return res.render('about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message);
    return res.send('post success');
}

let displayCRUD = async (req, res) => {
    let users = await getAllUsers();
    console.log("check: ", users);
    return res.render('displayCRUD.ejs', {
        tableUsers: users
    });
}

module.exports = {
    getHomePage: getHome,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayCRUD
}