import db from "../models/index";
import { createNewUser, deleteUserById, editUserById, getAllUsers, updateUserData } from "../services/CRUDService";

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

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let data = await editUserById(userId);
        console.log('test: ', data);
        return res.render('editCRUD.ejs', { user: data });
    } else {
        return res.send('User not found.');
    }
}

let putCRUD = async (req, res) => {
    let user = req.body;
    let allUser = await updateUserData(user);
    return res.render('displayCRUD.ejs', {
        tableUsers: allUser
    });
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let allUser = await deleteUserById(userId);
        return res.render('displayCRUD.ejs', {
            tableUsers: allUser
        });
    } else {
        return res.send('User not found.');
    }
}

module.exports = {
    getHomePage: getHome,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayCRUD,
    editCRUD,
    putCRUD,
    deleteCRUD
}