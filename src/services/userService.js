import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                userData = await compareUserPassword(email, password);
                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in our system. Plz try other email`;
                resolve(userData)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let compareUserPassword = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let user = await db.User.findOne({
                where: { email: email },
                attributes: ['email', 'roleId', 'password'],
                raw: true
            });
            if (user) {
                //compare password
                let isCorrect = bcrypt.compareSync(password, user.password);
                if (isCorrect) {
                    userData.errCode = 0;
                    userData.errMessage = `Ok`;
                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = `Wrong password`;
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = `User not found`;
            }
            resolve(userData);
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: email } });
            if (user) {
                resolve(true);
            }
            resolve(false);
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userId === 'ALL') {
                user = await db.User.findAll({
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    },
                });
            }
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                });
            }
            resolve(user);
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUsers
}