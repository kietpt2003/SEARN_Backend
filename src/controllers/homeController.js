import db from "../models/index";

let getHome = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('test: ', data);
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

module.exports = {
    getHomePage: getHome,
    getAboutPage
}