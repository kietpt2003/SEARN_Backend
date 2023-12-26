import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    let userData = await userService.handleUserLogin(email, password);
    if (!email || !password) {
        return res.status(200).json(
            {
                errCode: 1,
                message: 'Missing inputs parameter!',
            }
        );
    }

    return res.status(200).json(
        {
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        }
    );
}

module.exports = {
    handleLogin
}