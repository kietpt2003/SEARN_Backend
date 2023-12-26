import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);
import db from "../models/index";

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('ok create a new user success');
        } catch (error) {
            reject(e);
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

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let editUserById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: id
                },
                raw: true
            });
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check: ', user);
            let data = await db.User.findOne({
                where: {
                    id: user.id
                }
            });
            if (data) {
                data.firstName = user.firstName;
                data.lastName = user.lastName;
                data.address = user.address;
                await data.save();
                let allUsers = await getAllUsers();
                resolve(allUsers);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            });
            if (user) {
                await user.destroy();
                let allUsers = await getAllUsers();
                resolve(allUsers);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

export {
    createNewUser,
    hashUserPassword,
    getAllUsers,
    editUserById,
    updateUserData,
    deleteUserById
}