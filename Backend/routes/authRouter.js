const express = require("express");
const router = express.Router();
const User = require("../modals/Users");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth")
const jwt = require("jsonwebtoken");
const signupValidator = require("../utils/signupValidator");
const loginValidator = require("../utils/loginValidator");

router.post("/user/signup", async (req, res, next) => {
  const {
    Role,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Password,
    DateOfBirth,
    Gender,
    PhotoUrl,
  } = req.body;

  try {
    //validate the request body
    signupValidator(req);
    //create a new instance of User model
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
      Role:"User",
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Password: hashedPassword,
      DateOfBirth,
      Gender,
      PhotoUrl,
    });
    //save the user to the database
    const user = await newUser.save();
    res.status(201).json({
      message: "User Saved Successfully",
      user: user,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post("/user/emaillogin", async (req, res, next) => {
  const { Email, Password } = req.body;
  try {
    //validation of login body
    loginValidator(req);
    //find user by email
    const user = await User.findOne({ Email: Email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    //compare password
    const comparePassword = await bcrypt.compare(Password, user.Password);
    if (!comparePassword) {
      throw new Error("Invalid Credentials");
    }
    //generate token
    const access_token = jwt.sign({ _id: user._id,role:user.Role}, "Akash@#123",{expiresIn:60});
    const refresh_token = jwt.sign({ _id: user._id,role:user.Role}, "Akash@#123",{expiresIn:15*60});
    
    user.RefreshToken = refresh_token;
    await user.save();
    
    //send token and user data in response
    res.cookie('access_token',access_token)
    res.cookie('refresh_token',refresh_token)
    res.status(200).json({ message: "Login validation successful" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post('/user/logout',auth,async(req,res)=>
  {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user)
      {
        throw new Error("User not found");
      }
    user.RefreshToken = null;
    await user.save();
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).json({ message: "Logout successful" });
  })


router.get('/get-refresh-token',async(req,res)=>
  {
    const refresh_token = req.cookies.refresh_token;
    console.log("refresh_token:",typeof(refresh_token))
    if(!refresh_token)
      {
        throw new Error("Please Login!");
      }
    const verification = jwt.verify(refresh_token, "Akash@#123");
    if(!verification)
      {
        throw new Error("Please Login Again!");
      }
      const userId = verification._id;
      const userRole = verification.role;
      
      const dbRefreshToken = await User.findById(userId).select('RefreshToken');const dbRefreshTokenValue= dbRefreshToken.RefreshToken;

      console.log("dbRefreshToken:",dbRefreshTokenValue)
      console.log("refresh_token:",refresh_token)

      if(refresh_token != dbRefreshTokenValue)
        {
          throw new Error("Invalid User!!!");
        }

      const access_token = jwt.sign({ _id: userId,role:userRole},"Akash@#123",{expiresIn:60});
      res.cookie('access_token',access_token)
      res.status(200).json({ message: "Refresh token validated successfully" });
  })


  module.exports = router;
