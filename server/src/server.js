const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");

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

// Getting user sessions
app.get("/sessions", authController.getSessions)

// Login route to check for existing user in database
app.post("/login", authController.loginHandler)

// Add new users into database table
app.post("/signup", authController.signUpHandler)

// Logout of session
app.post("/logout", authController.logoutHandler)

// App routes
// Get all cards of that user
app.get("/users/:userId", cardController.getUserData)

// Add a card to the user library
app.post("/users/:userId", cardController.addCard)

// Edit a card
app.patch("/cards/:cardId", cardController.editCard)

// Delete a card
app.delete("/cards/:cardId", cardController.deleteCard)

// Server validation
app.get("/", (req, res) => {
    res.send("Hello from homepage");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});