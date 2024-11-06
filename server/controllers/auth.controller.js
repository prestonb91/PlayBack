const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

const getSessions = async (req, res) => {
    console.log("backend response", req.session)
    if (req.session.user_id && req.session.username) {
        return res.json({
            user_id: req.session.user_id,
            username: req.session.username
        })
    }
}

const loginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Get existing user info from database
        const userInfo = await authModel.getUserInfo(username);
        
        // Manual validation
        if (userInfo === null) {
            return res.status(400).json({error: "User does not exist"});
        }
        
        // Check hash of user password
        const isMatch = await bcrypt.compare(password, userInfo.password);

        if (!isMatch) {  
            return res.status(400).json({ error: "Username and password do not match"});
        }

        // Set session as userinfo
        const { id: id, username: sessionUser } = userInfo;
        // console.log(id, sessionUser)

        req.session.user_id = id;
        req.session.username = sessionUser;

        // Return id and username
        res.json({ id, username: sessionUser });
    } catch(err) {
        res.status(500).send({
            message: "Internal error getting user"
        })
    }
};

const signUpHandler = async (req, res) => {
    try {
        const { username: newUsername, password: plainPassword} = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        // Add into user table new user and hashed password, get back userId
        const addNewUser = await authModel.addNewUser(newUsername, hashedPassword);
        const newUserId = await authModel.newUserId(newUsername, hashedPassword);

        // Return new user id
        res.status(201).json({ newUserId });
    } catch (err) {
        res.status(500).send({ 
            message: "Internal error registering new user"
        });

        // TODO: Set error handling for username already taken
        // if (err.code == "23505") {
        //     return res.status(400).json({ message: "Username is already taken" });
        // }
    };
}

const logoutHandler = async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({error: "Logout failed" });
        res.clearCookie("connect.sid");
        res.json({ message: "Logout successful" });
    });
}

module.exports = { getSessions, loginHandler, signUpHandler, logoutHandler}