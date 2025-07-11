const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require('../config/database');

const authRouter = require("../routes/authRouter");
const userRouter = require("../routes/userRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/',authRouter)
app.use('/',userRouter)

connectDb().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})
.catch((err)=>
    {
        console.log("There is problem listening to server", err.message);
    })
