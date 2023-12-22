import db from "../models/index";
import { createNewUser } from "../services/CRUDService";

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

module.exports = {
    getHomePage: getHome,
    getAboutPage,
    getCRUD,
    postCRUD
}