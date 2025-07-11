const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>
    {
       const token = req.cookies.access_token;
       if(!token) 
        {
            throw new Error("Authentication failed, token not found");
        }
        const verification = jwt.verify(token, "Akash@#123");
        if(!verification)
            {
                throw new Error("Authentication failed, invalid token");
            }
        const userId = verification._id;
        const userRole = verification.role;
        console.log("userId:",userId)
        req.user = { _id: userId, role: userRole };
        next();
    }

module.exports = auth;