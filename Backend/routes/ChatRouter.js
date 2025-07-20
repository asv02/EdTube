const express = require('express');
const router = express.Router();
const {Chat} = require('../modals/Chat')
const auth = require('../middlewares/auth');
const User = require('../modals/Users');

router.get('/user/getChat/:targetUserId', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const targetUserId = req.params.targetUserId
        console.log('userId in ChatRouter->',userId)
        if (!userId || !targetUserId) {
            console.log('targetUserId in ChatRouter->',targetUserId)
            console.log('userId in ChatRouter->',userId)
            return res.status(404).json({ message: "User not found to Chat!!" })
        }
        let chat = await Chat.findOne(
            {
                participants: { $all: [userId, targetUserId] }
            })
        if (!chat) {
            chat = new Chat(
                {
                    participants: [userId, targetUserId],
                    messages:[]
                })
            await chat.save()
        }
        res.status(200).json({ message: 'Chat fetched successfully!!', chat: chat })
    }
    catch (err) {
        res.status(404).json({ message: `Something went wrong!! ${err.message}` })
    }
})

router.get('/user/getChats',auth,async(req,res)=>
    {
         const userId = req.user._id;
         try
         {
            const chats = await Chat.find({participants:{$in:[userId]}}).select("_id participants");
            if(!chats)
                {
                    res.status(200).json({message:"No Chats to Show!!"})
                }
            res.status(200).json({Chats:chats})
         }
         catch(err)
         {
             res.status(500).json({message:`Something went wrong!! ${err.message}`})
         }
    })



module.exports = router