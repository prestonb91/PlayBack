const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
//REMOVE AFTER REFACTOR
const prisma = require("./prisma");

// Controllers
const authController = require("../controllers/auth.controller");
const cardController = require("../controllers/card.controller");

// Initialize basic app settings
const app = express();
app.use(express.json());

// Load environment variables 
dotenv.config();

// Set environmental variables
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Authentication 
app.set("trust proxy", 1);

// Secrety key
const sessionSecretKey = "playback";

// Cors middleware
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

//getting user sessions
app.get("/sessions", authController.getSessions)
// app.get("/sessions", async (req, res) => {
//     if (req.session) {
//         console.log(req.session);
//         return res.json({
//             user_id: req.session.user_id,
//             username: req.session.username,
//         })
//     }
// })

//login route to check for existing user in database

app.post("/login", authController.loginHandler)
// app.post("/login", async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     try {
//         // userInfo = existing user info from database
//         const userInfo = await prisma.users.findFirst({
//             where: ({ username: username }),
//             select: ({ id: true, username: true, password: true})
//         })

//         //validation
//         // if no existing info, return error
//         if (userInfo === null) {
//             return res.status(400).json({error: "User does not exist"});
//         }

//         // // hash the user's password
//         const isMatch = await bcrypt.compare(password, userInfo.password);

//         if (!isMatch) {  
//             return res.status(400).json({ error: "Username and password do not match"});
//         }

//         const { id: id, username: sessionUser } = userInfo;

//         req.session.user_id = id;
//         req.session.username = sessionUser;

//         res.json({ id, username: sessionUser });
//     } catch(err) {
//         res.status(500)
//     }
// });

// Add new users into database table

app.post("/signup", authController.signUpHandler)
// app.post("/signup", async (req, res) => {
//     try {
//         const newUser = req.body.username;
//         const password = req.body.password;

//         // hash password
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         // add into user table new user and hashed password, get back userId
//         await prisma.users.create({
//             data: {
//                 username: newUser,
//                 password: hashedPassword,
//             },
//         });

//         // get user id of added user
//         const newUserId = await prisma.users.findFirst({
//             where: ({ username: newUser}),
//             select: ({ id: true })
//         });

//         res.status(201).json({ newUserId });

//     } catch (err) {
//         res.status(500)

//         // error handling
//         // if (err.code == "23505") {
//         //     return res.status(400).json({ message: "Username is already taken" });
//         // }

//         // res.status(500).json({ message: "An error occured", error: err.message });
//     }
// });

// Logout of session

app.post("/logout", authController.logoutHandler)
// app.post("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) return res.status(500).json({error: "Logout failed" });
//         res.clearCookie("connect.sid");
//         res.json({ message: "Logout successful" });
//     });
// });

// App routes
// get all cards of that user

app.get("/users/:userId", cardController.getUserData)
// app.get("/users/:userId", async (req, res) => {
//     try {
//         const userId = parseInt(req.params.userId);

//         const gameCards = await prisma.game_cards.findMany({
//             where: {
//                 user_id: userId,
//             },
//             select: {
//                 id: true,
//                 name: true,
//                 rating: true,
//                 completion_status: true,
//                 review: true,
//                 console: true,
//                 reference_url: true
//             }
//         })
    
//         return res.json(gameCards);

//     } catch(err) {  
//         console.error(err);
//     }
// });


// add a card to the user library

app.post("/users/:userId", cardController.addCard)
// app.post("/users/:userId", async (req, res) => {
//     try {
//         const userId = parseInt(req.params.userId);
//         const formData = req.body.formData;

//         const addCard = await prisma.game_cards.create({
//             data: {
//                 user_id: userId,
//                 name: formData.name, 
//                 rating: parseInt(formData.rating),
//                 completion_status: formData.completion_status,
//                 console: "",
//                 review: formData.review,
//                 reference_url: formData.reference_url
//             }
//         })

//     } catch(err) {
//         console.error(err);
//     }

// });

// edit a card

app.patch("/cards/:cardId", cardController.editCard)
// app.patch("/cards/:cardId", async (req, res) => {
//     try {
//         const cardId = parseInt(req.params.cardId);
//         const formData = req.body.editFormData;

//         // for (let item of formData) {
//         //     console.log(item)
//         // }

//         const editCard = await prisma.game_cards.update({
//             where: {
//                 id: cardId,
//             },
//             data: {
//                 name: formData.name,
//                 rating: parseInt(formData.rating),
//                 completion_status: formData.completion_status,
//                 review: formData.review,
//                 reference_url: formData.reference_url
//             }
//         })

//     } catch(err) {
//         console.error(err);
//     }
// });

// delete a card

app.delete("/cards/:cardId", cardController.deleteCard)
// app.delete("/cards/:cardId", async (req, res) => {
//     try {
//         const cardId = parseInt(req.params.cardId);

//         const deleteCard = await prisma.game_cards.delete({
//             where: { id: cardId }
//         })
//     } catch(err) { 
//         console.error(err);
//     }
// });

// Server validation

app.get("/", (req, res) => {
    res.send("Hello from homepage");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});