import db from "../models/index";
import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);

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

let createANewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email exist
            let isExist = await checkUserEmail(data.email);
            if (isExist) {
                resolve({
                    errCode: 1,
                    erMessage: 'Your email is already in used, Plz try another email!'
                })
            } else {
                let hashPasswordBCrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordBCrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(e);
        }
    })
}

let deleteUserByID = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
            });
            if (user) {
                await db.User.destroy({
                    where: {
                        id: userId
                    },
                });
                resolve({
                    errCode: 0,
                    message: 'The user is deleted'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!user.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            }
            let data = await db.User.findOne({
                where: {
                    id: user.id
                }
            });
            if (data) {
                await db.User.update(
                    {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address
                    }, {
                    where: {
                        id: user.id,
                    }
                });
                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'User not found!'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: {
                        type: typeInput
                    }
                });
                res.errCode = 0;
                res.data = allcode
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createANewUser,
    deleteUserByID,
    updateUserData,
    getAllCodeService
}