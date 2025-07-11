const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const User = require('../modals/Users');

router.get('/user/getuser',auth,async(req,res)=>
    {
        res.status(200).json({
            message:"User details fetched successfully",
            user:req.user
        });
    })

module.exports = router