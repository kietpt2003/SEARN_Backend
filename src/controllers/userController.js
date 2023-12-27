import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json(
            {
                errCode: 1,
                message: 'Missing inputs parameter!',
            }
        );
    }
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json(
        {
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        }
    );
}

let handleAllUsers = async (req, res) => {
    let id = req.body.id; //ALL or id
    let users = await userService.getAllUsers(id);

    console.log(users);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

module.exports = {
    handleLogin,
    handleAllUsers
}