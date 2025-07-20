const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        senderId:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text:
        {
            type: String,
            required: true,
        }
    }, { timestamps: true });

const ChatSchema = new mongoose.Schema(
    {
        participants:
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                }
            ],
        messages: [MessageSchema]
    })

const Chat = mongoose.model('Chat',ChatSchema)
const Message = mongoose.model('Message',MessageSchema)

module.exports = {Chat,Message} 