const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const prisma = require("./src/db/prisma");
const dotenv = require("dotenv");

// Initialize basic app settings
const app = express();
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Set environmental variables
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Authentication 
const saltRounds = 10;
app.set("trust proxy", 1);

// Secrety key
const sessionSecretKey = "playback";

// Middleware
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

// Session setup
app.use(session({
    secret: sessionSecretKey,
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none": false,
    }
}))

app.get("/sessions", async (req, res) => {
    if (req.session) {
        console.log(req.session);
        return res.json({
            user_id: req.session.user_id,
            username: req.session.username,
        })
    }
})

//login route to check for existing user in database
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // userInfo = existing user info from database
        const userInfo = await prisma.users.findFirst({
            where: ({ username: username }),
            select: ({ id: true, username: true, password: true})
        })

        //validation
        // if no existing info, return error
        // if (userInfo === null) {
        //     return res.status(400).json({error: "User does not exist"});
        // }

        // hash the user's password
        // const isMatch = await bcrypt.compare(password, userInfo.password);
        // console.log(isMatch);

        // if (!matchCheck) {
        //     return res.status(400).json({ error: "Incorrect username or password"});
        // }

        const { id, username: sessionUser } = userInfo;

        req.session.user_id = id;
        req.session.username = sessionUser;

        res.json({ id, username: sessionUser });
    } catch(err) {
        res.status(500)
    }
});

// add new users into database table
app.post("/signup", async (req, res) => {
    try {
        const newUser = req.body.username;
        const password = req.body.password;

        // hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // add into user table new user and hashed password, get back userId
        await prisma.users.create({
            data: {
                username: newUser,
                password: hashedPassword,
            },
        });

        // get user id of added user
        const newUserId = await prisma.users.findFirst({
            where: ({ username: newUser}),
            select: ({ id: true })
        });

        res.status(201).json({ newUserId });

    } catch (err) {
        res.status(500)

        // error handling
        // if (err.code == "23505") {
        //     return res.status(400).json({ message: "Username is already taken" });
        // }

        // res.status(500).json({ message: "An error occured", error: err.message });
    }
});

// Logout of session
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({error: "Logout failed" });
        res.clearCookie("connect.sid");
        res.json({ message: "Logout successful" });
    });
});

// App routes
// get all cards of that user
app.get("/users/:userId");
// add a card to the user library
app.post("/users/:userId");
// edit a module
app.patch("/modules/:id");
// delete a module
app.delete("/modules/:id");

// Server validation
app.get("/", (req, res) => {
    res.send("Hello from homepage");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});