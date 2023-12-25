import bcrypt from "bcryptjs"
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

let hashUserPassword = async (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(e);
        }
    })
}

let getAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

export {
    createNewUser,
    hashUserPassword,
    getAllUsers
}